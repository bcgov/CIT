import csv
from numpy import int64
import requests
import copy
import math
import requests
import io
import pandas as pd

from io import BytesIO
from zipfile import ZipFile
from urllib.request import urlopen

from django.db import connection
from django.apps import apps
from django.conf import settings
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.core.files import File
from django.core.exceptions import FieldDoesNotExist
from django.contrib.gis.measure import D
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware
from django.contrib.gis.geos import (
    GEOSGeometry,
    MultiPolygon,
    Polygon,
    LineString,
    MultiLineString,
)

from pipeline.constants import WGS84_SRID
from pipeline.models import LinkageWithCensus
from pipeline.models.tourism_region import TourismRegion
from pipeline.models.community import Community
from pipeline.models.business_by_census_subdivions import BusinessesByCSD
from pipeline.models.cen_prof_detailed_csd_attrs_sp import (
    CEN_PROF_DETAILED_CSD_ATTRS_SP,
)
from pipeline.models.census_economic_region import CensusEconomicRegion
from pipeline.models.general import (
    DataSource,
    LocationDistance,
    SchoolDistrict,
    Municipality,
    Service,
    RegionalDistrict,
)
from pipeline.models.location_assets import School, Hospital
from pipeline.models.census_division_2016 import *
from pipeline.models.census_subdivision_2016 import *
from pipeline.constants import LOCATION_TYPES

from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from sqlalchemy import create_engine
from pipeline.models.Housing_Data import Housing_Data
from pipeline.models.connectivity_infrastructure_projects import (
    ConnectivityInfrastructureProjects,
)
from pipeline.models import NAICSCodes
from pipeline.models.general import PHDemographicDistribution


RETRY_STRATEGY = Retry(total=3)
ADAPTER = HTTPAdapter(max_retries=RETRY_STRATEGY)


def import_data_into_point_model(resource_type, Model, row, dry_run=False):
    # print("import_data_into_point_model", row)

    point = None
    location_fuzzy = False

    name_fields = Model.NAME_FIELD.split(",")
    name = ", ".join([str(row[name_field]) for name_field in name_fields])

    try:
        if Model.LONGITUDE_FIELD and Model.LATITUDE_FIELD:
            point = Point(
                float(row[Model.LONGITUDE_FIELD]),
                float(row[Model.LATITUDE_FIELD]),
                srid=WGS84_SRID,
            )
        else:
            point = Point(row.geometry.x, row.geometry.y, srid=WGS84_SRID)
        # print(point)
        closest_community = (
            Community.objects.annotate(distance=Distance("point", point))
            .order_by("distance")
            .first()
        )
        # print(closest_community)
    except TypeError:
        # When no point is present, try the municipality name description
        if not row.get("MUNICIPALITY"):
            print(
                "Skipping error:",
                name,
                "has no municipality, geometry, or matching municipality name!",
            )
            return

        closest_community = Community.objects.filter(
            place_name__icontains=_try_community_name(row)
        ).first()
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
        instance = Model.objects.get(
            name=name, location_type=resource_type, point=point
        )
    except Model.DoesNotExist:
        instance = Model(name=name, location_type=resource_type, point=point)

    # print("closest_community", closest_community)

    instance.closest_community = closest_community
    instance.closest_community_distance = closest_community.distance
    instance.location_fuzzy = location_fuzzy
    import_contact_fields(instance, row, Model)
    import_variable_fields(instance, row, Model)

    instance.save()
    calculate_distances(instance, dry_run=dry_run)

    return instance


