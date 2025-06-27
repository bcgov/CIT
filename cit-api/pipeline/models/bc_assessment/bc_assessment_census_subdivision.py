from django.contrib.gis.db import models

from .bc_assessment import BaseBCAssessment


class BCAssessmentCensusSubdivision(BaseBCAssessment):
    ID_FIELD = 'BCA_SBCSDU_SYSID'
    LINK_FIELD = 'CENSUS_SUBDIVISION_ID'

    bca_sbcsdu_sysid = models.CharField(max_length=128, null=True, blank=True)
    census_subdivision = models.ForeignKey(
        'CEN_PROF_DETAILED_CSD_ATTRS_SP', on_delete=models.DO_NOTHING
    )
    census_division_name = models.CharField(max_length=128, null=True, blank=True)

    class Meta:
        ordering = ("id",)

    def __str__(self):
        return self.name
