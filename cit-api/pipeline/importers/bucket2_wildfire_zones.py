from pipeline.importers.base_importer import BaseImporter

class WildfiresZonesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2wildfires_zones.json"]

def import_data_sources():
    WildfiresZonesImporter.import_data_sources()
