from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.constants import BC_ALBERS_SRID


class River(models.Model):
    ID_FIELD = 'WATERBODY_POLY_ID'
    NAME_FIELD = 'GNIS_NAME_1'

    area_id = models.IntegerField(null=True, help_text="Original ID of data point")
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=BC_ALBERS_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=BC_ALBERS_SRID, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
