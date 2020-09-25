import json

from pipeline.models.general import DataSource
from pipeline.utils import get_databc_last_modified_date


def import_data_sources():
    DATA_SOURCES_FILENAME = "data/data_sources.json"

    with open(DATA_SOURCES_FILENAME) as f:
        data_sources = json.loads(f.read())

    for data_source in data_sources:
        dataset, created = DataSource.objects.update_or_create(name=data_source.pop("name"), defaults={**data_source})

        if dataset.resource_id:
            dataset.last_updated = get_databc_last_modified_date(dataset.resource_id)
            dataset.save()
        print("dataset", dataset)
