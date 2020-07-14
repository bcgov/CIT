import csv
import requests

from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.core.exceptions import FieldDoesNotExist
from django.contrib.gis.measure import D

from pipeline.models import Community, LocationDistance


def import_data_into_model(resource_type, Model, row):

    print(row)

    # containing_subdiv = CensusSubdivision.objects.get(geom__contains=point)
    # Get the point location, and attach to a 'closest' community.
    point = None
    location_fuzzy = False
    if hasattr(Model, 'LONGITUDE_FIELD'):
        try:
            point = Point(float(row[Model.LONGITUDE_FIELD]), float(row[Model.LATITUDE_FIELD]), srid=4326)
            closest_community = (
                Community.objects.annotate(distance=Distance('point', point)).order_by('distance').first()
            )
        except TypeError:
            # print(row, Model.LATITUDE_FIELD)
            # When no point is present, try the municipality name description
            if row["MUNICIPALITY"]:
                closest_community = Community.objects.filter(place_name__icontains=_try_community_name).first()
                if not closest_community:
                    print(
                        "Skipping error:",
                        row[Model.NAME_FIELD],
                        "in",
                        row["MUNICIPALITY"],
                        "has no geometry or matching municipality name!",
                    )
                    return
                point = closest_community.point
                # if the point is inferred, set the location_fuzzy flag to True
                location_fuzzy = True

        try:
            instance = Model.objects.get(name=row[Model.NAME_FIELD], location_type=resource_type, point=point)
        except Model.DoesNotExist:
            instance = Model(name=row[Model.NAME_FIELD], location_type=resource_type, point=point)

        instance.community = closest_community
        instance.location_fuzzy = location_fuzzy

    for field_name, field_value in row.items():
        # loop over fields, and if the field exists
        # on the model, import this field
        if isinstance(field_value, str):
            try:
                field_value = field_value[: Model._meta.get_field(field_name.lower()).max_length]
            except FieldDoesNotExist:
                pass
        setattr(instance, field_name.lower(), field_value)

    instance.save()

    calculate_distances(instance)

    return instance


def calculate_distances(location):
    communities_within_50k = (
        Community.objects.filter(point__distance_lte=(location.point, D(m=50000)))
        .annotate(distance=Distance("point", location.point))
        .order_by("distance")
    )

    for community in communities_within_50k:
        create_distance(location, community)


def create_distance(location, community):
    """
    Uses Route Planner API to get distances and travel times and populate
    theDistance join table if a travel route is found.
    """
    # TODO: use route planner.
    # distance, travel_time, travel_time_display = get_route_planner_distance(community, hospital)

    # if there is a route found, create a HospitalDistance object
    # if travel_time != -1:
    fields = {
        "location": location,
        "community": community,
        "distance": community.distance.km,
        # "travel_time": travel_time,
        # "travel_time_display": travel_time_display,
        # "driving_route_available": True,
    }

    existing_distance = LocationDistance.objects.filter(location=location, community=community)
    if existing_distance:
        existing_distance.update(**fields)
    else:
        LocationDistance.objects.create(**fields)


def get_route_planner_distance(origin, destination):
    api_url = "https://router.api.gov.bc.ca/distance.json?points={origin_lng}%2C{origin_lat}%2C{destination_lng}%2C{destination_lat}".format(
        origin_lng=origin.longitude(),
        origin_lat=origin.latitude(),
        destination_lng=destination.longitude(),
        destination_lat=destination.latitude(),
    )

    response = requests.get(api_url, headers={"accept": "*/*", "apikey": settings.ROUTE_PLANNER_API_KEY})

    route = response.json()
    distance = route["distance"]
    travel_time = route["time"]
    travel_time_display = route["timeText"]

    return distance, travel_time, travel_time_display


def _try_community_name(row):
    """
    Try to get community name from municipality description in other tables.
    TODO: reverse geocode these instead?
    """
    return row["MUNICIPALITY"].split("/")[0].replace(" Area", "")


def read_csv(csv_path):
    data = []
    with open(csv_path, mode='r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        data = list(reader)

    return data
