from pipeline.importers.base_importer import BaseImporter


class PortAndTerminalImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5port_and_terminal.json"]


def import_data_sources():
    PortAndTerminalImporter.import_data_sources()
