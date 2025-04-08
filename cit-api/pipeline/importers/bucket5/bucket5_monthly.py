from pipeline.importers.base_importer import BaseImporter

# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
class Bucket5MonthlyImporter(BaseImporter):
    DATA_SOURCES = [
        "data/import/bucket5/monthly/5economic_projects.json",
        "data/import/bucket5/monthly/5first_responders.json",
    ]

def import_data_sources():
    Bucket5MonthlyImporter.import_data_sources()