def import_data_into_area_model(resource_type, Model, row, index=None):
    if resource_type == "Census Subdivisions":
        instance, created = Model.objects.get_or_create(
            census_subdivision_id=row["CENSUS_SUBDIVISION_ID"]
        )
    elif resource_type == "Census Division":
        instance, created = Model.objects.get_or_create(
            census_division_id=row["CENSUS_DIVISION_ID"]
        )
    elif resource_type == "Census Division 2016":
        instance, created = Model.objects.get_or_create(
            census_division_id=row["CENSUS_DIVISION_ID"]
        )
    elif resource_type == "Census Subdivisions 2016":
        instance, created = Model.objects.get_or_create(
            census_subdivision_id=row["CENSUS_SUBDIVISION_ID"]
        )

    elif resource_type == "Tourism Regions":
        instance, created = Model.objects.get_or_create(
            tourism_region_id=row["TOURISM_REGION_ID"]
        )

    elif resource_type == "BC Wildfire Fire Zones":
        instance, created = Model.objects.get_or_create(
            zone_id=row["MOF_FIRE_ZONE_ID"],
            centre_name=row["MOF_FIRE_CENTRE_NAME"],
            zone_name=row["MOF_FIRE_ZONE_NAME"],
            headquarter_city_name=row["HEADQUARTERS_CITY_NAME"],
        )

    elif resource_type == "BC Network Connectivity":
        instance, created = Model.objects.get_or_create(
            bcnc_ncs_sysid=row["BCNC_NCS_SYSID"],
            hex_code_id=row["HEX_CODE_ID"],
            population=row["POPULATION"],
            total_dwellings=row["TOTAL_DWELLINGS"],
            usual_residences=row["USUAL_RESIDENCES"],
            td_underserved_50mpbs=row["TD_UNDERSERVED_50MBPS"],
            internet_zone=row["INTERNET_ZONE"],
            mobile_wireless_coverage=row["MOBILE_WIRELESS_COVERAGE"],
            percent_served_5_mbps=row["PERCENT_SERVED_5_MBPS"],
            percent_served_50_mbps=row["PERCENT_SERVED_50_MBPS"],
            cable_providers=row["CABLE_PROVIDERS"],
            fibre_providers=row["FIBRE_PROVIDERS"],
            dsl_providers=row["DSL_PROVIDERS"],
            fixed_wireless_providers=row["FIXED_WIRELESS_PROVIDERS"],
            satellite_providers=row["SATELLITE_PROVIDERS"],
            mobile_wireless_providers=row["MOBILE_WIRELESS_PROVIDERS"],
            transport_fibre_providers=row["TRANSPORT_FIBRE_PROVIDERS"],
        )

    else:
        name_fields = Model.NAME_FIELD.split(",")
        name = ", ".join([str(row[name_field]) for name_field in name_fields])

        if name == "None":
            if hasattr(Model, "ID_FIELD"):
                name = f"Unnamed {resource_type} {row[Model.ID_FIELD]}"
                # print("Name", name)
            else:
                name = f"Unnamed {resource_type} {index}"
                # print("Name", name)

        # Not forced unique names in the dataset
        if resource_type == "Indian Reserves and Band Names":
            name = f"{row[Model.NAME_FIELD]}, {row[Model.ID_FIELD]}"
        instance, created = Model.objects.get_or_create(name=name)

    # print("instance", instance)
    if hasattr(Model, "ID_FIELD"):
        instance.area_id = row[Model.ID_FIELD]

    import_variable_fields(instance, row, Model)

    instance.save()
    return instance


def import_contact_fields(instance, row, Model):
    website_field = getattr(Model, "WEBSITE_FIELD", None)
    alt_website_field = getattr(Model, "ALT_WEBSITE_FIELD", None)
    instance.location_website = None
    if website_field or alt_website_field:
        if row.get(website_field):
            instance.location_website = row[website_field]
        elif alt_website_field and row.get(alt_website_field):
            instance.location_website = row[alt_website_field]

    instance.location_phone = None
    phone_field = getattr(Model, "PHONE_FIELD", None)
    if phone_field:
        instance.location_phone = row[phone_field]

    instance.location_email = None
    email_field = getattr(Model, "EMAIL_FIELD", None)
    if email_field:
        instance.location_email = row[email_field]


def import_variable_fields(instance, row, Model):
    for field_name, field_value in row.items():
        # loop over fields, and if the field exists
        # on the model, import this field
        transformed_field_name = field_name.replace(" ", "_").lower()
        if isinstance(field_value, str):
            try:
                field_value = field_value[
                    : Model._meta.get_field(transformed_field_name).max_length
                ]
            except FieldDoesNotExist:
                pass
        if isinstance(field_value, float) and math.isnan(field_value):
            field_value = None
        setattr(instance, transformed_field_name, field_value)


def calculate_communities_for_schools():
    for school in School.objects.all():
        print("school", school)
        school_district = SchoolDistrict.objects.get(geom__contains=school.point)
        print("school district", school_district.name)

        school.school_district = school_district
        school.save()

        # Note: using the Community point is better than checking for municipality area overlap because
        # most communities are unincorporated and thus do not have a linked municipality
        communities = Community.objects.filter(point__intersects=school_district.geom)
        school_district.community.set(communities)
        print("communities", communities)


def calculate_distances(location, dry_run=False):
    communities_within_50k = (
        Community.objects.filter(point__distance_lte=(location.point, D(m=50000)))
        .annotate(distance=Distance("point", location.point))
        .order_by("distance")
    )

    for community in communities_within_50k:
        create_distance(location, community, community.distance, dry_run=dry_run)


def calculate_nearest_location_types_outside_50k():
    for location_type in LOCATION_TYPES:
        calculate_nearest_location_type_outside_50k(location_type)


