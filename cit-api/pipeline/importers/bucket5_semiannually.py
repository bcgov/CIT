from pipeline.importers.base_importer import BaseImporter

class Bucket5SemiannualImporter(BaseImporter):
    DATA_SOURCES = [
        "data/import/bucket5/semiannually/5airports.json",
        "data/import/bucket5/semiannually/5civic_facilities.json",
        "data/import/bucket5/semiannually/5clinics.json",
        "data/import/bucket5/semiannually/5customs_ports_of_entry.json",
        "data/import/bucket5/semiannually/5diagnostic_facilities.json",
        "data/import/bucket5/semiannually/5emergency_social_service_facilities.json",
        "data/import/bucket5/semiannually/5hospitals.json",
        "data/import/bucket5/semiannually/5laboratory_service.json",
        "data/import/bucket5/semiannually/5local_govt_offices.json",
        "data/import/bucket5/semiannually/5pharmacies.json",
        "data/import/bucket5/semiannually/5port_and_terminal.json",
        "data/import/bucket5/semiannually/5public_library.json",
        "data/import/bucket5/semiannually/5schools.json",
        "data/import/bucket5/semiannually/5servicebc_locations.json",
        "data/import/bucket5/semiannually/5timber_facilities.json",
    ]

def import_data_sources():
    Bucket5SemiannualImporter.import_data_sources()
