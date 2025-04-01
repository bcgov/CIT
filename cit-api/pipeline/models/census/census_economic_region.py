from django.contrib.gis.db import models

from pipeline.models.common.base_named_location import BaseNamedLocation

class CensusEconomicRegion(BaseNamedLocation):
    NAME_FIELD = "ECONOMIC_REGION_NAME"

    census_year = models.CharField(max_length=32)
    economic_region_id = models.IntegerField(null=True)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
