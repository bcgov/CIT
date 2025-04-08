from pipeline.importers.base_importer import BaseImporter

# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
class Bucket4SemiannualImporter(BaseImporter):
    DATA_SOURCES = [
        "data/import/bucket4/semiannually/4census_economic_region.json",
        "data/import/bucket4/semiannually/4courts.json",
        "data/import/bucket4/semiannually/4health_authority_boundaries.json",
        "data/import/bucket4/semiannually/4indian_reserve_and_band_name.json",
        "data/import/bucket4/semiannually/4lakes.json",
        "data/import/bucket4/semiannually/4natural_resource_regions.json",
        "data/import/bucket4/semiannually/4post_secondary_institutions.json",
        "data/import/bucket4/semiannually/4provincial_electoral_district.json",
        "data/import/bucket4/semiannually/4railways.json",
        "data/import/bucket4/semiannually/4research_centres.json",
        "data/import/bucket4/semiannually/4rivers.json",
        "data/import/bucket4/semiannually/4road_and_highways.json",
        "data/import/bucket4/semiannually/4services.json",
    ]

def import_data_sources():
    Bucket4SemiannualImporter.import_data_sources()
