import csv
import os

import requests

from django.conf import settings
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
from django.core.management.base import BaseCommand

from web.models import Hospital, Community, HospitalDistance

FILES_DIR = settings.BASE_DIR

COMMUNITIES_CSV = "COMMUNITIES_V2.csv"


class Command(BaseCommand):

    def handle(self, *args, **options):
        import_communities_from_csv()


def import_communities_from_csv():
    communities_file_path = os.path.join(FILES_DIR, COMMUNITIES_CSV)
    with open(communities_file_path) as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=',')
        for row in csv_reader:
            place_id = row["Place ID"]

            # **Other fields to consider adding**
            #    BASE_ACCESS_50Mbps,Community Type,FN_Community_Name,Nation,Band_Number
            #    Municipality Classification,Municipality or is within the boundaries of one (1=Yes)
            #    Municapility URL Code,Municipality URL Address
            #    Distance to nearest Weather Station,Weather Station Number,Weather Station Name
            # **census info. should come from separate normalized table**
            #    CDUID, CENSUS SD TYPE,CENSUS 2016 SD POP,CENSUS 2016 SD Total Dwelling,
            # **these seem inaccurate, don't use**
            #    CSDUID Repeat Count (used to estimate Pop and Dwelling),Estimated Population,Estimated Total Dwellings,CENSUS DIVISION NAME,CENSUS METRO AREA NAME,CENSUS ECONOMIC REGION NAME,CENSUS SD NAME
            fields = {
                "id": place_id,
                "place_name": row["Place Name"],
                "census_subdivision_id": row['CSDUID'],
                "hexuid": row['HEXUID'],
                "location": Point(float(row["Longitude"]), float(row["Latitude"]))
            }

            existing_community = Community.objects.filter(place_id=place_id)
            if existing_community:
                existing_community.update(**fields)
            else:
                Community.objects.create(**fields)


def get_route_planner_distance(origin, destination):
    """
    Use the BC Route Planner to get driving distances between points.
    """
    api_url = "https://router.api.gov.bc.ca/distance.json?points={origin_lng}%2C{origin_lat}%2C{destination_lng}%2C{destination_lat}".format(
        origin_lng=origin.longitude(),
        origin_lat=origin.latitude(),
        destination_lng=destination.longitude(),
        destination_lat=destination.latitude())

    response = requests.get(
        api_url,
        headers={"accept": "*/*", "apikey": settings.ROUTE_PLANNER_API_KEY})

    route = response.json()
    distance = route["distance"]
    travel_time = route["time"]
    travel_time_display = route["timeText"]

    return distance, travel_time, travel_time_display
