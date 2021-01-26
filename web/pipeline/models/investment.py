from django.contrib.gis.db import models

class Investment(models.Model):
    address = models.CharField(max_length=127, null=True)
    point = models.PointField(srid=4326, null=True, blank=False)