from pipeline.importers.base_importer import BaseImporter


class HospitalsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5hospitals.json"]


def import_data_sources():
    HospitalsImporter.import_data_sources()
