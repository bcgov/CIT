
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

from pipeline.models import CensusSubdivision
import zipfile
import os
import copy
import tempfile
from django.contrib.gis.gdal import DataSource
from django.contrib.gis.geos import GEOSGeometry, MultiPolygon, Polygon

# Run from command line :
# python manage.py load_shapefile <aquifer_id> <shapefile name>
from django.core.management.base import BaseCommand

import logging
from django.conf import settings

logger = logging.getLogger(__name__)

class Command(BaseCommand):

    def handle(self, *args, **options):

        f = open(os.path.join(settings.BASE_DIR, 'lcsd000b16a_e.zip'), 'rb')

        zip_ref = zipfile.ZipFile(f)

        ret = zip_ref.testzip()

        output_dir = tempfile.mkdtemp()
        for item in zip_ref.namelist():
            # Check filename endswith shp
            zip_ref.extract(item, output_dir)
            if item.endswith('.shp'):
                # Extract a single file from zip
                the_shapefile = os.path.join(output_dir, item)
                # break
        zip_ref.close()

        ds = DataSource(the_shapefile)
        for feat in ds[0]:
            _save_subdiv(feat)


def _save_subdiv(feat):
    print(
        'CSDUID', feat.get('CSDUID'), '\n',
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
    )
    geom = feat.geom

    geos_geom = GEOSGeometry(geom.wkt, srid=3005)
    # Convert MultiPolygons to plain Polygons,
    # We assume the largest one is the one we want to keep, and the rest are artifacts/junk.
    geos_geom_out = _coerce_to_multipolygon(geos_geom)

    geos_geom_simplified = copy.deepcopy(geos_geom)
    geos_geom_simplified.transform(4326)
    geos_geom_simplified = geos_geom_simplified.simplify(
        .0005, preserve_topology=True)

    geos_geom_simplified = _coerce_to_multipolygon(geos_geom_simplified)

    subdiv = CensusSubdivision.objects.get_or_create(
        id=int(feat.get('CSDUID')),
        name=feat.get('CSDNAME')
    )[0]

    subdiv.geom = geos_geom_out
    subdiv.geom_simplified = geos_geom_simplified
    subdiv.save()

def _coerce_to_multipolygon(geom):
    if isinstance(geom, Polygon):
        return MultiPolygon([geom], srid=3005)
    elif isinstance(geom, MultiPolygon):
        return geom
    else:
        raise Exception("Bad geometry type: {}, skipping.".format(
            geom.__class__))