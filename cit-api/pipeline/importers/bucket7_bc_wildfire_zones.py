import json
from pipeline.models.general import DataSource

# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
def import_data_sources():
    DATA_SOURCES_FILENAME = "data/import/bucket7/7bc_wildfire_zones.json"

    with open(DATA_SOURCES_FILENAME) as f:
        data_sources = json.loads(f.read())
        #print(data_sources)

    for data_source in data_sources:
        #print(data_source)
        dataset, created = DataSource.objects.update_or_create(name=data_source.pop("name"), defaults={**data_source})

        print("dataset", dataset)


