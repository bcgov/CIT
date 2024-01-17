from pipeline.importers.base_importer import BaseImporter

class CommunitiesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket3/3communities.json"]


