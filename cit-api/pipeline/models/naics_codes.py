from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point
from pipeline.constants import WGS84_SRID

class NAICSCodes(models.Model):
    level = models.IntegerField()
    hierarchical_structure = models.CharField(max_length=255, null=True)
    code = models.IntegerField(primary_key=True)
    parent = models.CharField(max_length=255, null=True)
    class_title = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.code