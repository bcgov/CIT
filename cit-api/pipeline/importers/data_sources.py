from pipeline.importers.base_importer import BaseImporter

class AllDataSourcesImporter(BaseImporter):
    DATA_SOURCES = ["data/data_sources.json"]

def import_data_sources():
    AllDataSourcesImporter.import_data_sources()
