
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
CSDUID: String (7.0)
CSDNAME: String (100.0)
CSDTYPE: String (3.0)
PRUID: String (2.0)
PRNAME: String (100.0)
CDUID: String (4.0)
CDNAME: String (100.0)
CDTYPE: String (3.0)
CCSUID: String (7.0)
CCSNAME: String (100.0)
ERUID: String (4.0)
ERNAME: String (100.0)
SACCODE: String (3.0)
SACTYPE: String (1.0)
CMAUID: String (3.0)
CMAPUID: String (5.0)
CMANAME: String (100.0)
CMATYPE: String (1.0)
'''

from pipeline.models import CensusSubdivision
import zipfile
import os
import tempfile
from django.contrib.gis.gdal import DataSource
from django.contrib.gis.geos import GEOSGeometry

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

            feat.fields.get('CSDUID')
            geom = feat.geom

            # if not geom.srid == 3005:
            #     logging.info("Non BC-albers feature, skipping.")
            #     return

            # Eliminate any 3d geometry so it fits in PostGIS' 2d geometry schema.
            # Make a GEOSGeometry object using the string representation.
            wkt = wkt_w(dim=2).write(GEOSGeometry(geom.wkt, srid=3005)).decode()
            geos_geom = GEOSGeometry(wkt, srid=3005)
            # # Convert MultiPolygons to plain Polygons,
            # # We assume the largest one is the one we want to keep, and the rest are artifacts/junk.
            # if isinstance(geos_geom, geos.MultiPolygon):
            #     geos_geom_out = geos_geom[0]
            #     for g in geos_geom:
            #         if len(g.wkt) > len(geos_geom_out.wkt):
            #             geos_geom_out = g
            # elif isinstance(geos_geom, geos.Polygon):
            #     geos_geom_out = geos_geom
            # else:
            #     logging.info("Bad geometry type: {}, skipping.".format(
            #         geos_geom.__class__))
            #     return

            geos_geom_simplified = copy.deepcopy(geos_geom_out)
            geos_geom_simplified.transform(4326)
            geos_geom_simplified = geos_geom_simplified.simplify(
                .0005, preserve_topology=True)

            subdiv = CensusSubdivision()
            subdiv.geom = geos_geom_out
            subdiv.geom_simplified = geos_geom_simplified
            subdiv.save()
