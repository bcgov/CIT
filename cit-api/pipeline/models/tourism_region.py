from django.contrib.gis.db import models

class TourismRegion(models.Model):
    naics = models.IntegerField(null=False, primary_key=True)
    sector = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
