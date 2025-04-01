from django.contrib.gis.db import models

from .common.base_named_location import BaseNamedLocation


class Lake(BaseNamedLocation):
    ID_FIELD = 'WATERBODY_POLY_ID'
    NAME_FIELD = 'GNIS_NAME_1'

    class Meta:
        ordering = ("id", )

    def __str__(self):
        return self.name
