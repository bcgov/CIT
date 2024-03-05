from django.contrib.gis.db import models

xlsx_col_to_db_col = [
    "development_region",
    "regional_district",
    "municipality",
    "statistic_type",
    "jan_value",
    "feb_value",
    "mar_value",
    "apr_value",
    "may_value",
    "jun_value",
    "jul_value",
    "aug_value",
    "sep_value",
    "oct_value",
    "nov_value",
    "dec_value"
]  # ORDER MUST MATCH COLUMN ORDER

class MunicipalLandTitleTransfers(models.Model):
    development_region = models.CharField(max_length=255)
    regional_district = models.CharField(max_length=255, null=False, primary_key=True)
    municipality = models.CharField(max_length=255, null=True)
    statistic_type = models.CharField(max_length=255, null=True)
    year = models.IntegerField(null=False)
    #counts, means,medians, and percentages are all in this column
    #source file has `nr` (i assume 'not reported'), which is transformed to None.
    jan_value = models.FloatField(null=True) 
    feb_value = models.FloatField(null=True) 
    mar_value = models.FloatField(null=True) 
    apr_value = models.FloatField(null=True) 
    may_value = models.FloatField(null=True) 
    jun_value = models.FloatField(null=True) 
    jul_value = models.FloatField(null=True) 
    aug_value = models.FloatField(null=True) 
    sep_value = models.FloatField(null=True) 
    oct_value = models.FloatField(null=True) 
    nov_value = models.FloatField(null=True) 
    dec_value = models.FloatField(null=True) 

    def __str__(self):
        return f"{self.municipality}, {self.statistic_type}, {self.month}, {self.value}"