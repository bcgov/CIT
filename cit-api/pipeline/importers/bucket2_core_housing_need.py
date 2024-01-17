import csv
import re
from io import BytesIO

from typing import List
from requests import get
from zipfile import ZipFile

from pipeline.models.core_housing_need import CSDCoreHousingNeed
from pipeline.importers.base_importer import BaseImporter

TOTAL_EXAMINED_HEADER = "Households examined for core housing need status"
TOTAL_EXAMINED_INDEX = 1
TOTAL_NEEDED_HEADER = "Households in core housing need status"
TOTAL_NEEDED_INDEX = 2

CSD_REGEX = "\(([0-9]+)\)"


class CoreHousingImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2core_housing.json"]

    @classmethod
    def verify_data_headers(cls, row: List[str]):
        assert row[TOTAL_EXAMINED_INDEX].strip() == TOTAL_EXAMINED_HEADER, row[
            TOTAL_EXAMINED_INDEX
        ]
        assert row[TOTAL_NEEDED_INDEX].strip() == TOTAL_NEEDED_HEADER, row[
            TOTAL_NEEDED_INDEX
        ]

    @classmethod
    def extract_csd(cls, string: str):
        pattern = re.compile(CSD_REGEX)
        return pattern.search(string).groups()[0]

    @classmethod
    def etl(cls, url: str):
        resp = get(url)
        content = resp.content.decode("utf-8")
        csv_reader = csv.reader(content.splitlines(), delimiter=",")
        for i, row in enumerate(csv_reader):
            if i < 3:
                # first 3 rows are garbage
                continue
            if i == 3:
                try:
                    cls.verify_data_headers(row)
                except AssertionError:
                    print("IMPORT FAILED: Column headers not as expected")
            if i > 3:
                if row[1].strip() == "x":
                    # data set has x for all data col if data was not collected
                    continue
                csd: str = cls.extract_csd(row[0])
                examined = int(row[TOTAL_EXAMINED_INDEX])
                needed = int(row[TOTAL_NEEDED_INDEX])
                percentage = needed / examined

                entry = CSDCoreHousingNeed(
                    census_subdivision_id=csd,
                    core_housing_examined=examined,
                    core_housing_need=needed,
                    core_housing_need_percentage=percentage,
                )
                entry.save()
