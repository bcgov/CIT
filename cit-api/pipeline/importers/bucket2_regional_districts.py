import json
from pipeline.models.general import DataSource
import concurrent.futures
import urllib.request


def import_data_sources():
    DATA_SOURCES_FILENAME = 'data/import/bucket2/semiannually/2regional_districts.json'

    with open(DATA_SOURCES_FILENAME) as f:
        data_sources = json.loads(f.read())

    for data_source in data_sources:
        dataset, created = DataSource.objects.update_or_create(name=data_source.pop("name"), defaults={**data_source})

        print("dataset", dataset)

