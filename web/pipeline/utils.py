import datetime
from functools import reduce
from operator import and_

from django.apps import apps
from django.db.models import Q, F, Sum, Avg, FloatField

from pipeline.constants import LOCATION_TYPES


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
                "name": "Population density per square kilometre",
            },
            "key": "population_density_per_sq_km",
            "value": commaize(obj.population_density_per_sq_km),
            "units": " people per km\u00B2",
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
                "name": "Average age",
            },
            "key": "population_avg_age",
            "value": obj.population_avg_age,
            "units": None,
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
            "group": "Education",
            "metadata": {
                "name": "% Population with Post-Secondary Education",
            },
            "key": "pct_post_secondary",
            "value": commaize(obj.get_pct_post_secondary()),
            "units": "%",
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
        {
            "group": "Employment",
            "metadata": {
                "name": "Employment rate",
            },
            "key": "employment_rate",
            "value": commaize(obj.employment_rate),
            "units": "%",
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
        {
            "key": "percent_50_10",
            "value": (commaize(obj.percent_50_10 * 100) if obj.percent_50_10 else "0") + "%",
            "metadata": {
                "name": "% of Community with High-Speed Internet (> 50/10 mbps)",
            }
        }
    ]


def serialize_regional_district_fields(regional_district):
    from pipeline.models.census import CensusSubdivision

    census_subdivisions = CensusSubdivision.objects.filter(community__regional_district=regional_district)

    census_aggregate_values = census_subdivisions.aggregate(
        Sum("area"),
        Avg("area"),
        Sum("population"),
        Sum("edu_field_total"),
        Sum("edu_2"),
        population_density_unweighted=Sum(F("population_density_per_sq_km") * F("area"), output_field=FloatField()),
        population_age_unweighted=Sum(F("population_avg_age") * F("population"), output_field=FloatField()),
        employment_rate_unweighted=Sum(F("employment_rate") * F("population"), output_field=FloatField()))

    population_density = census_aggregate_values["population_density_unweighted"] / census_aggregate_values["area__sum"]
    average_age = census_aggregate_values["population_age_unweighted"] / census_aggregate_values["population__sum"]
    employment_rate = (
        census_aggregate_values["employment_rate_unweighted"] / census_aggregate_values["population__sum"])
    percent_post_secondary = (
        census_aggregate_values["edu_2__sum"] / census_aggregate_values["edu_field_total__sum"]) * 100

    return [
        {
            "key": "population_density",
            "value": commaize(population_density),
            "units": " people per km\u00B2",
            "metadata": {
                "name": "Population Density",
            },
        },
        {
            "key": "average_age",
            "value": commaize(average_age),
            "units": " years old",
            "metadata": {
                "name": "Average Age",
            },
        },
        {
            "key": "area",
            "value": commaize(census_aggregate_values["area__avg"]),
            "units": " km\u00B2",
            "metadata": {
                "name": "Area",
            },
        },
        {
            "key": "employment_rate",
            "value": commaize(employment_rate),
            "units": " %",
            "metadata": {
                "name": "Employment Rate",
            },
        },
        {
            "key": "percent_post_secondary",
            "value": commaize(percent_post_secondary),
            "units": " %",
            "metadata": {
                "name": "% of Population with Post-Secondary Education",
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
            temp = {
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
            }

            if hasattr(location_asset, 'project_name'):
                temp['project_name'] = location_asset.project_name

            locations.append(temp)

    return locations


def get_location_assets_for_community(model_class, community):
    from pipeline.models.location_assets import School, Project

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
    if model_class == Project:
        return Project.objects.filter(
            Q(distances__community=community) & (
                Q(distances__driving_distance__lte=50) |
                (Q(distances__driving_distance__isnull=True) & Q(distances__distance__lte=50))
            )).annotate(
                driving_distance=F('distances__driving_distance'),
                distance=F('distances__distance'),
                travel_time=F('distances__travel_time'),
                within_municipality=F('distances__within_municipality'))\
            .order_by(
                'project_id', '-source_date').distinct('project_id')
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
        "name", "location_phone", "location_email", "location_website"]

    return common_fields


def get_quarterly_date_str_as_date(quarterly_date_str):
    """
    Get a quarterly date string, such as "2020-Q1" and return a Date object corresponding to
    the start date of the quarter (2020-01-01).
    """
    QUARTERLY_DATE_MAPPING = {
        "q1": {
            "month": 1,
            "day": 1,
        },
        "q2": {
            "month": 4,
            "day": 1,
        },
        "q3": {
            "month": 7,
            "day": 1,
        },
        "q4": {
            "month": 10,
            "day": 1,
        }
    }

    year_str, quarter = quarterly_date_str.split("-")
    year = int(year_str)
    try:
        month = QUARTERLY_DATE_MAPPING[quarter.lower()]["month"]
        day = QUARTERLY_DATE_MAPPING[quarter.lower()]["day"]
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
            if query_filter["value"][0] == "null":
                query += "__isnull"
                print("isnull", query)
                overall_query.append(Q(**{query: True}))
            else:
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
        query += "__lt"
        distance_query = ~Q(**{query: query_filter["value"][0]})
    else:
        query += "__{}".format(query_filter["operator"])
        distance_query = Q(**{query: query_filter["value"][0]})

    if query_filter["units"] == "km":
        # if filtering by distance, add a fallback for birds' eye distance if driving distance
        # is unavailable
        # (i.e. driving distance < 50km OR (driving distance is null AND birds' eye distance < 50km))

        if query_filter["operator"] == "xgt":
            birds_eye_field = "distances__distance__lt"
            birds_eye_distance_query = ~Q(**{birds_eye_field: query_filter["value"][0]})
        else:
            birds_eye_field = "distances__distance__" + query_filter["operator"]
            birds_eye_distance_query = Q(**{birds_eye_field: query_filter["value"][0]})
        distance_query = (
            distance_query |
            (Q(distances__driving_distance__isnull=True) & birds_eye_distance_query))

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


def get_communities_with_insufficient_data(communities):
    return [
        community.id for community in communities if
        community.census_subdivision.get_percentage_of_null_fields() > 0.25]


def get_hidden_explore_report_pages(communities):
    from pipeline.constants import POWERBI_HIDDEN_EXPLORE_PAGES

    if all(community.census_subdivision.get_percentage_of_null_fields() > 0.25 for community in communities):
        return POWERBI_HIDDEN_EXPLORE_PAGES
