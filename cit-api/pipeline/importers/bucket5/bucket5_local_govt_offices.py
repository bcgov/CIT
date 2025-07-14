from pipeline.importers.base_importer import BaseImporter


class LocalGovtOfficesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5local_govt_offices.json"]


# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
def import_data_sources():
    LocalGovtOfficesImporter.import_data_sources()
