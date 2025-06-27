from pipeline.importers.base_importer import BaseImporter


class MunicipalitiesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2municipalities.json"]


def import_data_sources():
    MunicipalitiesImporter.import_data_sources()
