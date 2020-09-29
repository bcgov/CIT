import datetime
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware
from functools import reduce
from operator import and_

import requests

from django.apps import apps
from django.db.models import Q, F

from pipeline.constants import LOCATION_TYPES


def generate_line_strings():
    from pipeline.models.general import LocationDistance   # local import to avoid circular import # noqa

    line_strings = {"type": "FeatureCollection", "features": []}

    _map = {}
    for location_distance in LocationDistance.objects.select_related('community', 'hospital'):
        if location_distance.community.id not in _map:
            _map[location_distance.community.id] = location_distance
        if location_distance.distance < _map[location_distance.community.id].distance:
            _map[location_distance.community.id] = location_distance

    for k, location_distance in _map.items():
        line_strings["features"].append(
            {
                "type": "Feature",
                "properties": {"distance": float(location_distance.distance)},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [location_distance.community.longitude(), location_distance.community.latitude()],
                        [location_distance.location.longitude(), location_distance.location.latitude()],
                    ],
                },
            }
        )

    return line_strings


def serialize_census_subdivision_groups(obj):
    return [
        {
            "group": None,
            "metadata": {
                "name": "Population, 2016",
            },
            "key": "population",
            "value": commaize(obj.population),
            "units": " people",
        },
        {
            "group": None,
            "metadata": {
                "name": "Population percentage change, 2011 to 2016",
            },
            "key": "population_percentage_change",
            "value": commaize(obj.population_percentage_change),
            "units": "%",
        },
        {
            "group": None,
            "metadata": {
                "name": "Total private dwellings",
            },
            "key": "priv_dwel",
            "value": commaize(obj.priv_dwel),
            "units": " dwellings",
        },
        {
            "group": None,
            "metadata": {
                "name": "Land area in square kilometres",
            },
            "key": "area",
            "value": commaize(obj.area),
            "units": " km\u00B2",
        },
        {
            "group": "Age of Population",
            "metadata": {
                "name": "0 to 14 years",
            },
            "key": "pop_pct_0_14",
            "value": commaize(obj.pop_pct_0_14),
            "units": "%",
        },
        {
            "group": "Age of Population",
            "metadata": {
                "name": "15 to 64 years",
            },
            "key": "pop_pct_14_65",
            "value": commaize(obj.pop_pct_14_65),
            "units": "%",
        },
        {
            "group": "Age of Population",
            "metadata": {
                "name": "65 years and over",
            },
            "key": "pop_pct_65",
            "value": commaize(obj.pop_pct_65),
            "units": "%",
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Single-detached house",
            },
            "key": "detached_houses",
            "value": commaize(obj.detached_houses),
            "units": " dwellings",
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Apartment in a building that has five or more storeys",
            },
            "key": "apartments",
            "value": commaize(obj.apartments),
            "units": " dwellings",
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Other attached dwelling",
            },
            "key": "other_attached_dwellings",
            "value": commaize(obj.other_attached_dwellings),
            "units": " dwellings",
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Movable dwelling",
            },
            "key": "movable_dwellings",
            "value": commaize(obj.movable_dwellings),
            "units": " dwellings",
        },
        {
            "group": "Marital Status",
            "metadata": {
                "name": "Married or living common law",
            },
            "key": "married_common_law_couples",
            "value": commaize(obj.married_common_law_couples),
            "units": " people",
        },
        {
            "group": "Marital Status",
            "metadata": {
                "name": "Couples with children",
            },
            "key": "couples_with_children",
            "value": commaize(obj.couples_with_children),
            "units": " people",
        },
        {
            "group": "Marital Status",
            "metadata": {
                "name": "Total - Lone-parent census families in private households - 100% data",
            },
            "key": "single_parents",
            "value": commaize(obj.single_parents),
            "units": " people",
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "English",
            },
            "key": "eng_known",
            "value": commaize(obj.eng_known),
            "units": " people",
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "French",
            },
            "key": "fr_known",
            "value": commaize(obj.fr_known),
            "units": " people",
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "Non-official languages",
            },
            "key": "other_lang",
            "value": commaize(obj.other_lang),
            "units": " people",
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "Aboriginal languages",
            },
            "key": "aboriginal_lang",
            "value": commaize(obj.aboriginal_lang),
            "units": " people",
        },
        {
            "group": "Income",
            "metadata": {
                "name": "Median total income in 2015 among recipients ($)",
            },
            "key": "median_total_income",
            "value": to_currency(commaize(obj.median_total_income)),
            "units": None,
        },
        {
            "group": "Immigration and citizenship",
            "metadata": {
                "name": "Non-permanent residents",
            },
            "key": "non_pr",
            "value": commaize(obj.non_pr),
            "units": " people",
        },
        {
            "group": "Visible minority",
            "metadata": {
                "name": "Total visible minority population",
            },
            "key": "visible_minority",
            "value": commaize(obj.visible_minority),
            "units": " people",
        },
        {
            "group": "Education",
            "metadata": {
                "name": "Secondary (high) school diploma or equivalency certificate",
            },
            "key": "edu_1",
            "value": commaize(obj.edu_1),
            "units": " people",
        },
        {
            "group": "Education",
            "metadata": {
                "name": "Postsecondary certificate, diploma or degree",
            },
            "key": "edu_2",
            "value": commaize(obj.edu_2),
            "units": " people",
        },
        {
            "group": "Education",
            "metadata": {
                "name": "Apprenticeship or trades certificate or diploma",
            },
            "key": "edu_3",
            "value": commaize(obj.edu_3),
            "units": " people",
        },
        {
            "group": "Education",
            "metadata": {
                "name": "University certificate, diploma or degree at bachelor level or above",
            },
            "key": "edu_4",
            "value": commaize(obj.edu_4),
            "units": " people",
        },
        {
            "group": "Employment",
            "metadata": {
                "name": "Employed",
            },
            "key": "employed",
            "value": commaize(obj.employed),
            "units": " people",
        },
        {
            "group": "Employment",
            "metadata": {
                "name": "Unemployed",
            },
            "key": "unemployed",
            "value": commaize(obj.unemployed),
            "units": " people",
        },
        {
            "group": "Employment",
            "metadata": {
                "name": "Self-employed",
            },
            "key": "self_employed",
            "value": commaize(obj.self_employed),
            "units": " people",
        },
    ]


