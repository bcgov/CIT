from django.contrib.gis.db import models


class CSDSmallBusinesses(models.Model):
    census_subdivision_id = models.IntegerField(
        null=False, blank=False
    )  # census_subdivision_id
    csd_name = models.CharField(max_length=127)
    cd_name = models.CharField(max_length=127)
    dr_name = models.CharField(max_length=127)

    employ_0 = models.IntegerField(null=False)  # no active payroll
    employ_1_4 = models.IntegerField(null=False)
    employ_5_9 = models.IntegerField(null=False)
    employ_10_19 = models.IntegerField(null=False)
    employ_20_49 = models.IntegerField(null=False)
    employ_50_99 = models.IntegerField(null=False)
    employ_100_199 = models.IntegerField(null=False)
    employ_200_499 = models.IntegerField(null=False)
    employ_1000_1499 = models.IntegerField(null=False)
    employ_1500_2499 = models.IntegerField(null=False)
    employ_2500_4999 = models.IntegerField(null=False)
    employ_5000_more = models.IntegerField(null=False)
    subtotal_with_employ_gt_0 = models.IntegerField(null=False)
    grand_total = models.IntegerField(null=False)
