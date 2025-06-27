from pipeline.importers.base_importer import BaseImporter


class CensusDivisionsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket1/1census_divisions.json"]


def import_data_sources():
    CensusDivisionsImporter.import_data_sources()
