from django.contrib.gis.db import models
from django.contrib.gis.db.models import MultiPolygonField
from django.contrib.gis.geos import Point

from pipeline.constants import WGS84_SRID

from .cen_prof_detailed_csd_attrs_sp import CEN_PROF_DETAILED_CSD_ATTRS_SP


class CSDCoreHousingNeed(models.Model):
    LINK_FIELD = "CENSUS_SUBDIVISION_ID"
    census_subdivision_id = models.IntegerField(
        primary_key=True, null=False, blank=False
    )

    core_housing_examined = models.IntegerField(null=True)
    core_housing_need = models.IntegerField(null=True)

    # pre-processed calculation
    core_housing_need_percentage = models.FloatField(null=True)

    class Meta:
        ordering = ("census_subdivision_id",)

    def __repr__(self) -> str:
        return (
            f"<CSDCoreHousingNeed({0},{1},{2},{3})",
            self.census_subdivision_id,
            self.core_housing_examined,
            self.core_housing_need,
            self.core_housing_need_percentage,
        )
