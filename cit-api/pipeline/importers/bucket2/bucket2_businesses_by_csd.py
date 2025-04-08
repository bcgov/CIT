from pipeline.importers.base_importer import BaseImporter

class BusinessesByCSDImporter(BaseImporter):
    DATA_SOURCES = ['data/import/bucket2/semiannually/2businesses_by_csd.json']

def import_data_sources():
    BusinessesByCSDImporter.import_data_sources()
