from django.contrib.gis.db import models

from .census import BaseCensus


class CEN_PROF_DETAILED_CSD_ATTRS_SP(BaseCensus):

    census_subdivision_id = models.IntegerField(
        primary_key=True, null=False, blank=False
    )
    census_subdivision_name = models.CharField(max_length=127)
    census_subdivision_type_code = models.CharField(max_length=12, null=True)
    census_subdivision_type_desc = models.CharField(max_length=127, null=True)
    pop_total_2021 = models.IntegerField(null=True)
    pop_2016_2021_pct_change = models.FloatField(null=True)

    class Meta:
        ordering = ("census_subdivision_id",)

    def __str__(self):
        return self.census_subdivision_name
