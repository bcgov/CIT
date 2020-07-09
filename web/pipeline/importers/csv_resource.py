import os

from django.conf import settings

from pipeline.constants import CSV_RESOURCES
from pipeline.importers.communities import import_communities_from_csv
from pipeline.importers.utils import import_data_into_model, read_csv

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

    if resource_type == "communities":
        import_communities_from_csv(file_path)
    elif resource_type == "first_responders":
        resource_config = CSV_RESOURCES[resource_type]
        data = read_csv(resource_config["csv_path"])
        import_data_into_model(resource_type, resource_config["model"], data)


# TODO: this is unused right now
# def get_route_planner_distance(origin, destination):
#     """
#     Use the BC Route Planner to get driving distances between points.
#     """
#     api_url = "https://router.api.gov.bc.ca/distance.json?points={origin_lng}%2C{origin_lat}%2C{destination_lng}%2C{destination_lat}".format(
#         origin_lng=origin.longitude(),
#         origin_lat=origin.latitude(),
#         destination_lng=destination.longitude(),
#         destination_lat=destination.latitude())

#     response = requests.get(
#         api_url,
#         headers={"accept": "*/*", "apikey": settings.ROUTE_PLANNER_API_KEY})

#     route = response.json()
#     distance = route["distance"]
#     travel_time = route["time"]
#     travel_time_display = route["timeText"]

#     return distance, travel_time, travel_time_display