def serialize_community_detail_fields(obj):
    return [
        {
            "key": "place_name",
            "value": obj.place_name,
            "metadata": {
                "name": "Community Name",
            },
        },
        {
            "key": "population",
            "value": obj.incorporated and obj.census_subdivision.population,
            "metadata": {
                "name": "Population",
                "description": "Number of people living here",
            },
        },
        {
            "key": "population_percentage_change",
            "value": obj.incorporated and (str(obj.census_subdivision.population_percentage_change) + "%"),
            "metadata": {
                "name": "Population Change",
                "description": "Change in # of people living here",
            },
        },
        {
            "key": "priv_dwel",
            "value": obj.incorporated and obj.census_subdivision.priv_dwel,
            "metadata": {
                "name": "Homes",
                "description": "Number of homes build in this community",
            },
        },
        {
            "key": "fn_community_name",
            "value": obj.fn_community_name,
            "metadata": {
                "name": "Indigenous Community Name",
            },
        },
        {
            "key": "incorporated",
            "value": obj.incorporated,
            "metadata": {
                "name": "Incorporated",
            },
        },
        {
            "key": "census_subdivision_id",
            "value": obj.census_subdivision_id,
            "metadata": {
                "name": "Census Subdivision",
            },
        },
        {
            "key": "wildfire_zone_risk_class",
            "value": obj.wildfire_zone.risk_class if obj.wildfire_zone else "N/A",
            "metadata": {
                "name": "Wildfire Risk",
                "description": "WUI Risk Class rating between 1 (low) and 5 (extreme)",
            },
        },
        {
            "key": "tsunami_zone",
            "value": obj.tsunami_zone.zone_class if obj.tsunami_zone else None,
            "metadata": {
                "name": "Tsunami Zone",
                "description": "A - C (moderate); D and E (low)",
            },
        },
    ]


