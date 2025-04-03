from django.contrib.gis.db import models

from .base_polygon_geom import BasePolygonGeom

class BaseNamedPolygon(BasePolygonGeom):
    name = models.CharField(max_length=127)

    class Meta:
        abstract = True