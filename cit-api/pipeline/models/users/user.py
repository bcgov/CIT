from django.contrib.gis.db import models

class Assignments(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, blank=False, null=False)
    regional_district = models.ForeignKey('RegionalDistrict', on_delete=models.CASCADE, blank=True, null=True)
    municipality = models.ForeignKey('Municipality', on_delete=models.CASCADE, blank=True, null=True)

class User(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    email = models.CharField(max_length=255, blank=False, null=False)
    date_created = models.DateTimeField(auto_now=True)
