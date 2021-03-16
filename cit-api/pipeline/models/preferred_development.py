from django.contrib.gis.db import models


class PreferredDevelopment(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255, null=False, primary_key=True)
    description = models.CharField(max_length=255, null=True)

    class Meta:
        ordering = ("pk", )

    def __str__(self):
        return self.name
