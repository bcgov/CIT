from pipeline.importers.base_importer import BaseImporter


class AgriculturalLandReserveImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket4/monthly/4agricultural_land_reserve.json"]


def import_data_sources():
    AgriculturalLandReserveImporter.import_data_sources()
