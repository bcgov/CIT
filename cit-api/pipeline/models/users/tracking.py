from django.contrib.gis.db import models


class UserTracking(models.Model):
  user = models.ForeignKey(
    'User', on_delete=models.DO_NOTHING, blank=False, null=False)
  report_url = models.CharField(max_length=2048, blank=False, null=False)
  date_viewed = models.DateTimeField(auto_now=True)
