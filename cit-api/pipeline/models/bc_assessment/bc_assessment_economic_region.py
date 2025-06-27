from django.contrib.gis.db import models

from .bc_assessment import BaseBCAssessment


class BCAssessmentEconomicRegion(BaseBCAssessment):
    ID_FIELD = 'BCA_SBERU_SYSID'
    LINK_FIELD = 'CENSUS_ECONOMIC_REGION_ID'

    bca_sberu_sysid = models.CharField(max_length=128, null=True, blank=True)
    economic_region = models.ForeignKey(
        'CensusEconomicRegion', on_delete=models.DO_NOTHING
    )

    class Meta:
        ordering = ("id",)

    def __str__(self):
        return self.name
