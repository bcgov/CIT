from pipeline.importers.base_importer import BaseImporter

# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
class TimberFacilitiesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5timber_facilities.json"]

def import_data_sources():
    TimberFacilitiesImporter.import_data_sources()
