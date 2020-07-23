# Import Census Subdiv Shapefile from
# https://www12.statcan.gc.ca/census-recensement/alternative_alternatif.cfm?l=eng&dispext=zip&teng=lcsd000b16a_e.zip&k=%20%20%20%2047761&loc=http://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/files-fichiers/2016/lcsd000b16a_e.zip
'''

(outputfrom ogr2ogr -so ...)

Layer name: lcsd000b16a_e
Geometry: Polygon
Feature Count: 5162
Extent: (3689439.011430, 659338.860000) - (9015736.631430, 5242179.217145)
Layer SRS WKT:
PROJCS["PCS_Lambert_Conformal_Conic",
    GEOGCS["GCS_North_American_1983",
        DATUM["North_American_Datum_1983",
            SPHEROID["GRS_1980",6378137.0,298.257222101]],
        PRIMEM["Greenwich",0.0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Lambert_Conformal_Conic_2SP"],
    PARAMETER["False_Easting",6200000.0],
    PARAMETER["False_Northing",3000000.0],
    PARAMETER["Central_Meridian",-91.86666666666666],
    PARAMETER["Standard_Parallel_1",49.0],
    PARAMETER["Standard_Parallel_2",77.0],
    PARAMETER["Latitude_Of_Origin",63.390675],
    UNIT["Meter",1.0]]
'CSDUID', feat.get('CSDUID'), '\n',
'CSDNAME', feat.get('CSDNAME'), '\n',
'CSDTYPE', feat.get('CSDTYPE'), '\n',
'PRUID', feat.get('PRUID'), '\n',
'PRNAME', feat.get('PRNAME'), '\n',
'CDUID', feat.get('CDUID'), '\n',
'CDNAME', feat.get('CDNAME'), '\n',
'CDTYPE', feat.get('CDTYPE'), '\n',
'CCSUID', feat.get('CCSUID'), '\n',
'CCSNAME', feat.get('CCSNAME'), '\n',
'ERUID', feat.get('ERUID'), '\n',
'ERNAME', feat.get('ERNAME'), '\n',
'SACCODE', feat.get('SACCODE'), '\n',
'SACTYPE', feat.get('SACTYPE'), '\n',
'CMAUID', feat.get('CMAUID'), '\n',
'CMAPUID', feat.get('CMAPUID'), '\n',
'CMANAME', feat.get('CMANAME'), '\n',
'CMATYPE', feat.get('CMATYPE'), '\n',
'''

import zipfile
import os
import copy
import tempfile
import json
import requests
from django.contrib.gis.geos.prototypes.io import wkt_w

from django.contrib.gis.gdal import DataSource
from django.contrib.gis.geos import GEOSGeometry, MultiPolygon, Polygon, LineString, MultiLineString
from django.conf import settings
from pipeline.models import CensusSubdivision, Road, Hex, ISP, Service
from pipeline.constants import SHP_RESOURCES
from pipeline.importers.utils import import_data_into_area_model, read_csv

import logging

logger = logging.getLogger(__name__)
csduid_to_geo_uid = {}


def import_shp_resources(resource_type):

    if resource_type == "census":
        import_census()
    elif resource_type == "roads":
        import_roads()
    elif resource_type == "hexes":
        import_hexes()
    elif resource_type == "all":
        for available_resource_type in SHP_RESOURCES.keys():
            import_resource(available_resource_type)
    elif resource_type in SHP_RESOURCES.keys():
        import_resource(resource_type)
    else:
        print("Error: Resource type {} not supported".format(resource_type))


def import_resource(resource_type):
    resource_config = SHP_RESOURCES[resource_type]
    ds = _get_datasource(SHP_RESOURCES[resource_type]['path'])
    for feat in ds[0]:
        row = {}

        for f in feat.fields:
            row[f] = feat.get(f)
            # print(f, feat.get(f))

        instance = import_data_into_area_model(resource_type, resource_config["model"], row)

        geos_geom_out, geos_geom_simplified = _generate_geom(feat, 3005)
        instance.geom = geos_geom_out
        instance.geom_simplified = geos_geom_simplified

        instance.save()


