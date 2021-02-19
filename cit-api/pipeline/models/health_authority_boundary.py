from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date


class HealthAuthorityBoundary(models.Model):
    hlth_authority_id = models.CharField(max_length=32)
    hlth_authority_code = models.IntegerField(null=True)
    hlth_authority_name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
