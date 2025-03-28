from pipeline.importers.base_importer import BaseImporter

class SchoolDistrictsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2school_districts.json"]

def import_data_sources():
    SchoolDistrictsImporter.import_data_sources()
