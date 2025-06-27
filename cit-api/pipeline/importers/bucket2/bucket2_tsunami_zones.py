from pipeline.importers.base_importer import BaseImporter


class TsunamiZonesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2tsunami_zones.json"]


def import_data_sources():
    TsunamiZonesImporter.import_data_sources()
