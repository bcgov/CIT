from django.contrib.gis.db import models
from pipeline.models.common.base_named_line import BaseNamedLine

from pipeline.constants import WGS84_SRID


class RoadsAndHighways(BaseNamedLine):
    ID_FIELD = 'DIGITAL_ROAD_ATLAS_LINE_ID'
    NAME_FIELD = 'ROAD_NAME_FULL'

    area_id = models.IntegerField(null=True, help_text="Original ID of data point")
    feature_type = models.CharField(max_length=32)
    road_surface = models.CharField(max_length=32)
    road_class = models.CharField(max_length=32)
    road_name_alias1 = models.CharField(null=True, max_length=32)
    road_name_alias2 = models.CharField(null=True, max_length=32)
    number_of_lanes = models.IntegerField(null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name