def calculate_nearest_location_type_outside_50k(location_type):
    for community in Community.objects.all():
        locations_within_50k = LocationDistance.objects.filter(
            community=community, location__location_type=location_type, distance__lte=50
        )
        # if there are no locations of this location type within 50km,
        # just get the closest location and create a LocationDistance object for that
        if not locations_within_50k:
            print(
                "community {community_name} has no {location_type} within 50km".format(
                    community_name=community.place_name, location_type=location_type
                )
            )
            location_type_model_name = DataSource.objects.get(
                name=location_type
            ).model_name
            location_type_model = apps.get_model("pipeline", location_type_model_name)

            # TODO - refactor this later and don't hardcode the list of categories
            if location_type == "first_responders":
                for service_type in ["fire", "police", "ambulance"]:
                    keyword = "{};".format(service_type)
                    closest_location_type = (
                        location_type_model.objects.filter(keywords__startswith=keyword)
                        .annotate(distance=Distance("point", community.point))
                        .order_by("distance")
                        .first()
                    )
                    print(
                        "closest {location_type} to {community_name} is {closest_location_type} {distance} km".format(
                            location_type=location_type,
                            community_name=community.place_name,
                            closest_location_type=closest_location_type.name,
                            distance=closest_location_type.distance.km,
                        )
                    )

                    create_distance(
                        closest_location_type, community, closest_location_type.distance
                    )
            else:
                closest_location_type = (
                    location_type_model.objects.all()
                    .annotate(distance=Distance("point", community.point))
                    .order_by("distance")
                    .first()
                )
                print(
                    "closest {location_type} to {community_name} is {closest_location_type} {distance} km".format(
                        location_type=location_type,
                        community_name=community.place_name,
                        closest_location_type=closest_location_type.name,
                        distance=closest_location_type.distance.km,
                    )
                )

                create_distance(
                    closest_location_type, community, closest_location_type.distance
                )


def create_distance(location, community, distance, dry_run=False):
    existing_distance = LocationDistance.objects.filter(
        location=location, community=community
    )

    fields = {
        "location": location,
        "community": community,
        "distance": distance.km,
    }

    if not dry_run and not (
        existing_distance and existing_distance.first().driving_distance
    ):
        try:
            (
                driving_distance,
                travel_time,
                travel_time_display,
            ) = get_route_planner_distance(community, location)
            fields["driving_distance"] = driving_distance
            fields["travel_time"] = travel_time
            fields["travel_time_display"] = travel_time_display
        except Exception as e:
            print(
                "Error getting driving distance for {} to {}".format(
                    community, location
                )
            )
            print(e)

    if existing_distance:
        existing_distance.update(**fields)
    else:
        LocationDistance.objects.create(**fields)


def calculate_municipality_flag_for_location_assets():
    count = LocationDistance.objects.count()
    for i, location_distance in enumerate(LocationDistance.objects.all()):
        print("{} of {}".format(i, count), location_distance)
        if not location_distance.community.municipality:
            location_distance.within_municipality = False
        else:
            location_distance.within_municipality = (
                location_distance.location.point.intersects(
                    location_distance.community.municipality.geom
                )
            )
        location_distance.save()


def get_route_planner_distance(origin, destination):
    # print("calculating distance", origin, destination)
    api_url = (
        "https://router.api.gov.bc.ca/distance.json?points={origin_lng}%2C{origin_lat}%2C{destination_lng}"
        "%2C{destination_lat}".format(
            origin_lng=origin.longitude(),
            origin_lat=origin.latitude(),
            destination_lng=destination.get_longitude(),
            destination_lat=destination.get_latitude(),
        )
    )
    # print(api_url)

    http = requests.Session()
    http.mount("https://", ADAPTER)
    http.mount("http://", ADAPTER)

    response = http.get(
        api_url,
        headers={"accept": "*/*", "apikey": settings.ROUTE_PLANNER_API_KEY},
        timeout=30,
    )

    # print("response", response, response.content)
    route = response.json()
    distance = None
    travel_time = None
    travel_time_display = None

    if route["time"] != -1:
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
    with open(csv_path, mode="r", encoding="utf-8-sig", errors="ignore") as f:
        reader = csv.DictReader(f)
        data = list(reader)

    return data


# TODO SY - these three helper functions are very similar, but
# they are simple and I'm not sure what the final abstraction will be
# so I'm leaving them as is for now.
def calculate_community_num_schools():
    for community in Community.objects.all():
        # TODO SY - make resource types constants?
        num_schools = LocationDistance.objects.filter(
            community=community, location__location_type="schools"
        ).count()
        community.num_schools = num_schools

        if num_schools > 0:
            community.has_any_k12_school = True
        else:
            community.has_any_k12_school = False

        community.save()


def calculate_community_num_courts():
    for community in Community.objects.all():
        # TODO - make resource types constants?
        num_courts = LocationDistance.objects.filter(
            community=community, location__location_type="courts"
        ).count()
        community.num_courts = num_courts
        community.save()


def calculate_community_num_hospitals():
    for community in Community.objects.all():
        # TODO - make resource types constants?
        num_hospitals = LocationDistance.objects.filter(
            community=community, location__location_type="hospitals"
        ).count()
        community.num_hospitals = num_hospitals
        community.save()


def calculate_community_num_timber_facilities():
    for community in Community.objects.all():
        # TODO - make resource types constants?
        num_timber_facilities = LocationDistance.objects.filter(
            community=community, location__location_type="timber_facilities"
        ).count()
        community.num_timber_facilities = num_timber_facilities
        community.save()


