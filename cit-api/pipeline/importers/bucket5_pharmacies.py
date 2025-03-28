from pipeline.importers.base_importer import BaseImporter

class PharmaciesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5pharmacies.json"]

def import_data_sources():
    PharmaciesImporter.import_data_sources()
