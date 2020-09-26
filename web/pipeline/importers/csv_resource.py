import os

from django.apps import apps
from django.conf import settings

from pipeline.models.general import DataSource
from pipeline.importers.communities import import_communities_from_csv
from pipeline.importers.utils import import_data_into_point_model, read_csv

FILES_DIR = settings.BASE_DIR


def import_csv_resources(resource_type):
    csv_resource_names = DataSource.objects.filter(source_type="csv").values_list("name", flat=True)
    if resource_type not in ['all', csv_resource_names]:
        print("Error: Resource type {} not supported".format(resource_type))
        return

    if resource_type == "all":
        for available_resource_type in csv_resource_names:
            import_resource(available_resource_type)
    else:
        import_resource(resource_type)


def import_resource(resource_type):
    data_source = DataSource.objects.get(name=resource_type)
    file_path = os.path.join(FILES_DIR, data_source.source_file_path)

    # TODO SY - move this into constants?
    location_csv_resources = [
        "first_responders", "diagnostic_facilities", "timber_facilities", "civic_facilities",
        "closed_mills", "airports"]

    if resource_type == "communities":
        import_communities_from_csv(file_path)
    elif resource_type in location_csv_resources:
        data = read_csv(data_source.source_file_path)
        for row in data:
            model_class = apps.get_model("pipeline", data_source.model_name)
            import_data_into_point_model(resource_type, model_class, row)
    else:
        print("Error: Resource type {} not supported".format(resource_type))