def import_hexes():
    ds = DataSource("data/hex/hexbc.kml")

    # Just clear all old data and rewrite it.
    Service.objects.all().delete()
    ISP.objects.all().delete()
    Hex.objects.all().delete()

    hexes = {}
    print(len(ds[0]), 'features')

    for i, feat in enumerate(ds[0]):
        if not i % 1000:
            print(i)

        hex_id = feat.get('description').split("=")[1].strip()
        try:
            hex = Hex.objects.get(pk=hex_id)
        except Hex.DoesNotExist:
            hex = Hex(id=hex_id)
        wkt = wkt_w(dim=2).write(GEOSGeometry(feat.geom.wkt, srid=4326)).decode()
        try:
            hex.geom = GEOSGeometry(wkt, srid=4326)
        except TypeError:
            print('skipping bad geom')
        if not hex.geom: continue
        hexes[hex_id] = hex

    Hex.objects.bulk_create(hexes.values())

    isps = read_csv('./data/hex/ISP_Hex_FSI.csv')

    # avoid re-querying for each row with ISP reference.
    isp_cache = {}
    services = []
    print(len(isps))
    for i, isp in enumerate(isps):
        if not i % 1000: print(i)
        try:
            hex = Hex.objects.get(pk=isp['HEXuid_HEXidu'])
        except Hex.DoesNotExist:
            continue
        if isp["ISPname_NomFSI"] in isp_cache:
            isp_obj = isp_cache[isp["ISPname_NomFSI"]]
        else:
            isp_obj = ISP(name=isp["ISPname_NomFSI"])
            print(isp_obj)
            isp_cache[isp["ISPname_NomFSI"]] = isp_obj
            isp_obj.save()
        service = Service(isp=isp_obj, hex=hex, technology=isp['Technology'])
        services.append(service)

    Service.objects.bulk_create(services)


def import_census():
    # Get a mapping to GEO UID for loading data on census areas from statscan API.
    body = requests.get(
        'https://www12.statcan.gc.ca/rest/census-recensement/CR2016Geo.json?lang=E&geos=CSD&cpt=59'
    ).text[2:]
    subdiv_metas = json.loads(body)
    for sd in subdiv_metas['DATA']:
        csduid = sd[3]
        geo_uid = sd[0]
        csduid_to_geo_uid[int(csduid)] = geo_uid

    ds = _get_datasource('data/census.zip')

    for feat in ds[0]:
        _save_subdiv(feat)


def import_roads():
    ds = _get_datasource('data/BC_Roads.zip')
    print(len(ds[0]), 'features')

    i = 0

    Road.objects.all().delete()
    roads = []
    for feat in ds[0]:
        i += 1
        if not i % 1000:
            print(i)

        road = Road()
        if feat.get('Avail_5_1_'):
            road.best_broadband = '5/1'
        if feat.get('Avail_10_2'):
            road.best_broadband = '10/2'
        if feat.get('Avail_25_5'):
            road.best_broadband = '25/5'
        if feat.get('Avail_50_1'):
            road.best_broadband = '50/10'

        road.geom = _coerce_to_multilinestring(GEOSGeometry(feat.geom.wkt, srid=4326))
        roads.append(road)

    Road.objects.bulk_create(roads, 1000)


def _get_datasource(filename):
    f = open(os.path.join(settings.BASE_DIR, filename), 'rb')

    zip_ref = zipfile.ZipFile(f)

    ret = zip_ref.testzip()

    output_dir = tempfile.mkdtemp()
    for item in zip_ref.namelist():
        # Check filename endswith shp
        zip_ref.extract(item, output_dir)
        if item.endswith('.shp'):
            # Extract a single file from zip
            the_shapefile = os.path.join(output_dir, item)
            # break        print(feat.geom)
    zip_ref.close()

    ds = DataSource(the_shapefile)
    return ds