def calculate_regional_districts_for_communities():
    from pipeline.models.general import RegionalDistrict

    for community in Community.objects.all():
        print("Community", community)
        try:
            regional_district = RegionalDistrict.objects.filter(
                geom__contains=community.point
            ).first()
            # print("community regional_district", community, regional_district.name)
        except RegionalDistrict.DoesNotExist:
            print(
                "Error: regional district for community {} was not found".format(
                    community
                )
            )
        else:
            print("Regional District", regional_district)
            community.regional_district = regional_district
            community.save()


def calculate_parent_child_communities():
    for community in Community.objects.filter(incorporated=False):
        municipalities = Municipality.objects.filter(geom__contains=community.point)
        if municipalities.count() == 1:
            parent_community = Community.objects.filter(
                point__intersects=municipalities.first().geom, incorporated=True
            )
            if parent_community.count() == 1:
                community.parent_community = parent_community.first()
                community.save()


def calculate_communities_served_for_hospitals():
    for hospital in Hospital.objects.all():
        num_communities_within_50km = (
            Community.objects.filter(
                distances__location=hospital,
                distances__location__location_type="hospitals",
                distances__distance__lte=50,
            )
            .distinct()
            .count()
        )
        hospital.num_communities_within_50km = num_communities_within_50km
        hospital.save()


def import_bc_assessment_data(file_path, Model, resource_type):
    with open(file_path) as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=",")
        link_field = Model.LINK_FIELD

        for row in csv_reader:
            id_field = row[Model.ID_FIELD]
            instance = None
            # need to match the truncated csduid to the first 4 digits of the census subdivision.
            if resource_type == "bc_assessment_regional_district":
                try:
                    instance = Model.objects.get(bca_sbcdu_sysid=id_field)
                except Model.DoesNotExist:
                    instance = Model(bca_sbcdu_sysid=id_field)
                regional_district_id = Community.objects.raw(
                    "select id, regional_district_id from pipeline_community where CAST(census_subdivision_id AS TEXT) LIKE %s limit 1",
                    [str(row[link_field]) + "%"],
                )[0].regional_district_id
                print(row[link_field])
                regional_district = RegionalDistrict.objects.get(
                    id=regional_district_id
                )
                instance.regional_district = regional_district

            elif resource_type == "bc_assessment_census_subdivision":
                try:
                    instance = Model.objects.get(bca_sbcsdu_sysid=id_field)
                except Model.DoesNotExist:
                    instance = Model(bca_sbcsdu_sysid=id_field)
                census_subdiv = CEN_PROF_DETAILED_CSD_ATTRS_SP.objects.get(
                    census_subdivision_id=int(row[link_field])
                )
                instance.census_subdivision = census_subdiv

            elif resource_type == "bc_assessment_economic_region":
                try:
                    instance = Model.objects.get(bca_sberu_sysid=id_field)
                except Model.DoesNotExist:
                    instance = Model(bca_sberu_sysid=id_field)
                census_economic_reg = CensusEconomicRegion.objects.get(
                    economic_region_id=int(row[link_field])
                )
                instance.economic_region = census_economic_reg

            import_variable_fields(instance, row, Model)
            print(instance.__dict__)
            instance.save()


def import_civic_leaders_from_csv(file_path):
    with open(file_path) as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=",")
        for row in csv_reader:
            # Only import elected mayors and [todo] councillors
            if not (
                row["Elected (YES/NO)"] == "YES"
                and (row["Type"] == "MAYOR" or row["Type"] == "COUNCILLOR")
            ):
                continue

            try:
                community = Community.objects.get(place_name=row["Local Government"])

            except Community.DoesNotExist:
                print(
                    "Could not find community called {}".format(row["Local Government"])
                )
                continue

            if row["Type"] == "MAYOR":
                position = "mayor"
            elif row["Type"] == "COUNCILLOR":
                position = "councillor"

            civic_leader, created = CivicLeader.objects.get_or_create(
                first_name=row["First Name"].title(),
                last_name=row["Last Name"].title(),
                middle_name=row["Middle Name"].title(),
                community=community,
                position=position,
            )
            print("civic_leader", civic_leader)

            civic_leader.gender = row["Gender"].title()
            civic_leader.experience = row["Experience"].title()
            civic_leader.save()


def import_services(url):
    s = requests.get(url)
    if s.ok:
        try:
            resp = urlopen(url)
            zipfile = ZipFile(BytesIO(resp.read()))
            with zipfile.open("ISP_Hex_FSI.csv") as f:
                fields = ["HEXuid_HEXidu", "ISPname_NomFSI", "Technology"]
                services = pd.read_csv(f, header=0, delimiter=",", usecols=fields)
                services.rename(
                    columns={
                        services.columns[0]: "hex_id",
                        services.columns[1]: "isp_id",
                        services.columns[2]: "technology",
                    },
                    inplace=True,
                )
                write_to_db(Service, services)
        except Exception as e:
            print(e)


