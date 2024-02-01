from django.contrib.gis.db import models


class CSDCentroid(models.Model):
    object_id = models.IntegerField(primary_key=True)
    census_year = models.IntegerField()
    census_subdivision_id = models.IntegerField( null=False, blank=False) #census_subdivision_id
    census_s_1 = models.CharField(max_length=127)
    census_s_2 = models.CharField(max_length=127)
    census_s_3 = models.CharField(max_length=127)
    x = models.FloatField()
    y = models.FloatField()
