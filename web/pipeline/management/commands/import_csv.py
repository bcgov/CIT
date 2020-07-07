import csv
import os

import requests

from django.conf import settings
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
from django.core.management.base import BaseCommand

from pipeline.importers.communities import import_communities_from_csv


FILES_DIR = settings.BASE_DIR

COMMUNITIES_CSV = "COMMUNITIES_V2.csv"


class Command(BaseCommand):

    def handle(self, *args, **options):
        communities_file_path = os.path.join(FILES_DIR, COMMUNITIES_CSV)
        import_communities_from_csv(communities_file_path)


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