def _save_subdiv(feat):
    # print(
    #     'CSDUID', feat.get('CSDUID'), '\n',
    #     'CSDUID', feat.get('CSDUID'), '\n',
    #     'CSDNAME', feat.get('CSDNAME'), '\n',
    #     'CSDTYPE', feat.get('CSDTYPE'), '\n',
    #     'PRUID', feat.get('PRUID'), '\n',
    #     'PRNAME', feat.get('PRNAME'), '\n',
    #     'CDUID', feat.get('CDUID'), '\n',
    #     'CDNAME', feat.get('CDNAME'), '\n',
    #     'CDTYPE', feat.get('CDTYPE'), '\n',
    #     'CCSUID', feat.get('CCSUID'), '\n',
    #     'CCSNAME', feat.get('CCSNAME'), '\n',
    #     'ERUID', feat.get('ERUID'), '\n',
    #     'ERNAME', feat.get('ERNAME'), '\n',
    #     'SACCODE', feat.get('SACCODE'), '\n',
    #     'SACTYPE', feat.get('SACTYPE'), '\n',
    #     'CMAUID', feat.get('CMAUID'), '\n',
    #     'CMAPUID', feat.get('CMAPUID'), '\n',
    #     'CMANAME', feat.get('CMANAME'), '\n',
    #     'CMATYPE', feat.get('CMATYPE'), '\n',
    # )

    if "British Columbia" not in feat.get('PRNAME'):
        return

    geos_geom_out, geos_geom_simplified = _generate_geom(feat, 4326)
    subdiv = CensusSubdivision.objects.get_or_create(id=int(feat.get('CSDUID')), name=feat.get('CSDNAME'))[0]

    print(subdiv.name)

    subdiv.geo_uid = csduid_to_geo_uid[subdiv.id]
    subdiv.geom = geos_geom_out
    subdiv.geom_simplified = geos_geom_simplified

    stats = json.loads(
        requests.get(
            'https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?dguid={}'.format(subdiv.geo_uid)
        ).text[2:]
    )

    # "1.1.2", "Population, 2016"
    subdiv.population = _fetch_statscan_value(stats, "1.1.2")
    # "1.1.3", "Population percentage change, 2011 to 2016"
    subdiv.popluation_percentage_change = _fetch_statscan_value(stats, "1.1.3")
    # "1.1.4", "Total private dwellings"
    subdiv.priv_dwel = _fetch_statscan_value(stats, "1.1.4")
    # "1.1.7",0,"Land area in square kilometres"
    subdiv.area = _fetch_statscan_value(stats, "1.1.7")

    # "1.2.2.1", "  0 to 14 years"
    subdiv.pop_pct_0_14 = _fetch_statscan_value(stats, "1.2.2.1")
    # 2029, "1.2.2.2", 1, "  15 to 64 years"
    subdiv.pop_pct_14_65 = _fetch_statscan_value(stats, "1.2.2.2")
    # 2030, "1.2.2.3", 1, "  65 years and over"
    subdiv.pop_pct_65 = _fetch_statscan_value(stats, "1.2.2.3")

    # types of occupied dwellings
    # "2.1.1.1", 1, "  Single-detached house"
    subdiv.detached_houses = _fetch_statscan_value(stats, "2.1.1.1")
    # "2.1.1.2", 1, "  Apartment in a building that has five or more storeys"
    subdiv.apartments = _fetch_statscan_value(stats, "2.1.1.2")
    # "2.1.1.3", 1, "  Other attached dwelling", 6, null, 0.0
    subdiv.other_attached_dwellings = _fetch_statscan_value(stats, "2.1.1.3")
    # "2.1.1.4", 1, "  Movable dwelling", 7, null, 0.0
    subdiv.movable_dwellings = _fetch_statscan_value(stats, "2.1.1.4")

    # "2.2.1.1", 1, "  Married or living common law"
    subdiv.married_or_common_law = _fetch_statscan_value(stats, "2.2.1.1")
    # "2.3.4.2", 1, "  Couples with children"
    subdiv.couples_with_children = _fetch_statscan_value(stats, "2.3.4.2")
    # "2.3.5", 0, "Total - Lone-parent census families in private households - 100% data"
    subdiv.single_parents = _fetch_statscan_value(stats, "2.3.5")

    # "3.6.1.1.1", 2, "    English"
    subdiv.eng_known = _fetch_statscan_value(stats, "3.6.1.1.1")
    # "3.6.1.2", 1, "  Non-official languages"
    subdiv.other_lang = _fetch_statscan_value(stats, "3.6.1.2")
    # "3.6.1.2.1", 2, "    Aboriginal languages"
    subdiv.aboriginal_lang = _fetch_statscan_value(stats, "3.6.1.2.1")
    # "3.1.1.4", 1, "  Neither English nor French"
    subdiv.eng_fr_not_known = _fetch_statscan_value(stats, "3.1.1.4")

    # "4.1.1.1.1", 2, "    Median total income in 2015 among recipients ($)"
    subdiv.median_total_income = _fetch_statscan_value(stats, "4.1.1.1.1")

    # "Immigration and citizenship", 18010, "5.2.1.3", 1, "  Non-permanent residents"
    subdiv.non_pr = _fetch_statscan_value(stats, "5.2.1.3")

    # "Visible minority", 25001, "7.1.1.1", 1, "  Total visible minority population"
    subdiv.visible_minority = _fetch_statscan_value(stats, "7.1.1.1")
    # "Education", 28002, "10.1.1.2", 1, "  Secondary (high) school diploma or equivalency certificate"
    subdiv.edu_1 = _fetch_statscan_value(stats, "10.1.1.2")
    # "Education", 28003, "10.1.1.3", 1, "  Postsecondary certificate, diploma or degree"
    subdiv.edu_2 = _fetch_statscan_value(stats, "10.1.1.3")
    # "Education", 28004, "10.1.1.3.1", 2, "    Apprenticeship or trades certificate or diploma"
    subdiv.edu_3 = _fetch_statscan_value(stats, "10.1.1.3.1")
    # "Education", 28009, "10.1.1.3.4", 2, "    University certificate, diploma or degree at bachelor level or above"
    subdiv.edu_4 = _fetch_statscan_value(stats, "10.1.1.3.4")
    # "Labour", 31002, "11.1.1.1.1", 2, "    Employed"
    subdiv.employed = _fetch_statscan_value(stats, "11.1.1.1.1")
    # "Labour", 31003, "11.1.1.1.2", 2, "    Unemployed"
    subdiv.unemployed = _fetch_statscan_value(stats, "11.1.1.1.2")
    # "Labour", 33004, "11.3.1.2.2", 2, "    Self-employed"
    subdiv.self_employed = _fetch_statscan_value(stats, "11.3.1.2.2")

    subdiv.save()


