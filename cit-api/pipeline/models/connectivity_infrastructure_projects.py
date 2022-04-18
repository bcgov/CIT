from django.contrib.gis.db import models

from pipeline.utils import serialize_regional_district_fields
from pipeline.models.cen_prof_detailed_csd_attrs_sp import CEN_PROF_DETAILED_CSD_ATTRS_SP
from pipeline.constants import WGS84_SRID

class ConnectivityInfrastructureProjects(models.Model):
    project = models.IntegerField(null=False)
    project_name = models.CharField(max_length=127)
    proponent = models.CharField(max_length=127)
    place_id = models.IntegerField()
    community_name = models.CharField(max_length=127)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    phase = models.CharField(max_length=127)
    num_housesholds_served = models.IntegerField(null=True)
    speed = models.IntegerField()
    status = models.CharField(null=True, max_length=127)
    type_of_project = models.CharField(max_length=127)
    project_description = models.CharField(max_length=127)
    bc_funding = models.FloatField()
    estimated_start_date = models.DateField(null=True)
    estimated_completion_date = models.DateField(null=True)
    primary_news_release = models.CharField(max_length=127)
    economic_region = models.CharField(max_length=127)
    electoral_name = models.CharField(max_length=127)
    place_type = models.CharField(max_length=127)
    reserve_name = models.CharField(null=True, max_length=127)
    nation = models.CharField(null=True, max_length=127)