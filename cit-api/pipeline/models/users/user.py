from django.contrib.gis.db import models


class Assignments(models.Model):
    """
    Assignments of a user to a community
    """
    user = models.ForeignKey(
        'User', on_delete=models.CASCADE, blank=False, null=False)
    regional_district = models.ForeignKey(
        'RegionalDistrict', on_delete=models.CASCADE, blank=True, null=True)
    municipality = models.ForeignKey(
        'Municipality', on_delete=models.CASCADE, blank=True, null=True)


class User(models.Model):
    """
    User model to attach info to assignments to communities
    """
    name = models.CharField(max_length=255, blank=False, null=False)
    email = models.CharField(max_length=255, blank=False, null=False)
    role = models.CharField(max_length=255, blank=False, null=False)
    deleted = models.BooleanField(default=False, help_text="This is for soft deletes")
    date_created = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)

