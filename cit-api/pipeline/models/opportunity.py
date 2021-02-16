from django.contrib.gis.db import models
from django.utils import timezone

from .approval_status import ApprovalStatus

class Opportunity(models.Model):
    address = models.CharField(max_length=255, null=False)
    point = models.PointField(srid=4326, null=False, blank=False)
    approval_status = models.ForeignKey(ApprovalStatus, default="PEND", to_field="status_code", on_delete=models.PROTECT)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)