from django.contrib.gis.db import models

from .common.base_named_polygon import BaseNamedPolygon


class HealthAuthorityBoundary(BaseNamedPolygon):
    NAME_FIELD = "HLTH_AUTHORITY_NAME"

    hlth_authority_id = models.CharField(max_length=32)
    hlth_authority_code = models.IntegerField(null=True)

    class Meta:
        ordering = ("id",)

    def __str__(self):
        return self.name
