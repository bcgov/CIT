from django.contrib.gis.db import models


class Housing_Data(models.Model):
    census_subdivision_id	 = models.IntegerField(null=False, blank=False)
    census_subdivision_name = models.CharField(max_length=127)
    YearMonth = models.CharField(max_length=127,null=True)
    year = models.IntegerField(null=True)
    Month = models.CharField(max_length=30,null=True)
    Total_Building_Permits = models.DecimalField(max_digits=16, decimal_places=4, null=True)
    

    class Meta:
        ordering = ("id", )
        managed = True

    def __str__(self):
        return self.name
