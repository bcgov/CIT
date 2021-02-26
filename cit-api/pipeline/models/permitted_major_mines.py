from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date


class PermittedMajorMines(models.Model):
    NAME_FIELD = "MINE_NAME"

    mine_number = models.IntegerField(null=True)
    name = models.CharField(max_length=128, null=True)
    status_desc = models.CharField(max_length=128, null=True)
    op_status_code = models.CharField(max_length=128, null=True)
    permit_no = models.CharField(max_length=128, null=True)
    permitee_name = models.CharField(max_length=128, null=True)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
