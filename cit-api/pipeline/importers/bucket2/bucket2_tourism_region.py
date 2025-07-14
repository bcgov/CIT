from pipeline.importers.base_importer import BaseImporter


class TourismRegionImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2tourism_region.json"]


def import_data_sources():
    TourismRegionImporter.import_data_sources()
