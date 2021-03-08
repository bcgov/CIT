from django.contrib.gis.db import models
from django.utils import timezone

from .approval_status import ApprovalStatus
from pipeline.constants import BC_ALBERS_SRID

# Choices used for parcel infrastructure connections
ACCESS_CHOICES = (("Y", "Yes"), ("N", "No"), ("U", "Unknown"))


class Opportunity(models.Model):
    # Workflow Info
    approval_status = models.ForeignKey(ApprovalStatus,
                                        default="PEND",
                                        to_field="status_code",
                                        on_delete=models.PROTECT)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)
    # Site Info
    opportunity_address = models.CharField(max_length=255, null=False)
    opportunity_name = models.TextField(blank=False, null=True)
    business_contact_name = models.TextField(blank=True, null=True)
    business_contact_email = models.TextField(blank=True, null=True)
    opportunity_description = models.TextField(blank=True, null=True)
    environmental_information = models.TextField(blank=True, null=True)
    opportunity_link = models.TextField(blank=True, null=True)
    community_link = models.TextField(blank=True, null=True)
    # TODO: More tables needed
    # land_use_zoning = models.TextField(blank=True, null=True) -- needs to be FK
    # ocp_zoning_code = models.TextField(blank=True, null=True) -- needs to be FK
    # opportunity_preferred_development = models.TextField(blank=True, null=True) -- needs to be FK
    # opportunity_land_status = models.TextField(blank=True, null=True) -- needs to be FK
    # Parcel
    parcel_ownership = models.TextField(blank=True, null=True)
    parcel_size = models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    pid = models.TextField(blank=True, null=True)
    parcel_geometry = models.MultiPolygonField(srid=BC_ALBERS_SRID, null=True)
    # Physical
    geo_position = models.PointField(srid=BC_ALBERS_SRID, null=False, blank=False)
    elevation_at_location = models.DecimalField(max_digits=7,
                                                decimal_places=3,
                                                blank=True,
                                                null=True)
    soil_name = models.TextField(blank=True, null=True)
    soil_texture = models.TextField(blank=True, null=True)
    soil_drainage = models.TextField(blank=True, null=True)
    # Services
    # Road
    opportunity_road_connected = models.CharField(blank=True,
                                                  null=True,
                                                  max_length=1,
                                                  choices=ACCESS_CHOICES)
    # Water
    opportunity_water_connected = models.CharField(blank=True,
                                                   null=True,
                                                   max_length=1,
                                                   choices=ACCESS_CHOICES)
    opportunity_water_capacity = models.DecimalField(max_digits=7,
                                                     decimal_places=3,
                                                     blank=True,
                                                     null=True)
    # Sewer
    opportunity_sewer_connected = models.CharField(blank=True,
                                                   null=True,
                                                   max_length=1,
                                                   choices=ACCESS_CHOICES)
    opportunity_sewer_capacity = models.DecimalField(max_digits=7,
                                                     decimal_places=3,
                                                     blank=True,
                                                     null=True)
    # Natural Gase
    opportunity_natual_gas_connected = models.CharField(blank=True,
                                                        null=True,
                                                        max_length=1,
                                                        choices=ACCESS_CHOICES)
    opportunity_natual_gas_capacity = models.DecimalField(max_digits=7,
                                                          decimal_places=3,
                                                          blank=True,
                                                          null=True)
    # Electric
    opportunity_electrical_connected = models.CharField(blank=True,
                                                        null=True,
                                                        max_length=1,
                                                        choices=ACCESS_CHOICES)
    opportunity_electrical_capacity = models.DecimalField(max_digits=7,
                                                          decimal_places=3,
                                                          blank=True,
                                                          null=True)