def _generate_geom(feat, srid=None):
    """
    Generate a clean geometry, and simplified snapshot for PostGIS insertion
    """
    # Source data tends to be in BC Alberts. #TODO: detect this instead?
    geos_geom = GEOSGeometry(feat.geom.wkt, srid=srid or feat.geom.srid)
    # Convert MultiPolygons to plain Polygons,
    # We assume the largest one is the one we want to keep, and the rest are artifacts/junk.
    geos_geom_out = _coerce_to_multipolygon(geos_geom, srid)
    geos_geom.transform(4326)
    geos_geom_simplified = copy.deepcopy(geos_geom)
    geos_geom_simplified.transform(4326)
    geos_geom_simplified = geos_geom_simplified.simplify(0.0005, preserve_topology=True)

    geos_geom_simplified = _coerce_to_multipolygon(geos_geom_simplified, srid)

    return geos_geom_out, geos_geom_simplified


def _coerce_to_multipolygon(geom, srid=4326):
    if isinstance(geom, Polygon):
        return MultiPolygon([geom], srid=srid)
    elif isinstance(geom, MultiPolygon):
        return geom
    else:
        raise Exception("Bad geometry type: {}, skipping.".format(geom.__class__))


def _coerce_to_multilinestring(geom, srid=4326):
    if isinstance(geom, LineString):
        return MultiLineString([geom], srid=srid)
    elif isinstance(geom, MultiLineString):
        return geom
    else:
        raise Exception("Bad geometry type: {}, skipping.".format(geom.__class__))


def _fetch_statscan_value(stats, property_name):
    for line in stats['DATA']:
        if line[8] == property_name:
            print(line[10], line[13])
            return line[13]

    raise Exception('stat not found: {}'.format(property_name))
