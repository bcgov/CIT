from pipeline.importers.base_importer import BaseImporter


class CensusSubdivisions2016Importer(BaseImporter):
    DATA_SOURCES = ["data/import/bucket1/1census_subdivisions_2016.json"]


def import_data_sources():
    CensusSubdivisions2016Importer.import_data_sources()
