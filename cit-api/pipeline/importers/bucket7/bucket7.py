from pipeline.importers.base_importer import BaseImporter
# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
class LinkageCSDImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket7/7linkage_csd.json"]

def import_data_sources():
    LinkageCSDImporter.import_data_sources()
