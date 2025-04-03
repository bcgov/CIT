from django.contrib.gis.db import models
from pipeline.models.common.base_named_line import BaseNamedLine

from pipeline.constants import WGS84_SRID


class Railway(BaseNamedLine):
    ID_FIELD = 'RAILWAY_TRACK_ID'
    NAME_FIELD = 'TRACK_NAME'

    area_id = models.IntegerField(null=True, help_text="Original ID of data point")
    track_classification = models.CharField(max_length=32)
    use_type = models.CharField(max_length=32)
    number_of_tracks = models.IntegerField(null=True)
    electrification = models.CharField(max_length=32)
    status = models.CharField(max_length=32)
    operator_english_name = models.CharField(max_length=64)
    owner_name = models.CharField(max_length=32)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name