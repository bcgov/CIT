from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date
from pipeline.constants import WGS84_SRID


class AgriculturalLandReserve(models.Model):
    NAME_FIELD = "ALR_POLY_ID"

    name = models.CharField(max_length=127)
    feature_area_sqm = models.IntegerField(null=True)
    status = models.CharField(max_length=127)
    feature_code = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=WGS84_SRID, null=True)

    municipality = models.ForeignKey('Municipality',
                                     on_delete=models.SET_NULL,
                                     blank=True,
                                     null=True)
    regional_district = models.ForeignKey('RegionalDistrict',
                                          on_delete=models.SET_NULL,
                                          blank=True,
                                          null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
