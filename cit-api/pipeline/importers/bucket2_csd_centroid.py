import csv

from pipeline.importers.base_importer import BaseImporter
from pipeline.models.csd_centroid import CSDCentroid

class CSDCentroidImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2csd_centroid.json"]

    @classmethod
    def etl(cls, filepath):
        num_records = 0
        content = open(filepath)
        csv_reader = csv.reader(content.readlines(), delimiter=",")
        for l, line in enumerate(csv_reader):
            if l == 0:
                continue #skip header row

            entry = CSDCentroid(
                object_id = line[0],
                census_year = line[1],
                census_subdivision_id=line[2],
                census_s_1=line[3],
                census_s_2=line[4],
                census_s_3=line[5],
                x=line[6],
                y=line[7]
            )
            entry.save()
            num_records += 1
        return num_records