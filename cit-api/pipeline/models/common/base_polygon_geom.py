from django.contrib.gis.db import models

from pipeline.constants import WGS84_SRID


class BasePolygonGeom(models.Model):
    geom = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=WGS84_SRID, null=True)

    class Meta:
        abstract = True