def get_databc_last_modified_date(data_source):
    from pipeline.constants import DATABC_METADATA_API_URL

    response = requests.get(
        DATABC_METADATA_API_URL.format(dataset_resource_id=data_source.resource_id)
    )
    result = response.json()["result"]

    if not result:
        print("data source metadata not found", data_source.resource_id)
        print(result)
        return

    if result["last_modified"]:
        date = result["last_modified"]
    elif result["created"]:
        date = result["created"]
    else:
        print("no date found for resource", data_source.resource_id)
        print(result)
        return

    last_modified_date = make_aware(parse_datetime(date))
    return last_modified_date


def get_openca_last_modified_date(data_source):
    from pipeline.constants import OPENCA_METADATA_API_URL

    response = requests.get(
        OPENCA_METADATA_API_URL.format(dataset_resource_id=data_source.resource_id)
    )
    if response.status_code == 404:
        print("data source metadata not found", data_source.resource_id)
        return

    result = response.json()["result"]

    sub_resources = result["resources"]
    sub_resource = next(
        (
            sub_resource
            for sub_resource in sub_resources
            if sub_resource["id"] == data_source.sub_resource_id
        ),
        None,
    )
    print(sub_resource)

    if sub_resource["last_modified"]:
        date = sub_resource["last_modified"]
    elif sub_resource["created"]:
        date = sub_resource["created"]
    else:
        print(
            "no date found for resource",
            data_source.resource_id,
            data_source.sub_resource_id,
        )
        print(sub_resource)
        return

    last_modified_date = make_aware(parse_datetime(date))
    return last_modified_date


def import_community_descriptions():
    community_descriptions_file = "data/community_descriptions.csv"

    with open(community_descriptions_file, "r") as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=",")
        for row in csv_reader:
            census_subdivision_id = row["census_subdivision_id"]
            community_description = row["short_description"]
            header_image_path = row["header_image_path"]

            matching_communities = Community.objects.filter(
                census_subdivision__id=census_subdivision_id
            )
            if matching_communities.count() > 1:
                if row["census_subdivision_name"] == "Northern Rockies":
                    community = Community.objects.get(place_name="Fort Nelson")
                elif row["census_subdivision_name"] == "Lake Country":
                    community = Community.objects.get(place_name="Winfield")
                elif row["census_subdivision_name"] == "West Kelowna":
                    community = Community.objects.get(place_name="Westbank")
                elif row["census_subdivision_name"] == "North Cowichan":
                    community = Community.objects.get(place_name="Westholme")
                elif row["census_subdivision_name"] == "Delta":
                    community = Community.objects.get(place_name="Ladner")
                elif row["census_subdivision_name"] == "North Cowichan":
                    community = Community.objects.get(place_name="Westholme")
                elif row["census_subdivision_name"] == "Bowen Island":
                    community = Community.objects.get(place_name="Snug Cove")
                elif row["census_subdivision_name"] == "Queen Charlotte":
                    community = Community.objects.get(place_name="Snug Cove")
                elif row["census_subdivision_name"] == "West Vancouver":
                    community = Community.objects.get(place_name="Hollyburn")
            elif matching_communities.count() == 1:
                community = Community.objects.get(
                    census_subdivision__id=census_subdivision_id
                )
            else:
                continue

            community.description = community_description

            image_folder = row["ItemGUID"].lower()
            image_filename = header_image_path.split("/")[-1]
            image_file_path = "data/Communities/{}/{}".format(
                image_folder, image_filename
            )
            print("image_path", image_filename)
            try:
                image = open(image_file_path, "rb")
                community.header_image.save("{}.png".format(community.id), File(image))
                image.close()
            except FileNotFoundError:
                print(
                    "could not find file for {}: {}".format(
                        community.place_name, image_file_path
                    )
                )

            community.save()


def write_to_db(Model, data):
    user = settings.DATABASES["default"]["USER"]
    password = settings.DATABASES["default"]["PASSWORD"]
    database_name = settings.DATABASES["default"]["NAME"]
    Host = settings.DATABASES["default"]["HOST"]
    database_url = "postgresql://{user}:{password}@{Host}:5432/{database_name}".format(
        user=user, password=password, Host=Host, database_name=database_name
    )
    engine = create_engine(database_url)
    data.to_sql(Model._meta.db_table, if_exists="replace", con=engine, index=False)


def exists(lst, element):
    for i in lst:
        if i == element:
            return 1
        continue
    return 0


