from pipeline.importers.base_importer import BaseImporter

class SchoolsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5schools.json"]

def import_data_sources():
    SchoolsImporter.import_data_sources()
