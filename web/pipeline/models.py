from django.contrib.gis.db import models
from django.contrib.gis.db.models import PointField


class Location(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    # location_type = models.CharField(null=True, blank=True, max_length=255)
    # source = models.CharField(null=True, blank=True, max_length=255)
    # kind = models.CharField(null=True, blank=True, max_length=255)

    def __str__(self):
        return self.name

    def latitude(self):
        return self.point[1]

    def longitude(self):
        return self.point[0]


class Hospital(Location):
    sv_reference = models.IntegerField(null=True, blank=True)
    rg_name = models.CharField(null=True, blank=True, max_length=255)
    # sv_name = models.CharField(null=True, blank=True, max_length=255)
    # sv_description = models.TextField(null=True, blank=True)
    # phone_number = models.CharField(null=True, blank=True, max_length=255)
    # website = models.TextField(null=True, blank=True)
    # wheelchair_accessible = models.CharField(null=True, blank=True, max_length=255)
    # language = models.CharField(null=True, blank=True, max_length=255)
    # hours = models.TextField(null=True, blank=True)
    # street_number = models.CharField(null=True, blank=True, max_length=255)
    # city = models.CharField(null=True, blank=True, max_length=255)
    # province = models.CharField(null=True, blank=True, max_length=255)
    # postal_code = models.CharField(null=True, blank=True, max_length=255)
    # location = PointField(null=True, blank=True)
    # link_811 = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class CensusSubdivision(models.Model):
    # CSUID is used as primary key, just 'id' in Django.
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)


class Community(models.Model):
    place_id = models.CharField(null=True, blank=True, max_length=255)
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
