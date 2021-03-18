from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.constants import WGS84_SRID


class HealthAuthorityBoundary(models.Model):
    NAME_FIELD = "HLTH_AUTHORITY_NAME"

    hlth_authority_id = models.CharField(max_length=32)
    hlth_authority_code = models.IntegerField(null=True)
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=WGS84_SRID, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
