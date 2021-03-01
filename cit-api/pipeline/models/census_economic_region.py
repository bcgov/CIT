from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date
from pipeline.constants import BC_ALBERS_SRID


class CensusEconomicRegion(models.Model):
    NAME_FIELD = "ECONOMIC_REGION_NAME"

    census_year = models.CharField(max_length=32)
    economic_region_id = models.IntegerField(null=True)
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=BC_ALBERS_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=BC_ALBERS_SRID, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
