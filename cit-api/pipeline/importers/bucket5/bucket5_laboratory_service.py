from pipeline.importers.base_importer import BaseImporter


class LaboratoryServiceImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5laboratory_service.json"]


def import_data_sources():
    LaboratoryServiceImporter.import_data_sources()
