from django.contrib.gis.db import models

from .base_geom_model import BaseGeomModel

class BaseNamedLocation(BaseGeomModel):
    name = models.CharField(max_length=127)

    class Meta:
        abstract = True