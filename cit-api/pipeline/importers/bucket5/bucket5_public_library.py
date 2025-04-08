from pipeline.importers.base_importer import BaseImporter

class PublicLibraryImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket5/semiannually/5public_library.json"]

def import_data_sources():
    PublicLibraryImporter.import_data_sources()
