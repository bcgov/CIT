from django.contrib.gis.db import models

from .common.base_named_polygon import BaseNamedPolygon


class AgriculturalLandReserve(BaseNamedPolygon):
    NAME_FIELD = "ALR_POLY_ID"

    feature_area_sqm = models.BigIntegerField(null=True)
    status = models.CharField(max_length=127, blank=True, null=True)

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
