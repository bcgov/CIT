from pipeline.importers.base_importer import BaseImporter

class ClinicsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5clinics.json"]


def import_data_sources():
    ClinicsImporter.import_data_sources()
