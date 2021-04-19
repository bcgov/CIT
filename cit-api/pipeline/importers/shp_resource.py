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
import copy
import json
import logging
import os
import requests
import tempfile

from django.apps import apps
from django.contrib.gis.geos.prototypes.io import wkt_w
from django.contrib.gis.gdal import DataSource as gdalDataSource
from django.contrib.gis.geos import GEOSGeometry, MultiPolygon, Polygon, LineString, MultiLineString
from django.conf import settings

from pipeline.constants import SOURCE_DATABC, SOURCE_OPENCA
from pipeline.models.general import DataSource, Road, Hex, ISP, Service
from pipeline.constants import BC_ALBERS_SRID, WGS84_SRID
from pipeline.importers.utils import (import_data_into_area_model, get_databc_last_modified_date,
                                      get_openca_last_modified_date, _generate_geom)

logger = logging.getLogger(__name__)
csduid_to_geo_uid = {}


def import_shp_resources(resource_type):
    shp_resource_names = DataSource.objects.filter(source_type="shp").values_list("name", flat=True)

    if resource_type == "roads":
        import_roads()
    elif resource_type == "hexes":
        import_hexes()
    elif resource_type == "all":
        for available_resource_type in shp_resource_names:
            import_resource(available_resource_type)
    elif resource_type in shp_resource_names:
        import_resource(resource_type)
    else:
        print("Error: Resource type {} not supported".format(resource_type))


def import_resource(resource_type):
    data_source = DataSource.objects.get(name=resource_type)

    if resource_type == "northern_rockies_census_division":
        # Note: census divisions are only used to monkey-patch the Northern Rockies "regional district"
        # which is missing (actually a municipality)
        import_northern_rockies_census_division(data_source)
        return

    ds = _get_datasource(data_source.source_file_path)
    for feat in ds[0]:
        row = {}

        for f in feat.fields:
            row[f] = feat.get(f)

        model_class = apps.get_model("pipeline", data_source.model_name)
        instance = import_data_into_area_model(resource_type, model_class, row)

        geos_geom_out, geos_geom_simplified = _generate_geom(feat, srid=WGS84_SRID)
        instance.geom = geos_geom_out
        instance.geom_simplified = geos_geom_simplified

        instance.save()

    if data_source.source == SOURCE_DATABC:
        data_source.last_updated = get_databc_last_modified_date(data_source)
        data_source.save()
    elif data_source.source == SOURCE_OPENCA:
        data_source.last_updated = get_openca_last_modified_date(data_source)
        data_source.save()


def import_northern_rockies_census_division(data_source):
    from pipeline.models import RegionalDistrict
    """
    {'CNSSR': 2016, 'CNSSDVSND': '5901', 'CNSSDVSNNM': 'East Kootenay', 'CNSSDVSNTP': 'RD', 'CNSSDVSNT1': 'Regional District', 'AREA_SQM': 27849712862.3922, 'FEAT_LEN': 1070461.9249, 'OBJECTID': 115}
    """

    ds = _get_datasource(data_source.source_file_path)
    for feat in ds[0]:
        row = {}

        for f in feat.fields:
            row[f] = feat.get(f)

        name = row["CNSSDVSNNM"]
        if name != "Northern Rockies":
            continue

        print(row)

        NORTHERN_ROCKIES_NAME = "Northern Rockies Regional Municipality"
        instance, created = RegionalDistrict.objects.get_or_create(name=NORTHERN_ROCKIES_NAME)

        print("instance", instance)
        instance.area_id = row["OBJECTID"]

        geos_geom_out, geos_geom_simplified = _generate_geom(feat, srid=WGS84_SRID)
        instance.geom = geos_geom_out
        instance.geom_simplified = geos_geom_simplified

        instance.save()


def import_hexes():
    data_source = DataSource.objects.get(name="hexes")
    ds = gdalDataSource(data_source.source_file_path)

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
        wkt = wkt_w(dim=2).write(GEOSGeometry(feat.geom.wkt, srid=WGS84_SRID)).decode()
        try:
            hex.geom = GEOSGeometry(wkt, srid=WGS84_SRID)
        except TypeError:
            print('skipping bad geom')
        if not hex.geom:
            continue
        hexes[hex_id] = hex

    Hex.objects.bulk_create(hexes.values())

    if data_source.source == SOURCE_DATABC:
        data_source.last_updated = get_databc_last_modified_date(data_source)
        data_source.save()
    elif data_source.source == SOURCE_OPENCA:
        data_source.last_updated = get_openca_last_modified_date(data_source)
        data_source.save()


def import_roads():
    data_source = DataSource.objects.get(name="roads")
    ds = _get_datasource(data_source.source_file_path)
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

        road.geom = _coerce_to_multilinestring(GEOSGeometry(feat.geom.wkt, srid=WGS84_SRID))
        roads.append(road)

    Road.objects.bulk_create(roads, 1000)

    if data_source.source == SOURCE_DATABC:
        data_source.last_updated = get_databc_last_modified_date(data_source)
        data_source.save()
    elif data_source.source == SOURCE_OPENCA:
        data_source.last_updated = get_openca_last_modified_date(data_source)
        data_source.save()


def _get_datasource(filename):
    f = open(os.path.join(settings.BASE_DIR, filename), 'rb')

    zip_ref = zipfile.ZipFile(f)

    ret = zip_ref.testzip()  # noqa

    output_dir = tempfile.mkdtemp()
    for item in zip_ref.namelist():
        # Check filename endswith shp
        zip_ref.extract(item, output_dir)
        if item.endswith('.shp'):
            # Extract a single file from zip
            the_shapefile = os.path.join(output_dir, item)
            # break        print(feat.geom)
    zip_ref.close()

    ds = gdalDataSource(the_shapefile)
    return ds


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