def get_community_type_display_name(community_type):
    # TODO SY - move this into constants.py after resolving circular import
    COMMUNITY_TYPES = {
        "Urban": "Urban",
        "Rural": "Rural",
        "Remote Community": "Rural",
        "Urban First Nations Reserve": "Indigenous",
        "Rural First Nations Reserve": "Indigenous",
        "Urban First Nations Primary Reserve": "Indigenous",
        "Urban First Nations Secondary Reserve": "Indigenous",
        "Rural First Nations Primary Reserve": "Indigenous",
        "Rural First Nations Secondary Reserve": "Indigenous",
        "Remote First Nations Primary Reserve": "Indigenous",
    }
    return COMMUNITY_TYPES[community_type]


def serialize_location_assets(obj):
    from pipeline.models.general import DataSource

    locations = []
    for location_type in LOCATION_TYPES:
        data_source = DataSource.objects.get(name=location_type)
        model_class = apps.get_model("pipeline", data_source.model_name)
        location_assets = get_location_assets_for_community(model_class, obj)

        for location_asset in location_assets:
            locations.append({
                "type": location_asset.location_type,
                "latitude": location_asset.get_latitude(),
                "longitude": location_asset.get_longitude(),
                "driving_distance": location_asset.driving_distance,
                "distance":
                    location_asset.driving_distance if location_asset.driving_distance is not None
                    else location_asset.distance,
                "travel_time": location_asset.travel_time,
                "within_municipality": location_asset.within_municipality,
                **{field: getattr(location_asset, field) for
                   field in get_fields_for_location_type(location_asset.location_type)},
            })

    return locations


def get_location_assets_for_community(model_class, community):
    from pipeline.models.location_assets import School

    if model_class == School:
        school_districts = community.schooldistrict_set.all()
        return School.objects.filter(
            Q(distances__community=community) & Q(school_district__in=school_districts) & (
                Q(distances__driving_distance__lte=50) |
                (Q(distances__driving_distance__isnull=True) & Q(distances__distance__lte=50))
            )).annotate(
                driving_distance=F('distances__driving_distance'),
                distance=F('distances__distance'),
                travel_time=F('distances__travel_time'),
                within_municipality=F('distances__within_municipality'))
    else:
        return model_class.objects.filter(
            Q(distances__community=community) & (
                Q(distances__driving_distance__lte=50) |
                (Q(distances__driving_distance__isnull=True) & Q(distances__distance__lte=50))
            )).annotate(
                driving_distance=F('distances__driving_distance'),
                distance=F('distances__distance'),
                travel_time=F('distances__travel_time'),
                within_municipality=F('distances__within_municipality'))


def get_fields_for_location_type(location_type):
    common_fields = [
        "id", "name", "location_fuzzy", "location_phone", "location_email", "location_website"]

    location_specific_fields = {
        "hospitals": ["rg_name", "sv_description", "hours"],
        "courts": [
            "address", "city", "postal_code", "contact_phone", "fax_number",
            "hours_of_operation", "court_level"],
        "economic_projects": [
            "flnro_project_status", "project_type", "project_category", "proponent", "eao_project_status",
            "project_comments"],
        "natural_resource_projects": [
            "project_comments", "project_description", "estimated_cost", "update_activity", "construction_type",
            "construction_subtype", "project_type", "developer", "architect", "project_status", "project_stage",
            "project_category_name", "provinvial_funding", "federal_funding", "municipal_funding",
            "green_building_ind", "green_building_desc", "clean_energy_ind", "construction_jobs", "operating_jobs",
            "standardized_start_date", "standardized_completion_date"],
        "servicebc_locations": [],
        "schools": ["district_number", "public_or_independent", "school_education_level"],
        "post_secondary_institutions": ["institution_type", "economic_development_region"],
        "clinics": ["sv_description", "hours"],
        "first_responders": ["keywords"],
        "diagnostic_facilities": ["ser_cd_dsc"],
        "timber_facilities": ["bus_cat_ds"],
        "civic_facilities": ["keywords", "bus_cat_cl", "bus_cat_ds"],
        "closed_mills": [],
        "research_centres": [
            "research_specialties", "research_centre_affiliation", "institution", "inst_acrnm",
            "research_sector", "cntr_type"],
        "airports": [
            "descriptn", "keywords", "aer_status", "aircr_acs", "data_srce", "datasrc_yr", "elevation", "fuel_avail",
            "heli_acs", "iata", "mx_rway_ln", "num_rway", "rway_surf", "oil_avail", "seapln_acc",
        ]
    }

    return common_fields + location_specific_fields[location_type]


