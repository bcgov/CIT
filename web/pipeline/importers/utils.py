import csv
import requests

from django.conf import settings
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.core.exceptions import FieldDoesNotExist
from django.contrib.gis.measure import D

from pipeline.models import Community, LocationDistance


def import_data_into_point_model(resource_type, Model, row):
    print(row)

    # containing_subdiv = CensusSubdivision.objects.get(geom__contains=point)

    point = None
    location_fuzzy = False

    name_fields = Model.NAME_FIELD.split(",")
    name = ", ".join([row[name_field] for name_field in name_fields])

    try:
        point = Point(float(row[Model.LONGITUDE_FIELD]), float(row[Model.LATITUDE_FIELD]), srid=4326)
        closest_community = (
            Community.objects.annotate(distance=Distance('point', point)).order_by('distance').first()
        )
    except TypeError:
        # print(row, Model.LATITUDE_FIELD)
        # When no point is present, try the municipality name description
        if not row.get("MUNICIPALITY"):
            print(
                "Skipping error:",
                name,
                "has no municipality, geometry, or matching municipality name!",
            )
            return

        closest_community = Community.objects.filter(place_name__icontains=_try_community_name).first()
        if not closest_community:
            print(
                "Skipping error:",
                name,
                "in",
                row["MUNICIPALITY"],
                "has no geometry or matching municipality name!",
            )
            return
        point = closest_community.point
        # if the point is inferred, set the location_fuzzy flag to True
        location_fuzzy = True

    try:
        instance = Model.objects.get(name=name, location_type=resource_type, point=point)
    except Model.DoesNotExist:
        instance = Model(name=name, location_type=resource_type, point=point)

    instance.community = closest_community
    instance.location_fuzzy = location_fuzzy
    import_variable_fields(instance, row, Model)
    instance.save()

    calculate_distances(instance)

    return instance


def import_data_into_area_model(resource_type, Model, row):
    print(row)

    try:
        instance = Model.objects.get(name=row[Model.NAME_FIELD], location_type=resource_type)
    except Model.DoesNotExist:
        instance = Model(name=row[Model.NAME_FIELD], location_type=resource_type)

    import_variable_fields(instance, row, Model)

    instance.save()
    return instance


def import_variable_fields(instance, row, Model):

    for field_name, field_value in row.items():
        # loop over fields, and if the field exists
        # on the model, import this field
        transformed_field_name = field_name.replace(" ", "_").lower()
        if isinstance(field_value, str):
            try:
                field_value = field_value[: Model._meta.get_field(transformed_field_name).max_length]
            except FieldDoesNotExist:
                pass
        setattr(instance, transformed_field_name, field_value)


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


# TODO SY - these three helper functions are very similar, but
# they are simple and I'm not sure what the final abstraction will be
# so I'm leaving them as is for now.
def calculate_community_num_schools():
    for community in Community.objects.all():
        # TODO SY - make resource types constants?
        num_schools = LocationDistance.objects.filter(community=community, location__location_type="schools").count()
        community.num_schools = num_schools
        community.save()


def calculate_community_num_courts():
    for community in Community.objects.all():
        # TODO - make resource types constants?
        num_courts = LocationDistance.objects.filter(community=community, location__location_type="courts").count()
        community.num_courts = num_courts
        community.save()


def calculate_community_num_hospitals():
    for community in Community.objects.all():
        # TODO - make resource types constants?
        num_hospitals = LocationDistance.objects.filter(
            community=community, location__location_type="hospitals").count()
        community.num_hospitals = num_hospitals
        community.save()


def calculate_community_num_timber_facilities():
    for community in Community.objects.all():
        # TODO - make resource types constants?
        num_timber_facilities = LocationDistance.objects.filter(
            community=community, location__location_type="timber_facilities").count()
        community.num_timber_facilities = num_timber_facilities
        community.save()
