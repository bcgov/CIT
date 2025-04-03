from django.contrib.gis.db import models

from pipeline.constants import WGS84_SRID


class BaseLineGeom(models.Model):
    geom = models.MultiLineStringField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiLineStringField(srid=WGS84_SRID, null=True)

    class Meta:
        abstract = True