def import_businesses_by_cid(tourism_file, url):
    # url ='https://agriculture.canada.ca/atlas/data_donnees/soc/businessesByCSD/csv/businesses_by_census_subdivision.zip'
    # tourism_file = "data/Tourism NAICS.xlsx"
    s = requests.get(url)
    num_records = 0
    if s.ok:
        try:
            resp = urlopen(url)
            zipfile = ZipFile(BytesIO(resp.read()))

            with zipfile.open("June23_Loc_CSD_NAICS-6_ESR-9.csv") as f:
                fields = ["SGC", "NAICS", "empcl", "FREQ"]
                businesses = pd.read_csv(f, header=0, delimiter=",", usecols=fields)
                businesses.rename(
                    columns={
                        businesses.columns[0]: "census_subdivision_id",
                        businesses.columns[1]: "naics_code",
                        businesses.columns[2]: "employee_class",
                        businesses.columns[3]: "number_of_businesses",
                    },
                    inplace=True,
                )

            # businesses.head(10)
            # data = pd.read_excel(tourism_file, skiprows = 1)
            data = pd.read_excel(tourism_file, engine="openpyxl", skiprows=1)
            tourism_list = data["NAICS"].tolist()
            sectors = []
            for index, row in businesses.iterrows():
                if exists(tourism_list, row["naics_code"]) == 1:
                    sectors.append("tourism")
                if exists(tourism_list, row["naics_code"]) == 0:
                    sectors.append("")
            businesses["sector"] = sectors
            businesses.head(10)
            write_to_db(BusinessesByCSD, businesses)
            num_records = len(businesses)
        except Exception as e:
            print(e)

    else:
        print("Error in fetching data from the url")
    return num_records


def import_naics_codes(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Upgrade-Insecure-Requests": "1",
        "DNT": "1",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
    }
    # url = "https://www.statcan.gc.ca/eng/statistical-programs/document/naics-scian-2022-structure-v1-eng.csv"
    s = requests.get(url, headers=headers)
    if s.ok:
        try:
            data1 = s.content.decode("utf8")
            data = pd.read_csv(io.StringIO(data1))
            data.rename(
                columns={
                    data.columns[0]: "level",
                    data.columns[1]: "hierarchical_structure",
                    data.columns[2]: "code",
                    data.columns[3]: "parent",
                    data.columns[4]: "class_title",
                },
                inplace=True,
            )
            data.drop("Superscript", axis=1, inplace=True)
            data.drop("Class definition", axis=1, inplace=True)
            write_to_db(NAICSCodes, data)
        except Exception as e:
            print(e)


def import_connectivity_project(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Upgrade-Insecure-Requests": "1",
        "DNT": "1",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
    }
    s = requests.get(url, headers=headers)
    if s.ok:
        try:
            data1 = s.content.decode("utf8")
            data = pd.read_csv(io.StringIO(data1))
            data.rename(
                columns={
                    data.columns[0]: "project",
                    data.columns[1]: "project_name",
                    data.columns[2]: "proponent",
                    data.columns[3]: "place_id",
                    data.columns[4]: "community_name",
                    data.columns[5]: "place_type",
                    data.columns[6]: "latitude",
                    data.columns[7]: "longitude",
                    data.columns[8]: "phase",
                    data.columns[9]: "num_housesholds_served",
                    data.columns[10]: "speed",
                    data.columns[11]: "status",
                    data.columns[12]: "type_of_project",
                    data.columns[13]: "project_description",
                    data.columns[14]: "bc_funding",
                    data.columns[15]: "estimated_start_date",
                    data.columns[16]: "estimated_completion_date",
                    data.columns[17]: "economic_region",
                    data.columns[18]: "electoral_name",
                    data.columns[19]: "primary_news_release",
                    # data.columns[19]:"place_type",
                    # data.columns[20]:"reserve_name",
                    # data.columns[21]:"nation"
                },
                inplace=True,
            )
            data["estimated_start_date"] = data["estimated_start_date"].str[1:]
            data["estimated_completion_date"] = data["estimated_completion_date"].str[
                1:
            ]
            data["estimated_start_date"] = pd.to_datetime(
                data["estimated_start_date"], format="%Y-%m-%d"
            )
            data["estimated_completion_date"] = pd.to_datetime(
                data["estimated_completion_date"], format="%Y-%m-%d"
            )
            # data.drop('Nation', axis=1, inplace=True)
            # data.drop('Unnamed: 23', axis=1, inplace=True)
            drop_list = ["CSDUID", "Nation", "Unnamed: 23"]
            thisFilter = data.filter(drop_list)
            data.drop(thisFilter, inplace=True, axis=1)
            write_to_db(ConnectivityInfrastructureProjects, data)
        except Exception as e:
            print(e)


def remove_dependencies():
    with connection.cursor() as cursor:
        cursor.execute(f"DROP VIEW IF EXISTS public.cit_regions_distribution_vw;")


