import datetime


def generate_line_strings():
    from pipeline.models import LocationDistance   # local import to avoid circular import # noqa

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
        },
        {
            "group": None,
            "metadata": {
                "name": "Population percentage change, 2011 to 2016",
            },
            "key": "population_percentage_change",
            "value": commaize(obj.population_percentage_change),
        },
        {
            "group": None,
            "metadata": {
                "name": "Total private dwellings",
            },
            "key": "priv_dwel",
            "value": commaize(obj.priv_dwel),
        },
        {
            "group": None,
            "metadata": {
                "name": "Land area in square kilometres",
            },
            "key": "area",
            "value": commaize(obj.area),
        },
        {
            "group": "Age of Population",
            "metadata": {
                "name": "0 to 14 years",
            },
            "key": "pop_pct_0_14",
            "value": commaize(obj.pop_pct_0_14),
        },
        {
            "group": "Age of Population",
            "metadata": {
                "name": "15 to 64 years",
            },
            "key": "pop_pct_14_65",
            "value": commaize(obj.pop_pct_14_65),
        },
        {
            "group": "Age of Population",
            "metadata": {
                "name": "65 years and over",
            },
            "key": "pop_pct_65",
            "value": commaize(obj.pop_pct_65),
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Single-detached house",
            },
            "key": "detached_houses",
            "value": commaize(obj.detached_houses),
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Apartment in a building that has five or more storeys",
            },
            "key": "apartments",
            "value": commaize(obj.apartments),
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Other attached dwelling",
            },
            "key": "other_attached_dwellings",
            "value": commaize(obj.other_attached_dwellings),
        },
        {
            "group": "Types of Occupied Dwellings",
            "metadata": {
                "name": "Movable dwelling",
            },
            "key": "movable_dwellings",
            "value": commaize(obj.movable_dwellings),
        },
        {
            "group": "Marital Status",
            "metadata": {
                "name": "Married or living common law",
            },
            "key": "married_or_common_law",
            "value": commaize(obj.married_or_common_law),
        },
        {
            "group": "Marital Status",
            "metadata": {
                "name": "Couples with children",
            },
            "key": "couples_with_children",
            "value": commaize(obj.couples_with_children),
        },
        {
            "group": "Marital Status",
            "metadata": {
                "name": "Total - Lone-parent census families in private households - 100% data",
            },
            "key": "single_parents",
            "value": commaize(obj.single_parents),
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "English",
            },
            "key": "eng_known",
            "value": commaize(obj.eng_known),
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "Non-official languages",
            },
            "key": "other_lang",
            "value": commaize(obj.other_lang),
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "Aboriginal languages",
            },
            "key": "aboriginal_lang",
            "value": commaize(obj.aboriginal_lang),
        },
        {
            "group": "Languages",
            "metadata": {
                "name": "Neither English nor French",
            },
            "key": "eng_fr_not_known",
            "value": commaize(obj.eng_fr_not_known),
        },
        {
            "group": "Income",
            "metadata": {
                "name": "Median total income in 2015 among recipients ($)",
            },
            "key": "median_total_income",
            "value": commaize(obj.median_total_income),
        },
        {
            "group": "Immigration and citizenship",
            "metadata": {
                "name": "Non-permanent residents",
            },
            "key": "non_pr",
            "value": commaize(obj.non_pr),
        },
        {
            "group": "Visible minority",
            "metadata": {
                "name": "Total visible minority population",
            },
            "key": "visible_minority",
            "value": commaize(obj.visible_minority),
        },
        {
            "group": "Education",
            "metadata": {
                "name": "Secondary (high) school diploma or equivalency certificate",
            },
            "key": "edu_1",
            "value": commaize(obj.edu_1),
        },
        {
            "group": "Education",
            "metadata": {
                "name": "Postsecondary certificate, diploma or degree",
            },
            "key": "edu_2",
            "value": commaize(obj.edu_2),
        },
        {
            "group": "Education",
            "metadata": {
                "name": "Apprenticeship or trades certificate or diploma",
            },
            "key": "edu_3",
            "value": commaize(obj.edu_3),
        },
        {
            "group": "Education",
            "metadata": {
                "name": "University certificate, diploma or degree at bachelor level or above",
            },
            "key": "edu_4",
            "value": commaize(obj.edu_4),
        },
        {
            "group": "Employment",
            "metadata": {
                "name": "Employed",
            },
            "key": "employed",
            "value": commaize(obj.employed),
        },
        {
            "group": "Employment",
            "metadata": {
                "name": "Unemployed",
            },
            "key": "unemployed",
            "value": commaize(obj.unemployed),
        },
        {
            "group": "Employment",
            "metadata": {
                "name": "Self-employed",
            },
            "key": "self_employed",
            "value": commaize(obj.self_employed),
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
            "key": "community_type",
            "value": obj.community_type,
            "metadata": {
                "name": "Community Type",
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
            "key": "last_mile_status",
            "value": obj.last_mile_status,
            "metadata": {
                "name": "Last Mile Status (June 2020)",
            },
        },
        {
            "key": "transport_mile_status",
            "value": obj.transport_mile_status,
            "metadata": {
                "name": "Transport Status (June 2020)",
            },
        },
        # {
        #     "key": "cbc_phase",
        #     "value": obj.cbc_phase,
        #     "metadata": {
        #         "name": "CBC Phase",
        #     },
        # },
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
    return '{:,}'.format(number)
