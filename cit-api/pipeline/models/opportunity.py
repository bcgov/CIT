from django.contrib.gis.db import models
from django.utils import timezone

from .approval_status import ApprovalStatus
from .land_use_zoning import LandUseZoning
from .preferred_development import PreferredDevelopment
from .property_status import PropertyStatus
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
    date_published = models.DateTimeField(auto_now=False, blank=True, null=True)
    private_note = models.TextField(blank=True, null=True)
    public_note = models.TextField(blank=True, null=True)
    last_admin = models.TextField(blank=True, null=True)
    deleted = models.BooleanField(
        default=False,
        help_text="This is for soft deletes",
    )
    # Site Info
    opportunity_address = models.CharField(max_length=255, null=False)
    opportunity_name = models.TextField(blank=False, null=True)
    business_contact_name = models.TextField(blank=True, null=True)
    business_contact_email = models.TextField(blank=True, null=True)
    opportunity_description = models.TextField(blank=True, null=True)
    environmental_information = models.TextField(blank=True, null=True)
    opportunity_link = models.TextField(blank=True, null=True)
    community_link = models.TextField(blank=True, null=True)

    land_use_zoning = models.ForeignKey(LandUseZoning, related_name="current", on_delete=models.SET_NULL, db_column="land_use_zoning", null=True)
    ocp_zoning_code = models.ForeignKey(LandUseZoning, related_name="future",  on_delete=models.SET_NULL, db_column="ocp_zoning_code", null=True)
    opportunity_preferred_development = models.ManyToManyField(PreferredDevelopment, db_column="opportunity_preferred_development", null=True)
    opportunity_property_status = models.ForeignKey(PropertyStatus, on_delete=models.SET_NULL, db_column="opportunity_property_status", null=True)
    
    # Parcel
    parcel_ownership = models.TextField(blank=True, null=True)
    parcel_size = models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    pid = models.TextField(blank=True, null=True)
    parcel_geometry = models.PolygonField(srid=BC_ALBERS_SRID, null=True)
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
