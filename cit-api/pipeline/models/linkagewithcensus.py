from django.contrib.gis.db import models
from pipeline.models.general import (RegionalDistrict, SchoolDistrict, WildfireZone, TsunamiZone, )
from pipeline.models.census_economic_region import CensusEconomicRegion
from pipeline.models.health_authority_boundary import HealthAuthorityBoundary 
from pipeline.models.tourism_region import TourismRegion
from pipeline.models.cen_prof_detailed_csd_attrs_sp import CEN_PROF_DETAILED_CSD_ATTRS_SP

class LinkageWithCensus(models.Model):
    census_subdivision = models.ForeignKey(CEN_PROF_DETAILED_CSD_ATTRS_SP, null=True, on_delete=models.SET_NULL)
    tourism_region = models.ForeignKey(TourismRegion, null=True, on_delete=models.SET_NULL)
    regional_district = models.ForeignKey(RegionalDistrict, null=True, on_delete=models.SET_NULL)
    economic_region = models.ForeignKey(CensusEconomicRegion, null=True, on_delete=models.SET_NULL)
    bc_fire_zone = models.ForeignKey(WildfireZone, null=True, on_delete=models.SET_NULL)
    tsunami_notification_zone= models.ForeignKey(TsunamiZone, null=True, on_delete=models.SET_NULL)
    health_authority = models.ForeignKey(HealthAuthorityBoundary, null=True, on_delete=models.SET_NULL)
    # health_authority_id = models.IntegerField() -- waiting for Stephen's confirmation
    school_district = models.ForeignKey(SchoolDistrict, null=True, on_delete=models.SET_NULL)