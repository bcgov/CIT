from pipeline.importers.base_importer import BaseImporter

class DiagnosticFacilitiesImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5diagnostic_facilities.json"]

def import_data_sources():
    DiagnosticFacilitiesImporter.import_data_sources()
