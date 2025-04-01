from django.contrib.gis.db import models
from pipeline.constants import WGS84_SRID


class CensusEconomicRegion(models.Model):
    NAME_FIELD = "ECONOMIC_REGION_NAME"

    census_year = models.CharField(max_length=32)
    economic_region_id = models.IntegerField(null=True)
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=WGS84_SRID, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