def add_dependencies():
    with connection.cursor() as cursor:
        cursor.execute(
            """CREATE OR REPLACE VIEW public.cit_regions_distribution_vw AS
               SELECT DISTINCT 'All of British Columbia'::text AS zone_type,
    'All of British Columbia'::text AS zone_name,
    1::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	'All of British Columbia'::text as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_cen_prof_detailed_csd_attrs_sp csd
UNION
 SELECT DISTINCT 'Regional District'::text AS zone_type,
    rd.name AS zone_name,
    rd.area_id::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	rd.name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_regionaldistrict rd ON lk.regional_district_id = rd.area_id::bigint::double precision
UNION
 SELECT DISTINCT 'Census Subdivision'::text AS zone_type,
    csd.census_subdivision_name AS zone_name,
    csd.census_subdivision_id::text AS zone_id,
    csd.census_subdivision_id,
	csd.census_subdivision_type_desc as census_comm_type,
	case when csd.census_subdivision_type_desc is null then csd.census_subdivision_name else concat(csd.census_subdivision_name,' (', csd.census_subdivision_type_desc, ')') end as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_cen_prof_detailed_csd_attrs_sp csd
UNION
 SELECT DISTINCT 'Community'::text AS zone_type,
    com.place_name AS zone_name,
    com.id::text AS zone_id,
    com.census_subdivision_id,
	com.community_type as census_comm_type,
	com.place_name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_community com
   left join pipeline_cen_prof_detailed_csd_attrs_sp csd on com.census_subdivision_id = csd.census_subdivision_id
UNION
 SELECT 'Tourism Region'::text AS zone_type,
    tr.tourism_region_name AS zone_name,
    tr.tourism_region_id::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	tr.tourism_region_name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_tourismregion tr ON lk.tourism_region_id = tr.tourism_region_id::text
UNION
 SELECT 'Economic Region'::text AS zone_type,
    er.name AS zone_name,
    er.economic_region_id::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	er.name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_censuseconomicregion er ON lk.economic_region_id = er.economic_region_id
UNION
 SELECT 'Wildfire Zone'::text AS zone_type,
    wf.zone_name,
    wf.zone_id::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	wf.zone_name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_bcwildfirezone wf ON lk.bc_fire_zone_id = wf.zone_id
UNION
 SELECT 'Tsunami Zone'::text AS zone_type,
    tz.tsunami_zone_name AS zone_name,
    tz.name::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	tz.tsunami_zone_name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_tsunamizone tz ON lk.tsunami_notification_zone_id = tz.name::bigint::double precision
UNION
 SELECT 'Health Authority'::text AS zone_type,
    ha.name AS zone_name,
    ha.id::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	ha.name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_healthauthorityboundary ha ON lk.health_authority_id = ha.id
UNION
 SELECT 'School District'::text AS zone_type,
    sd.name AS zone_name,
    sd.area_id::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	sd.name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_schooldistrict sd ON lk.school_district_id = sd.area_id
UNION
 SELECT 'Natural Resource Region'::text AS zone_type,
    nrr.name AS zone_name,
    nrr.id::text AS zone_id,
    csd.census_subdivision_id,
	null as census_comm_type,
	nrr.name as zone_name_census_type,
	csd.census_subdivision_name as zone_name_census_name
   FROM pipeline_linkagewithcensus lk
     JOIN pipeline_cen_prof_detailed_csd_attrs_sp csd ON lk.census_subdivision_id = csd.census_subdivision_id
     JOIN pipeline_naturalresourceregion nrr ON lk.natural_resource_region_id = nrr.id;"""
        )


def import_census_subdivision_linkage(linkage_file):
    data = pd.read_csv(linkage_file)
    data.rename(
        columns={
            data.columns[0]: "census_subdivision_id",
            data.columns[1]: "tourism_region_id",
            data.columns[2]: "regional_district_id",
            data.columns[3]: "economic_region_id",
            data.columns[4]: "bc_fire_zone_id",
            data.columns[5]: "tsunami_notification_zone_id",
            data.columns[7]: "health_authority_id",
            data.columns[8]: "school_district_id",
            data.columns[9]: "natural_resource_region_id",
        },
        inplace=True,
    )
    # data.drop('LOCAL_HLTH_AREA_CODE', axis=1, inplace=True)
    remove_dependencies()
    write_to_db(LinkageWithCensus, data)
    add_dependencies()


def _generate_geom(feat, srid=None):
    """
    Generate a clean geometry, and simplified snapshot for PostGIS insertion
    """
    # Source data tends to be in BC Alberts. #TODO: detect this instead?
    geos_geom = GEOSGeometry(feat.geom.wkt, srid=srid or feat.geom.srid)
    # Convert MultiPolygons to plain Polygons,
    # We assume the largest one is the one we want to keep, and the rest are artifacts/junk.
    geos_geom.transform(WGS84_SRID)
    geos_geom_out = _coerce_to_multipolygon(geos_geom)
    geos_geom_simplified = copy.deepcopy(geos_geom)
    geos_geom_simplified = geos_geom_simplified.simplify(0.0005, preserve_topology=True)

    geos_geom_simplified = _coerce_to_multipolygon(geos_geom_simplified)

    return geos_geom_out, geos_geom_simplified


