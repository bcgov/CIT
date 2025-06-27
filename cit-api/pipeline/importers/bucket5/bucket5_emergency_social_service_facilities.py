from pipeline.importers.base_importer import BaseImporter


class EmergencySocialServiceFacilitiesImporter(BaseImporter):
    DATA_SOURCES = [
        "data/import/bucket5/semiannually/5emergency_social_service_facilities.json"
    ]


def import_data_sources():
    EmergencySocialServiceFacilitiesImporter.import_data_sources()
