from django.contrib.gis.db import models

from .bc_assessment import BaseBCAssessment


class BCAssessmentRegionalDistrict(BaseBCAssessment):
    ID_FIELD = 'BCA_SBCDU_SYSID'
    LINK_FIELD = 'CENSUS_DIVISION_ID'

    bca_sbcdu_sysid = models.CharField(max_length=128, null=True, blank=True)
    regional_district = models.ForeignKey(
        'RegionalDistrict', on_delete=models.DO_NOTHING
    )
    census_division_name = models.CharField(max_length=128, null=True, blank=True)

    class Meta:
        ordering = ("id",)

    def __str__(self):
        return self.name
