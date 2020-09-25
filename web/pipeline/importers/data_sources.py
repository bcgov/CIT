import json

from pipeline.models.general import DataSource


def import_data_sources():
    DATA_SOURCES_FILENAME = "data/data_sources.json"

    with open(DATA_SOURCES_FILENAME) as f:
        data_sources = json.loads(f.read())

    for data_source in data_sources:
        print("data_source", data_source)
        dataset, created = DataSource.objects.update_or_create(name=data_source.pop("name"), defaults={**data_source})

        # dataset.save(*data_source)
        print("dataset", dataset)
