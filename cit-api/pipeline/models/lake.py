from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.constants import WGS84_SRID


class Lake(models.Model):
    ID_FIELD = 'WATERBODY_POLY_ID'
    NAME_FIELD = 'GNIS_NAME_1'

    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=WGS84_SRID, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
