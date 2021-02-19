from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date


class ProvincialElectoralDistrict(models.Model):
    electoral_district_id = models.IntegerField(null=True)
    ed_name = models.CharField(max_length=127)
    ed_abbreviation = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
