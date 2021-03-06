from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date
from pipeline.constants import WGS84_SRID


class BCFloodplain(models.Model):
    NAME_FIELD = "FLOODPLAIN_NAME"

    floodplains_bc_area_id = models.CharField(max_length=127)
    name = models.CharField(max_length=127)
    feature_name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=WGS84_SRID, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
