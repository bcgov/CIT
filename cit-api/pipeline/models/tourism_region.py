from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point
from pipeline.constants import WGS84_SRID

class TourismRegion(models.Model):
    tourism_region_id = models.CharField(max_length=255,primary_key=True, null=False, blank=False)
    tourism_region_name = models.CharField(max_length=255)
    area_id = models.IntegerField(null=True, help_text="Original ID of data point")
    geom = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    geom_simplified = models.MultiPolygonField(srid=WGS84_SRID, null=True)
    feature_area_sqm = models.FloatField(null=True)
    feature_length_m = models.FloatField(null=True)

    def __str__(self):
        return self.tourism_region_name
    
