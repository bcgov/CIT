from django.contrib.gis.db import models

from .approval_status import ApprovalStatus

class Opportunity(models.Model):
    address = models.CharField(max_length=255, null=False)
    point = models.PointField(srid=4326, null=False, blank=False)
    approval_status = models.ForeignKey(ApprovalStatus, default=1, on_delete=models.CASCADE)
