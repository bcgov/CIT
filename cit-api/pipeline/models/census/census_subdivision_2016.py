from django.contrib.gis.db import models

from .census import BaseCensus


class census_subdivision_2016(BaseCensus):

    census_subdivision_id = models.IntegerField(
        primary_key=True, null=False, blank=False
    )
    census_subdivision_name = models.CharField(max_length=127)
    census_subdivision_type_code = models.CharField(max_length=12, null=True)
    census_subdivision_type_desc = models.CharField(max_length=127, null=True)
    pop_total_2011 = models.IntegerField(null=True)
    pop_2011_2016_pct_change = models.FloatField(null=True)

    class Meta:
        ordering = ("census_subdivision_id",)

    def __str__(self):
        return self.census_subdivision_name
