from pipeline.importers.base_importer import BaseImporter


class BCNetworkConnectivityImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket7/7bc_network_connectivity.json"]


def import_data_sources():
    BCNetworkConnectivityImporter.import_data_sources()
