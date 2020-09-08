import os

from django.conf import settings

from pipeline.constants import CSV_RESOURCES
from pipeline.importers.communities import import_communities_from_csv
from pipeline.importers.utils import import_data_into_point_model, read_csv

FILES_DIR = settings.BASE_DIR


def import_csv_resources(resource_type):
    if resource_type not in ['all', *CSV_RESOURCES.keys()]:
        print("Error: Resource type {} not supported".format(resource_type))
        return

    if resource_type == "all":
        for available_resource_type in CSV_RESOURCES.keys():
            import_resource(available_resource_type)
    else:
        import_resource(resource_type)


def import_resource(resource_type):
    file_path = os.path.join(FILES_DIR, CSV_RESOURCES[resource_type]["csv_path"])

    # TODO SY - move this into constants?
    location_csv_resources = [
        "first_responders", "diagnostic_facilities", "timber_facilities", "civic_facilities",
        "closed_mills", "airports"]

    if resource_type == "communities":
        import_communities_from_csv(file_path)
    elif resource_type in location_csv_resources:
        resource_config = CSV_RESOURCES[resource_type]
        data = read_csv(resource_config["csv_path"])
        for row in data:
            import_data_into_point_model(resource_type, resource_config["model"], row)
    else:
        print("Error: Resource type {} not supported".format(resource_type))
