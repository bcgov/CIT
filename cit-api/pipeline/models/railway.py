from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiLineStringField
from django.contrib.gis.geos import Point

from pipeline.constants import WGS84_SRID


class Railway(models.Model):
    ID_FIELD = 'RAILWAY_TRACK_ID'
    NAME_FIELD = 'TRACK_NAME'

    area_id = models.IntegerField(null=True, help_text="Original ID of data point")
    track_classification = models.CharField(max_length=32)
    use_type = models.CharField(max_length=32)
    number_of_tracks = models.IntegerField(null=True)
    electrification = models.CharField(max_length=32)
    status = models.CharField(max_length=32)
    name = models.CharField(max_length=127)
    geom = models.MultiLineStringField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiLineStringField(srid=WGS84_SRID, null=True)
    operator_english_name = models.CharField(max_length=64)
    owner_name = models.CharField(max_length=32)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name