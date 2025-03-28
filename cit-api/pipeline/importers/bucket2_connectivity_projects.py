from pipeline.importers.base_importer import BaseImporter

class ConnectivityInfrastructureProjectsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/monthly/2connectivity_infrastructure_projects.json"]


def import_data_sources():
    ConnectivityInfrastructureProjectsImporter.import_data_sources()
