from django.contrib.gis.db import models

from .common.base_named_polygon import BaseNamedPolygon


class River(BaseNamedPolygon):
    ID_FIELD = 'WATERBODY_POLY_ID'
    NAME_FIELD = 'GNIS_NAME_1'

    area_id = models.IntegerField(null=True, help_text="Original ID of data point")

    class Meta:
        ordering = ("id",)

    def __str__(self):
        return self.name
