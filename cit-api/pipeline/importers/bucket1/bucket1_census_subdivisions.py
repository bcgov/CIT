from pipeline.importers.base_importer import BaseImporter


class CensusSubdivisionsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket1/1census_subdivisions.json"]


def import_data_sources():
    CensusSubdivisionsImporter.import_data_sources()
