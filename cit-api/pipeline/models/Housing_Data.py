from attr import fields
from django.contrib.gis.db import models


class Housing_Data(models.Model):
    census_subdivision_id	 = models.IntegerField(null=False, blank=False)
    YearMonth = models.CharField(max_length=127,null=True)
    year = models.IntegerField(null=True)
    Month = models.IntegerField(null=True)
    Total_Building_Permits = models.DecimalField(max_digits=16, decimal_places=4, null=True)
    

    class Meta:
        ordering = ("id", )
        managed = True
        constraints = [models.UniqueConstraint(fields = ['census_subdivision_id','Month','year'],name = 'Primary Key Constraint')]

    def __str__(self):
        return self.name
