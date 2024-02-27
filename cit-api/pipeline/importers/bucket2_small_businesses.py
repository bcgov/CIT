from requests import get
import pandas as pd
from pipeline.importers.base_importer import BaseImporter
from pipeline.models.csd_small_businesses import CSDSmallBusinesses
from pipeline.importers.utils import write_to_db


class SmallBusinessesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2small_businesses.json"]

    @classmethod
    def etl(cls, url):
        num_records = 0
        resp = get(url, headers={"User-Agent": "PostmanRuntime/7.36.1"})
        data = pd.read_excel(
            resp.content, engine="openpyxl", skiprows=2, sheet_name="2022"
        )
        data = data[:420]  # remove the last 3 rows

        data.rename(
            columns={
                data.columns[0]: "census_subdivision_id",
                data.columns[1]: "csd_name",
                data.columns[2]: "cd_name",
                data.columns[3]: "dr_name",
                data.columns[4]: "employ_0",
                data.columns[5]: "employ_1_4",
                data.columns[6]: "employ_5_9",
                data.columns[7]: "employ_10_19",
                data.columns[8]: "employ_20_49",
                data.columns[9]: "employ_50_99",
                data.columns[10]: "employ_100_199",
                data.columns[11]: "employ_200_499",
                data.columns[12]: "employ_1000_1499",
                data.columns[13]: "employ_1500_2499",
                data.columns[14]: "employ_2500_4999",
                data.columns[15]: "employ_5000_more",
                data.columns[16]: "subtotal_with_employ_gt_0",
                data.columns[17]: "grand_total",
            },
            inplace=True,
        )

        write_to_db(CSDSmallBusinesses, data)
        return len(data)
