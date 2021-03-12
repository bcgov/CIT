from django.contrib.gis.db import models
from django.utils import timezone

from .approval_status import ApprovalStatus
from .community import Community
from .indian_reserve_band_name import IndianReserveBandName
from .lake import Lake
from .land_use_zoning import LandUseZoning
from .location_assets import Location, Airport, PortAndTerminal, CustomsPortOfEntry, Hospital, FirstResponder, ResearchCentre
from .general import Municipality
from .preferred_development import PreferredDevelopment
from .property_status import PropertyStatus
from .railway import Railway
from .river import River
from .roads_and_highways import RoadsAndHighways
from pipeline.constants import BC_ALBERS_SRID

# Choices used for parcel infrastructure connections
ACCESS_CHOICES = (("Y", "Yes"), ("N", "No"), ("U", "Unknown"))

class CommunityDistance(Community):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class MunicipalityDistance(Municipality):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class IndianReserveBandDistance(IndianReserveBandName):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class LakeDistance(Lake):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class RiverDistance(River):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

    
class RoadsAndHighwaysDistance(RoadsAndHighways):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class AirportDistance(Airport):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class RailwayDistance(Railway):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class PortAndTerminalDistance(PortAndTerminal):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class CustomsPortOfEntryDistance(CustomsPortOfEntry):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class ResearchCentreDistance(ResearchCentre):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)
    
class FirstResponderDistance(FirstResponder):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

class HospitalDistance(Hospital):
    distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)

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

    # Site Info Relationships
    land_use_zoning = models.ForeignKey(LandUseZoning, related_name="current", on_delete=models.SET_NULL, db_column="land_use_zoning", null=True)
    ocp_zoning_code = models.ForeignKey(LandUseZoning, related_name="future",  on_delete=models.SET_NULL, db_column="ocp_zoning_code", null=True)
    opportunity_preferred_development = models.ManyToManyField(PreferredDevelopment, db_column="opportunity_preferred_development", null=True)
    opportunity_property_status = models.ForeignKey(PropertyStatus, on_delete=models.SET_NULL, db_column="opportunity_property_status", null=True)
    
    # Proximity Relationships
    # - Community
    community_id = models.ForeignKey(CommunityDistance, on_delete=models.SET_NULL, db_column="community_id", null=True)
    nearest_municipalities = models.ManyToManyField(MunicipalityDistance, db_column="nearest_municipalities", null=True)
    nearest_first_nations = models.ManyToManyField(IndianReserveBandDistance, db_column="nearest_first_nations", null=True)

    # - Water
    nearest_lake = models.ForeignKey(LakeDistance, on_delete=models.SET_NULL, db_column="nearest_lake", null=True)
    nearest_river = models.ForeignKey(RiverDistance, on_delete=models.SET_NULL, db_column="nearest_river", null=True)
    
    # - Assets
    nearest_highway = models.ForeignKey(RoadsAndHighwaysDistance, on_delete=models.SET_NULL, db_column="nearest_highway", null=True)
    nearest_airport = models.ForeignKey(AirportDistance, on_delete=models.SET_NULL, db_column="nearest_airport", null=True)
    nearest_railway = models.ForeignKey(RailwayDistance, on_delete=models.SET_NULL, db_column="nearest_railway", null=True)
    nearest_port = models.ForeignKey(PortAndTerminalDistance, on_delete=models.SET_NULL, db_column="nearest_port", null=True)
    nearest_customs_port_of_entry = models.ForeignKey(CustomsPortOfEntryDistance, on_delete=models.SET_NULL, db_column="nearest_customs_port_of_entry", null=True)
    nearest_research_center = models.ForeignKey(ResearchCentreDistance, related_name="research_center", on_delete=models.SET_NULL, db_column="nearest_research_center", null=True)
    nearest_health_center = models.ForeignKey(HospitalDistance, on_delete=models.SET_NULL, db_column="nearest_health_center", null=True)
    # nearest_transmission_line = models.ForeignKey(Location, on_delete=models.SET_NULL, db_column="nearest_transmission_line", null=True)
    nearest_fire_station = models.ForeignKey(FirstResponderDistance, related_name="fire_station", on_delete=models.SET_NULL, db_column="nearest_fire_station", null=True)
    nearest_police_station = models.ForeignKey(FirstResponderDistance, related_name="police_station", on_delete=models.SET_NULL, db_column="nearest_police_station", null=True)
    nearest_ambulance_station = models.ForeignKey(FirstResponderDistance, related_name="ambulance_station", on_delete=models.SET_NULL, db_column="nearest_ambulance_station", null=True)
    nearest_coast_guard_station = models.ForeignKey(FirstResponderDistance, related_name="coast_guard_station", on_delete=models.SET_NULL, db_column="nearest_coast_guard_station", null=True)
    nearest_post_secondary = models.ForeignKey(ResearchCentreDistance, related_name="post_secondary", on_delete=models.SET_NULL, db_column="nearest_post_secondary", null=True)

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
