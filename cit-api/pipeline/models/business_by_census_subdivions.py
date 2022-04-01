from django.contrib.gis.db import models

from pipeline.models.cen_prof_detailed_csd_attrs_sp import CEN_PROF_DETAILED_CSD_ATTRS_SP

class BusinessesByCSD(models.Model):
    census_subdivision = models.ForeignKey(CEN_PROF_DETAILED_CSD_ATTRS_SP, null=True, on_delete=models.SET_NULL)
    naics_code = models.IntegerField()
    employee_class = models.IntegerField()
    number_of_businesses = models.IntegerField()
    sector = models.CharField(max_length=127, null=True)