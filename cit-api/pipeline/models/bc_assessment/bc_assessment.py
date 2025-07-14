from django.contrib.gis.db import models


class BaseBCAssessment(models.Model):
    actual_use_code_category = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqft_comm = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqft_res = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqm_comm = models.CharField(max_length=128, null=True, blank=True)
    average_area_sqm_res = models.CharField(max_length=128, null=True, blank=True)
    average_improvement_value = models.CharField(max_length=128, null=True, blank=True)
    average_land_area_acres = models.CharField(max_length=128, null=True, blank=True)
    average_land_area_hectares = models.CharField(max_length=128, null=True, blank=True)
    average_land_value = models.CharField(max_length=128, null=True, blank=True)
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
    number_properties_5to25_acres = models.CharField(
        max_length=128, null=True, blank=True
    )
    number_properties_gt25_acres = models.CharField(
        max_length=128, null=True, blank=True
    )
    number_properties_lt5_acres = models.CharField(
        max_length=128, null=True, blank=True
    )
    number_residential_bldgs = models.CharField(max_length=128, null=True, blank=True)
    number_underutilized_property = models.CharField(
        max_length=128, null=True, blank=True
    )
    number_utilized_property = models.CharField(max_length=128, null=True, blank=True)
    number_vacant_property = models.CharField(max_length=128, null=True, blank=True)
    total_improvement_value = models.CharField(max_length=128, null=True, blank=True)
    total_land_value = models.CharField(max_length=128, null=True, blank=True)

    class Meta:
        abstract = True
