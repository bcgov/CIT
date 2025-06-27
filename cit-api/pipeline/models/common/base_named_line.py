from django.contrib.gis.db import models

from .base_line_geom import BaseLineGeom


class BaseNamedLine(BaseLineGeom):
    name = models.CharField(max_length=127)

    class Meta:
        abstract = True
