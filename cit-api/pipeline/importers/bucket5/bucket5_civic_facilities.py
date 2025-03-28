from pipeline.importers.base_importer import BaseImporter

class CivicFacilitiesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5civic_facilities.json"]

def import_data_sources():
    CivicFacilitiesImporter.import_data_sources()
