from django.contrib.gis.db import models

class Opportunity(models.Model):
    address = models.CharField(max_length=255, null=False)
    point = models.PointField(srid=4326, null=False, blank=False)