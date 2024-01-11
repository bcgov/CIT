from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.constants import WGS84_SRID

from .cen_prof_detailed_csd_attrs_sp import CEN_PROF_DETAILED_CSD_ATTRS_SP

class CORE_HOUSING_NEED(models.Model):
    LINK_FIELD = 'CENSUS_SUBDIVISION_ID'
    census_subdivision_id = models.ForeignKey(CEN_PROF_DETAILED_CSD_ATTRS_SP, on_delete=models.SET_NULL, db_column="census_subdivision_id", null=True)
    
    core_housing_examined = models.IntegerField(null=True)
    core_housing_need = models.IntegerField(null=True)
    
    #pre-processed calculation
    core_housing_need_percentage = models.FloatField(null=True)

    class Meta:
        ordering = ("census_subdivision_id", )

