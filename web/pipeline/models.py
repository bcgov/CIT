from django.db import models
from django.contrib.gis.db.models import PointField


class Location(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)

    def __str__(self):
        return self.name

    def latitude(self):
        return self.location[1]

    def longitude(self):
        return self.location[0]


class CensusSubdivision(models.Model):
    # CSUID is used as primary key, just 'id' in Django.
    pass


class Community(models.Model):
    place_name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    census_subdivision = models.ForeignKey(CensusSubdivision, on_delete=models.CASCADE)
    hexuid = models.IntegerField(help_text="ID of spatial hex used to color province by connectivity quality.")

    def __str__(self):
        return self.place_name

    class Meta:
        verbose_name_plural = "Communities"

    def latitude(self):
        return self.location[1]

    def longitude(self):
        return self.location[0]
