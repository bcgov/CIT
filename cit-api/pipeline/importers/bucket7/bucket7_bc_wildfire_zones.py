from pipeline.importers.base_importer import BaseImporter


# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
class BCWildfireZonesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket7/7bc_wildfire_zones.json"]


def import_data_sources():
    BCWildfireZonesImporter.import_data_sources()
