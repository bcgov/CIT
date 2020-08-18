from django.contrib.gis.db import models
from django.contrib.gis.db.models import PointField

from pipeline.utils import (
    serialize_community_detail_fields, get_community_type_display_name)


class Community(models.Model):
    place_id = models.CharField(null=True, blank=True, max_length=255, unique=True)
    place_name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    # TODO SY - make this into a choice field tuple
    community_type = models.CharField(null=True, blank=True, max_length=255)
    census_subdivision = models.ForeignKey('CensusSubdivision', on_delete=models.CASCADE)

    wildfire_zone = models.ForeignKey('WildfireZone', null=True, on_delete=models.SET_NULL)
    tsunami_zone = models.ForeignKey('TsunamiZone', null=True, on_delete=models.SET_NULL)

    percent_50_10 = models.FloatField(
        null=True, blank=True, help_text='portion (0-1) of area with 50/10 speeds (calc. by road length)')
    percent_25_5 = models.FloatField(
        null=True, blank=True, help_text='portion (0-1) of area with 25/5 speeds (calc. by road length)')
    percent_10_2 = models.FloatField(
        null=True, blank=True, help_text='portion (0-1) of area with 10/2 speeds (calc. by road length)')
    percent_5_1 = models.FloatField(
        null=True, blank=True, help_text='portion (0-1) of area with 5/1 speeds (calc. by road length)')

    hexuid = models.ForeignKey(
        'Hex',
        db_column='hexuid',
        on_delete=models.SET_NULL,
        null=True,
        related_name='community',
        help_text="ID of spatial hex used to color province by connectivity quality.",
    )

    # FN_Community_Name
    fn_community_name = models.CharField(max_length=127, default='')
    # Nation
    nation = models.CharField(max_length=127, default='')
    # Band_Number
    band_number = models.IntegerField(null=True)

    incorporated = models.NullBooleanField()

    # Municapility URL Code
    # municipality_id = models.IntegerField(null=True)
    municipality = models.ForeignKey('Municipality', null=True, on_delete=models.SET_NULL)

    # Last-Mile Status (June2020)
    last_mile_status = models.CharField(max_length=255, null=True, blank=True)

    # Transport Status (June2020)
    transport_mile_status = models.CharField(max_length=255, null=True, blank=True)

    # CBC Phase
    cbc_phase = models.CharField(max_length=255, null=True, blank=True)

    # Calculated fields (cached in the model for performance reasons)
    num_courts = models.IntegerField(null=True)
    num_schools = models.IntegerField(null=True)
    num_hospitals = models.IntegerField(null=True)
    num_timber_facilities = models.IntegerField(null=True)

    def __str__(self):
        return self.place_name

    class Meta:
        verbose_name_plural = "Communities"

    def latitude(self):
        if self.point:
            return self.point[1]
        else:
            # debugging; remove later
            print("Community {} has no location".format(self.place_name))
            return None

    def longitude(self):
        if self.point:
            return self.point[0]
        else:
            # debugging; remove later
            print("Community {} has no location".format(self.place_name))
            return None

    def get_display_fields(self):
        return serialize_community_detail_fields(self)

    def get_display_community_type(self):
        return get_community_type_display_name(self.community_type)