def get_quarterly_date_str_as_date(quarterly_date_str):
    """
    Get a quarterly date string, such as "2020-Q1" and return a Date object corresponding to
    the start date of the quarter (2020-01-01).
    """
    QUARTERLY_DATE_MAPPING = {
        "Q1": {
            "month": 1,
            "day": 1,
        },
        "Q2": {
            "month": 4,
            "day": 1,
        },
        "Q3": {
            "month": 7,
            "day": 1,
        },
        "Q4": {
            "month": 10,
            "day": 1,
        }
    }

    year_str, quarter = quarterly_date_str.split("-")
    year = int(year_str)
    try:
        month = QUARTERLY_DATE_MAPPING[quarter]["month"]
        day = QUARTERLY_DATE_MAPPING[quarter]["day"]
        return datetime.date(year, month, day)
    except KeyError:
        return None


def commaize(number):
    if number is None:
        return

    if isinstance(number, float):
        return '{:,.2f}'.format(number)
    elif isinstance(number, int):
        return '{:,}'.format(number)


def to_currency(string):
    if string is None:
        return

    return '$' + string


def get_pct_field_as_decimal(field):
    return field / 100 if field else 0


def communities_advanced_search(query_params):
    from pipeline.models.community import Community
    # http://localhost/api/pipeline/communities/advanced_search/?location__schools__lte__mins=15&population__gt=100&percent_50_10__gte=0.75

    print("query_params", query_params)
    filters = [
        {
            "field": key.split("__")[0],
            "operator": _get_operator_for_field(key),
            "units": _get_units_for_field(key),
            "location_type": _get_location_type_in_field(key),
            "value": value.split(","),
        }
        for key, value in query_params.items()
    ]
    print("filters", filters)

    overall_query = []
    location_queries = []

    for query_filter in filters:
        query = ""

        # TODO refactor field name handling
        if query_filter["field"] == "location":
            location_queries.append(_handle_location_filter(query_filter))
            continue
        elif query_filter["field"] == "community":
            query += "id"
        elif query_filter["field"] == "regional_district":
            query += "regional_district__id"
        elif query_filter["field"] in ["population", "population_percentage_change"]:
            query += "census_subdivision__{}".format(query_filter["field"])
        elif query_filter["field"] in [
                "percent_50_10", "percent_25_5", "percent_10_2", "percent_5_1",
                "nearest_substation_distance"]:
            query += query_filter["field"]
        elif query_filter["field"] == "is_coastal":
            query += query_filter["field"]
            query_filter["value"] = [True if value == "true" else False for value in query_filter["value"]]
        elif query_filter["field"] == "community_type":
            query += query_filter["field"]
            if "Indigenous" in query_filter["value"]:
                query_filter["value"].remove("Indigenous")
                query_filter["value"].extend(["Urban First Nations Reserve", "Rural First Nations Reserve"])
        elif query_filter["field"] == "wildfire_zone":
            query += "wildfire_zone__risk_class"
        elif query_filter["field"] == "tsunami_zone":
            query += "tsunami_zone__zone_class"
        else:
            # TODO return validation error
            pass

        print("query", query)

        if query_filter["operator"]:
            query += "__{}".format(query_filter["operator"])

        if len(query_filter["value"]) == 1:
            overall_query.append(Q(**{query: query_filter["value"][0]}))
        elif len(query_filter["value"]) > 1:
            query += "__in"
            overall_query.append(Q(**{query: query_filter["value"]}))
        else:
            # TODO return validation error
            pass

    print("overall_query", overall_query)
    if len(overall_query) > 0:
        communities = Community.objects.filter(Q(reduce(and_, (q for q in overall_query))))
    else:
        communities = Community.objects.all()

    if location_queries:
        communities = reduce(and_, (q for q in [communities, *location_queries]))

    communities = communities.distinct()

    print("communities", communities, communities.count())
    return communities


