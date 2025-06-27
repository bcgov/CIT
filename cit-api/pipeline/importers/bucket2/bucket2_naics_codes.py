from pipeline.importers.base_importer import BaseImporter


# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
class NaicsCodesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/monthly/2naics_codes.json"]


def import_data_sources():
    NaicsCodesImporter.import_data_sources()
