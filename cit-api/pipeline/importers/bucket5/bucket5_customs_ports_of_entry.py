from pipeline.importers.base_importer import BaseImporter


class CustomsPortsOfEntryImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5customs_ports_of_entry.json"]


def import_data_sources():
    CustomsPortsOfEntryImporter.import_data_sources()
