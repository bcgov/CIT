from pipeline.importers.base_importer import BaseImporter

class HousingImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2housing.json"]


def import_data_sources():
    HousingImporter.import_data_sources()
