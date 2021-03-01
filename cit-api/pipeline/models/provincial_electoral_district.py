from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.constants import BC_ALBERS_SRID


class ProvincialElectoralDistrict(models.Model):
    NAME_FIELD = "ED_NAME"

    electoral_district_id = models.IntegerField(null=True)
    name = models.CharField(max_length=127)
    ed_abbreviation = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=BC_ALBERS_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=BC_ALBERS_SRID, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
