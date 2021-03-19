from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date
from pipeline.constants import BC_ALBERS_SRID


class BCAssessmentCensusSubdivision(models.Model):
    ID_FIELD = 'BCA_SBCSDU_SYSID'
    LINK_FIELD = 'CENSUS_SUBDIVISION_ID'

    actual_use_code_category = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqft_comm = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqft_res = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqm_comm = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqm_res = models.CharField(max_length=128, null=True, blank=True)
    average_improvement_value = models.CharField(max_length=128, null=True, blank=True)
    average_land_area_acres = models.CharField(max_length=128, null=True, blank=True)
    average_land_area_hectares = models.CharField(max_length=128, null=True, blank=True)
    average_land_value = models.CharField(max_length=128, null=True, blank=True)
    bca_sbcsdu_sysid = models.CharField(max_length=128, null=True, blank=True)
    census_division_name = models.CharField(max_length=128, null=True, blank=True)
    census_economic_region_name = models.CharField(max_length=128, null=True, blank=True)
    census_subdivision = models.ForeignKey('CensusSubdivision', on_delete=models.DO_NOTHING)
    census_division_name = models.CharField(max_length=128, null=True, blank=True)
    median_improvement_value = models.CharField(max_length=128, null=True, blank=True)
    median_land_value = models.CharField(max_length=128, null=True, blank=True)
    median_storeys_commercial = models.CharField(max_length=128, null=True, blank=True)
    median_storeys_residential = models.CharField(max_length=128, null=True, blank=True)
    median_year_built_comm = models.CharField(max_length=128, null=True, blank=True)
    median_year_built_res = models.CharField(max_length=128, null=True, blank=True)
    number_commercial_bldgs = models.CharField(max_length=128, null=True, blank=True)
    number_of_folios = models.CharField(max_length=128, null=True, blank=True)
    number_of_permits_6mo = models.CharField(max_length=128, null=True, blank=True)
    number_of_permits_12mo = models.CharField(max_length=128, null=True, blank=True)
    number_of_permits_24_mo = models.CharField(max_length=128, null=True, blank=True)
    number_of_permits_60_mo = models.CharField(max_length=128, null=True, blank=True)
    number_of_sales_6mo = models.CharField(max_length=128, null=True, blank=True)
    number_of_sales_12mo = models.CharField(max_length=128, null=True, blank=True)
    number_of_sales_24mo = models.CharField(max_length=128, null=True, blank=True)
    number_of_sales_60mo = models.CharField(max_length=128, null=True, blank=True)
    number_properties_5to25_acres = models.CharField(max_length=128, null=True, blank=True)
    number_properties_gt25_acres = models.CharField(max_length=128, null=True, blank=True)
    number_properties_lt5_acres = models.CharField(max_length=128, null=True, blank=True)
    number_residential_bldgs = models.CharField(max_length=128, null=True, blank=True)
    number_underutilized_property = models.CharField(max_length=128, null=True, blank=True)
    number_utilized_property = models.CharField(max_length=128, null=True, blank=True)
    number_vacant_property = models.CharField(max_length=128, null=True, blank=True)
    total_improvement_value = models.CharField(max_length=128, null=True, blank=True)
    total_land_value = models.CharField(max_length=128, null=True, blank=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
