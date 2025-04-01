from django.contrib.gis.db import models

from .common.base_named_location import BaseNamedLocation


class NaturalResourceRegion(BaseNamedLocation):
    NAME_FIELD = "REGION_NAME"

    org_unit = models.CharField(max_length=127)

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
