import csv
import pandas as pd

from requests import get
from pipeline.importers.utils import write_to_db
from pipeline.models.municipal_tax_rates import MunicipalTaxRates, xlsx_col_to_db_col
from pipeline.importers.base_importer import BaseImporter

TOTAL_EXAMINED_HEADER = "Households examined for core housing need status"
TOTAL_EXAMINED_INDEX = 1
TOTAL_NEEDED_HEADER = "Households in core housing need status"
TOTAL_NEEDED_INDEX = 2

CSD_REGEX = "\(([0-9]+)\)"


class MunicipalTaxRatesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2_702_2023_tax_rates.json"]

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
        print(data)
        write_to_db(MunicipalTaxRates, data)
