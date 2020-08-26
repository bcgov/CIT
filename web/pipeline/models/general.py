from django.contrib.gis.db import models


class Area(models.Model):
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)
    location_type = models.CharField(null=True, blank=True, max_length=255)


class Hex(models.Model):
    # "PHH_ID","Avail_5_1_Dispo","Avail_10_2_Dispo","Avail_25_5_Dispo","Avail_50_10_Dispo","Avail_LTE_Mobile_Dispo"
    id = models.CharField(primary_key=True, max_length=12)
    geom = models.PolygonField()
    avail_5_1 = models.BooleanField(default=False)
    avail_10_2 = models.BooleanField(default=False)
    avail_25_5 = models.BooleanField(default=False)
    avail_50_10 = models.BooleanField(default=False)


class ISP(models.Model):
    name = models.CharField(max_length=127, unique=True)


class Service(models.Model):
    isp = models.ForeignKey(ISP, on_delete=models.CASCADE)
    hex = models.ForeignKey(Hex, on_delete=models.DO_NOTHING)
    technology = models.CharField(max_length=63)

    class Meta:
        unique_together = ('isp', 'hex', 'technology')


class Road(models.Model):
    geom = models.MultiLineStringField(srid=4326, null=True)
    best_broadband = models.CharField(max_length=5)


class Municipality(Area):
    ID_FIELD = 'AA_ID'
    NAME_FIELD = 'ABRVN'
    oc_m_yr = models.CharField(
        max_length=4,
        help_text="The four-digit year that the most recent Order-In-Council or Ministerial Order was approved, "
        " e.g., 2014.",
    )

    """
    AA_ID 3
    * AA_NAME The Corporation of the Village of Burns Lake
    * ABRVN Burns Lake
    BDY_TYPE Legal
    AA_PARENT Regional District of Bulkley-Nechako
    CHNG_ORG MCSCD
    UPT_TYPE E
    UPT_DATE 20130429
    MAP_STATUS Not Appended
    OC_M_NMBR 1576
    * OC_M_YR 1994
    OC_M_TYPE OIC
    * WBST_RL
    IMAGE_URL
    AFCTD_AREA
    AREA_SQM 8986418.5648
    LENGTH_M 58666.4092
    * SHAPE 0
    OBEJCTID 1442
    """


class SchoolDistrict(Area):
    ID_FIELD = 'ADMIN_SID'
    NAME_FIELD = 'SD_NAME'
    sd_num = models.CharField(
        max_length=5,
    )
    community = models.ManyToManyField('Community')
    """
    {'ADMIN_SID': 121, 'SD_NAME': 'Southeast Kootenay', 'SD_NUM': 5, 'FCODE': 'FA91800600', 'SHAPE': 0, 'AREA_SQM': 12518364167.6713, 'FEAT_LEN': 729284.9581, 'OBJECTID': 1}
    """


class RegionalDistrict(Area):
    ID_FIELD = 'AA_ID'
    NAME_FIELD = 'AA_NAME'
    oc_m_yr = models.CharField(
        null=True,
        max_length=4,
        help_text="The four-digit year that the most recent Order-In-Council or Ministerial Order was approved, "
        " e.g., 2014.",
    )
    """
    {'AA_ID': 2, 'AA_NAME': 'Regional District of Bulkley-Nechako', 'ABRVN': 'RDBN', 'BDY_TYPE': 'Legal', 'AA_PARENT': 'Province of British Columbia', 'CHNG_ORG': 'MCSCD', 'UPT_TYPE': 'E', 'UPT_DATE': '20130606', 'MAP_STATUS': 'Not Appended', 'OC_M_NMBR': '', 'OC_M_YR': '', 'OC_M_TYPE': '', 'WBST_RL': '', 'IMAGE_URL': '', 'AFCTD_AREA': '', 'AREA_SQM': 78266556471.7951, 'LENGTH_M': 2057088.3374, 'SHAPE': 0, 'OBEJCTID': 2901}
    """


class LocationDistance(models.Model):
    community = models.ForeignKey('Community', on_delete=models.DO_NOTHING, related_name='distances')
    location = models.ForeignKey('Location', on_delete=models.DO_NOTHING, related_name='distances')
    distance = models.DecimalField(
        null=True, blank=True, max_digits=24, decimal_places=4,
        help_text="Birds' eye distance from community to Location (km)"
    )
    driving_distance = models.DecimalField(
        null=True, blank=True, max_digits=24, decimal_places=4,
        help_text="Driving distance from community to Location (km)"
    )
    travel_time = models.IntegerField(
        null=True, blank=True, help_text="Travel time (in minutes) corresponding to driving distance"
    )
    travel_time_display = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text="Travel time, in human-readable units (e.g. 15 minutes 22 seconds)",
    )

    class Meta:
        unique_together = ('community', 'location')
        verbose_name = "Location Distance"
        verbose_name_plural = "Location Distances"

    def __str__(self):
        return '{} to {}: {} km'.format(self.community.place_name, self.location.name, self.distance)


class WildfireZone(Area):
    NAME_FIELD = 'FIRE_ZONE'
    risk_class = models.CharField(
        max_length=1,
        help_text="A class value signifying the communities WUI Risk Class rating between 1 (low) and 5 " "(extreme).",
    )  # 1-5


class TsunamiZone(Area):
    NAME_FIELD = 'TNZ_ID'
    zone_class = models.CharField(
        max_length=1,
        help_text="See https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery/"
        "preparedbc/know-your-hazards/tsunamis - A-C:moderate D,E:low",
    )
    # "Tsunamis are rare but serious events. Many areas of coastal B.C. may be threatened in the event
    # of a tsunami. However, it is generally accepted by scientific and technical experts that Victoria,
    # eastern Vancouver Island, Vancouver and the lower mainland are low-risk areas."
    # --
    # Intretation for labelling purpose:
    # A-C moderate
    # D,E, low
    # otherwise, none.
