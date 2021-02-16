from django.contrib.gis.db import models

class ApprovalStatus(models.Model):
    status_name = models.CharField(max_length=255, null=False)
    status_description = models.CharField(max_length=255, null=False)
    status_code = models.CharField(max_length=255, null=False, primary_key=True)
    active_status = models.BooleanField(default=True)
    