def _handle_location_filter(query_filter):
    from pipeline.models.community import Community
    if not query_filter["location_type"]:
        # TODO return validation error
        pass

    location_type_query = Q(**{"distances__location__location_type": query_filter["location_type"]})
    distance_query = None
    query = ""

    if query_filter["units"] == "km":
        query += "distances__driving_distance"
    elif query_filter["units"] == "mins":
        query += "distances__travel_time"
    else:
        # TODO return validation error
        pass

    if len(query_filter["value"]) > 1:
        # TODO return validation error
        pass

    # TODO refactor duplicate code
    if query_filter["operator"] == "xgt":
        pass
        query += "__lt"
        print("query_filter here", query_filter)
        distance_query = ~Q(**{query: query_filter["value"][0]})
    else:
        query += "__{}".format(query_filter["operator"])
        distance_query = Q(**{query: query_filter["value"][0]})

    print("location_query", location_type_query, distance_query)

    return Community.objects.filter(location_type_query & distance_query)


def _get_operator_for_field(field):
    field_parts = field.split("__")
    if "gte" in field_parts:
        return "gte"
    elif "gt" in field_parts:
        return "gt"
    elif "xgt" in field_parts:
        return "xgt"
    elif "lte" in field_parts:
        return "lte"
    elif "lt" in field_parts:
        return "lt"

    # TODO return validation error
    return None


def _get_units_for_field(field):
    field_parts = field.split("__")
    if "km" in field_parts:
        return "km"
    elif "mins" in field_parts:
        return "mins"

    # TODO return validation error
    return None


def _get_location_type_in_field(field):
    field_split = field.split("__")
    try:
        location_prefix_index = field_split.index("location")
        location_type = field_split[location_prefix_index + 1]
        return location_type
    except ValueError:
        # TODO return validation error
        return None


def serialize_communities_for_regional_districts(regional_districts):
    return {
        regional_district.name: [
            {
                "community": community.place_name,
                "locations": community.location_set.count()
            } for community in regional_district.community_set.all()
        ] for regional_district in regional_districts
    }


def serialize_data_source(name, datasource_info):
    from pipeline.constants import SOURCE_INTERNAL, SOURCE_DATABC, DATABC_PERMALINK_URL

    source = ""
    source_url = ""
    if datasource_info["source"] == SOURCE_INTERNAL:
        source = "Provided by Network BC team"
    elif datasource_info["source"] == SOURCE_DATABC:
        source = "BC Data Catalogue"
        source_url = DATABC_PERMALINK_URL.format(permalink_id=datasource_info["permalink_id"])

    return {
        "display_name": datasource_info["display_name"],
        "source": source,
        "source_url": source_url,
    }


def get_hidden_explore_report_pages(communities):
    from pipeline.constants import POWERBI_HIDDEN_EXPLORE_PAGES

    # TODO SY - should this be a threshold and not all()?
    if all(community.census_subdivision.get_percentage_of_null_fields() > 0.25 for community in communities):
        return POWERBI_HIDDEN_EXPLORE_PAGES


def get_databc_last_modified_date(dataset_resource_id):
    from pipeline.constants import API_URL

    response = requests.get(API_URL.format(dataset_resource_id=dataset_resource_id))
    result = response.json()["result"]

    if not result:
        print("data source metadata not found", dataset_resource_id)
        print(result)
        return

    if result["last_modified"]:
        date = result["last_modified"]
    elif result["created"]:
        date = result["created"]
    else:
        print("no date found for resource", dataset_resource_id)
        print(result)
        return

    last_modified_date = make_aware(parse_datetime(date))
    return last_modified_date
