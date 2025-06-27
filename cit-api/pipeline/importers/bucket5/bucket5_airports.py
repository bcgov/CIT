from pipeline.importers.base_importer import BaseImporter


class AirportsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5airports.json"]


def import_data_sources():
    AirportsImporter.import_data_sources()
