import csv
import pandas as pd

from requests import get
from pipeline.importers.utils import write_to_db
from pipeline.models.municipal_land_title_transfers import MunicipalLandTitleTransfers, xlsx_col_to_db_col
from pipeline.importers.base_importer import BaseImporter



class MunicipalLandTitleTransfersImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/monthly/2municipal_land_title_transfers.json"]

    @classmethod
    def etl(cls, url: str):
        resp = get(url, headers={"User-Agent": "PostmanRuntime/7.36.1"})
        content = resp.content
        data = pd.read_excel(content, engine="openpyxl", skiprows=1)
        data.rename(
            columns={
                data.columns[i]: name for i, name in enumerate(xlsx_col_to_db_col)
            },
            inplace=True,
        )
        data.insert(4, "year", 2023, True)
        print(data)
        return len(data.index)