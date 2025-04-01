from django.contrib.gis.db import models

from .common.base_named_location import BaseNamedLocation


class ProvincialElectoralDistrict(BaseNamedLocation):
    NAME_FIELD = "ED_NAME"

    electoral_district_id = models.IntegerField(null=True)
    ed_abbreviation = models.CharField(max_length=127)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