def _generate_bcdata_geom(feat, srid=None):
    """
    Generate a clean geometry, and simplified snapshot for PostGIS insertion
    """
    # Source data tends to be in BC Alberts. #TODO: detect this instead?
    geos_geom = GEOSGeometry(feat.geometry.wkt, srid=srid or feat.geometry.srid)
    # Convert MultiPolygons to plain Polygons,
    # We assume the largest one is the one we want to keep, and the rest are artifacts/junk.
    if isinstance(geos_geom, MultiPolygon) or isinstance(geos_geom, Polygon):
        geos_geom.transform(WGS84_SRID)
        geos_geom_out = _coerce_to_multipolygon(geos_geom, srid)
        geos_geom_simplified = copy.deepcopy(geos_geom)
        geos_geom_simplified = geos_geom_simplified.simplify(
            0.0005, preserve_topology=True
        )
        geos_geom_simplified = _coerce_to_multipolygon(geos_geom_simplified, srid)

    elif isinstance(geos_geom, LineString) or isinstance(geos_geom, MultiLineString):
        geos_geom.transform(WGS84_SRID)
        geos_geom_out = _coerce_to_multilinestring(geos_geom, srid)
        geos_geom_simplified = copy.deepcopy(geos_geom)
        geos_geom_simplified = geos_geom_simplified.simplify(
            0.0005, preserve_topology=True
        )
        geos_geom_simplified = _coerce_to_multilinestring(geos_geom_simplified, srid)

    return geos_geom_out, geos_geom_simplified


def _coerce_to_multipolygon(geom, srid=WGS84_SRID):
    if isinstance(geom, Polygon):
        return MultiPolygon([geom], srid=srid)
    elif isinstance(geom, MultiPolygon):
        return geom
    else:
        raise Exception("Bad geometry type: {}, skipping.".format(geom.__class__))


def _coerce_to_multilinestring(geom, srid=WGS84_SRID):
    if isinstance(geom, LineString):
        return MultiLineString([geom], srid=srid)
    elif isinstance(geom, MultiLineString):
        return geom
    else:
        raise Exception("Bad geometry type: {}, skipping.".format(geom.__class__))


def import_tsunami_full_description(instance, file_path):
    data = pd.read_csv(file_path)
    for index, row in data.iterrows():
        if str(instance.name) == str(row["TSUNAMI_NOTIFY_ZONE_ID"]):
            instance.tsunami_zone_name = row["TSUNAMI_ZONE_NAME"]
    instance.save()


def remove_french_description(instance):
    instance.name = ((instance.name).split("/", 1))[0]
    instance.save()


def calculate_muni_or_rd(instance):
    muni = Municipality.objects.filter(geom__covers=instance.geom).first()
    rd = RegionalDistrict.objects.filter(geom__covers=instance.geom).first()
    if muni:
        instance.municipality = muni

    instance.regional_district = rd

    instance.save()


def import_housing(URL):
    # csv_file = 'total.csv'
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Upgrade-Insecure-Requests": "1",
        "DNT": "1",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
    }
    url = "https://www2.gov.bc.ca/assets/gov/data/statistics/economy/building-permits/total.csv"
    s = requests.get(url, headers=headers)
    if s.ok:
        try:
            data1 = s.content.decode("utf8")
            data = pd.read_csv(io.StringIO(data1), skiprows=1)
            data.rename(
                columns={data.columns[0]: "census_subdivision_id"}, inplace=True
            )
            data.drop(data.columns[1], axis=1, inplace=True)
            data = data[
                (data["census_subdivision_id"].str.contains("[a-zA-Z]") == False)
                & (data["census_subdivision_id"].str.len() > 4)
            ]
            data["census_subdivision_id"] = data["census_subdivision_id"].str.replace(
                "[#,@,&,*]", "", regex=True
            )
            drop_list = ["Unnamed: 235"]
            thisFilter = data.filter(drop_list)
            data.drop(thisFilter, inplace=True, axis=1)
            A = list(data.columns)
            data = data.melt(
                id_vars=["census_subdivision_id"],
                var_name="yearmonth",
                value_vars=A[1:],
            )
            data["month"] = data["yearmonth"].str.split("-").str[0]
            data["year"] = data["yearmonth"].str.split("-").str[1]
            data["census_subdivision_id"] = (
                data["census_subdivision_id"].astype(str).astype(int64)
            )
            data["year"] = pd.to_datetime(
                data["year"], format="%y", errors="coerce"
            ).dt.year
            data["month"] = pd.to_datetime(
                data["month"], format="%b", errors="coerce"
            ).dt.month

            user = settings.DATABASES["default"]["USER"]
            password = settings.DATABASES["default"]["PASSWORD"]
            database_name = settings.DATABASES["default"]["NAME"]
            Host = settings.DATABASES["default"]["HOST"]

            database_url = (
                "postgresql://{user}:{password}@{Host}:5432/{database_name}".format(
                    user=user, password=password, Host=Host, database_name=database_name
                )
            )
            engine = create_engine(database_url)
            data.to_sql(
                Housing_Data._meta.db_table,
                if_exists="replace",
                con=engine,
                index=False,
            )

        except Exception as e:
            print(e)
