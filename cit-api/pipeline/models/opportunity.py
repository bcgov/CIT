from django.contrib.gis.db import models
from django.utils import timezone

from .approval_status import ApprovalStatus
from .community import Community
from .indian_reserve_band_name import IndianReserveBandName
from .lake import Lake
from .land_use_zoning import LandUseZoning
from .location_assets import Location, Airport, PortAndTerminal, CustomsPortOfEntry, Hospital, FirstResponder, ResearchCentre
from .general import Municipality, RegionalDistrict
from .preferred_development import PreferredDevelopment
from .property_status import PropertyStatus
from .railway import Railway
from .river import River
from .roads_and_highways import RoadsAndHighways
from pipeline.constants import WGS84_SRID

# Choices used for parcel infrastructure connections
ACCESS_CHOICES = (("Y", "Yes"), ("N", "No"), ("U", "Unknown"))


class PostSecondaryDistance(models.Model):
    location_id = models.ForeignKey(Location,
                                    on_delete=models.SET_NULL,
                                    db_column="location_id",
                                    null=True)
    location_distance = models.DecimalField(max_digits=16,
                                            decimal_places=4,
                                            blank=False,
                                            null=False)


class CommunityDistance(models.Model):
    community_id = models.ForeignKey(Community,
                                     on_delete=models.SET_NULL,
                                     db_column="community_id",
                                     null=True)
    community_distance = models.DecimalField(max_digits=16,
                                             decimal_places=4,
                                             blank=False,
                                             null=False)


class MunicipalityDistance(models.Model):
    municipality_id = models.ForeignKey(Municipality,
                                        on_delete=models.SET_NULL,
                                        db_column="municipality_id",
                                        null=True)
    municipality_distance = models.DecimalField(max_digits=16,
                                                decimal_places=4,
                                                blank=False,
                                                null=False)


class IndianReserveBandDistance(models.Model):
    reserve_id = models.ForeignKey(IndianReserveBandName,
                                   on_delete=models.SET_NULL,
                                   db_column="reserve_id",
                                   null=True)
    reserve_distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)


class LakeDistance(models.Model):
    lake_id = models.ForeignKey(Lake, on_delete=models.SET_NULL, db_column="lake_id", null=True)
    lake_distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)


class RiverDistance(models.Model):
    river_id = models.ForeignKey(River, on_delete=models.SET_NULL, db_column="river_id", null=True)
    river_distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)


class RoadsAndHighwaysDistance(models.Model):
    highway_id = models.ForeignKey(RoadsAndHighways,
                                   on_delete=models.SET_NULL,
                                   db_column="highway_id",
                                   null=True)
    highway_distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)


class AirportDistance(models.Model):
    airport_id = models.ForeignKey(Airport,
                                   on_delete=models.SET_NULL,
                                   db_column="airport_id",
                                   null=True)
    airport_distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)


class RailwayDistance(models.Model):
    railway_id = models.ForeignKey(Railway,
                                   on_delete=models.SET_NULL,
                                   db_column="railway_id",
                                   null=True)
    railway_distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)


class PortAndTerminalDistance(models.Model):
    port_id = models.ForeignKey(PortAndTerminal,
                                on_delete=models.SET_NULL,
                                db_column="port_id",
                                null=True)
    port_distance = models.DecimalField(max_digits=16, decimal_places=4, blank=False, null=False)


class CustomsPortOfEntryDistance(models.Model):
    customs_port_id = models.ForeignKey(CustomsPortOfEntry,
                                        on_delete=models.SET_NULL,
                                        db_column="port_id",
                                        null=True)
    customs_port_distance = models.DecimalField(max_digits=16,
                                                decimal_places=4,
                                                blank=False,
                                                null=False)


class ResearchCentreDistance(models.Model):
    research_centre_id = models.ForeignKey(ResearchCentre,
                                           on_delete=models.SET_NULL,
                                           db_column="research_centre_id",
                                           null=True)
    research_centre_distance = models.DecimalField(max_digits=16,
                                                   decimal_places=4,
                                                   blank=False,
                                                   null=False)


class FirstResponderDistance(models.Model):
    first_responder_id = models.ForeignKey(FirstResponder,
                                           on_delete=models.SET_NULL,
                                           db_column="first_responder_id",
                                           null=True)
    first_responder_distance = models.DecimalField(max_digits=16,
                                                   decimal_places=4,
                                                   blank=False,
                                                   null=False)


class HospitalDistance(models.Model):
    hospital_id = models.ForeignKey(Hospital,
                                    on_delete=models.SET_NULL,
                                    db_column="hospital_id",
                                    null=True)
    hospital_distance = models.DecimalField(max_digits=16,
                                            decimal_places=4,
                                            blank=False,
                                            null=False)


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
    user = models.ForeignKey('User', on_delete=models.PROTECT, blank=False, null=False)
    deleted = models.BooleanField(
        default=False,
        help_text="This is for soft deletes",
    )
    # Site Info
    opportunity_address = models.CharField(max_length=255, null=True, blank=True)
    opportunity_name = models.TextField(blank=True, null=True)
    opportunity_rental_price = models.DecimalField(max_digits=15,
                                                   decimal_places=2,
                                                   blank=True,
                                                   null=True)
    opportunity_sale_price = models.DecimalField(max_digits=15,
                                                 decimal_places=2,
                                                 blank=True,
                                                 null=True)
    business_contact_name = models.TextField(blank=True, null=True)
    business_contact_email = models.TextField(blank=True, null=True)
    opportunity_description = models.TextField(blank=True, null=True)
    environmental_information = models.TextField(blank=True, null=True)
    opportunity_link = models.TextField(blank=True, null=True)
    community_link = models.TextField(blank=True, null=True)
    network_at_road = models.CharField(max_length=32, blank=True, null=True)
    network_avg = models.CharField(max_length=32, blank=True, null=True)

    # Site Info Relationships
    land_use_zoning = models.ForeignKey(LandUseZoning,
                                        related_name="current",
                                        on_delete=models.SET_NULL,
                                        db_column="land_use_zoning",
                                        null=True)
    ocp_zoning_code = models.ForeignKey(LandUseZoning,
                                        related_name="future",
                                        on_delete=models.SET_NULL,
                                        db_column="ocp_zoning_code",
                                        null=True)
    opportunity_preferred_development = models.ManyToManyField(
        PreferredDevelopment, db_column="opportunity_preferred_development", null=True)
    opportunity_property_status = models.ForeignKey(PropertyStatus,
                                                    on_delete=models.SET_NULL,
                                                    db_column="opportunity_property_status",
                                                    null=True)

    # Proximity Relationships
    # - Community
    regional_district = models.ForeignKey('RegionalDistrict',
                                          on_delete=models.SET_NULL,
                                          blank=True,
                                          null=True)
    municipality = models.ForeignKey('Municipality',
                                     on_delete=models.SET_NULL,
                                     blank=True,
                                     null=True)
    nearest_community = models.ForeignKey(CommunityDistance,
                                          on_delete=models.SET_NULL,
                                          db_column="nearest_community",
                                          blank=True,
                                          null=True)
    nearest_municipalities = models.ManyToManyField(MunicipalityDistance,
                                                    db_column="nearest_municipalities",
                                                    blank=True,
                                                    null=True)
    nearest_first_nations = models.ManyToManyField(IndianReserveBandDistance,
                                                   db_column="nearest_first_nations",
                                                   blank=True,
                                                   null=True)

    # - Water
    nearest_lake = models.ForeignKey(LakeDistance,
                                     on_delete=models.SET_NULL,
                                     db_column="nearest_lake",
                                     blank=True,
                                     null=True)
    nearest_river = models.ForeignKey(RiverDistance,
                                      on_delete=models.SET_NULL,
                                      db_column="nearest_river",
                                      blank=True,
                                      null=True)

    # - Assets
    nearest_highway = models.ForeignKey(RoadsAndHighwaysDistance,
                                        on_delete=models.SET_NULL,
                                        db_column="nearest_highway",
                                        blank=True,
                                        null=True)
    nearest_airport = models.ForeignKey(AirportDistance,
                                        on_delete=models.SET_NULL,
                                        db_column="nearest_airport",
                                        blank=True,
                                        null=True)
    nearest_railway = models.ForeignKey(RailwayDistance,
                                        on_delete=models.SET_NULL,
                                        db_column="nearest_railway",
                                        blank=True,
                                        null=True)
    nearest_port = models.ForeignKey(PortAndTerminalDistance,
                                     on_delete=models.SET_NULL,
                                     db_column="nearest_port",
                                     blank=True,
                                     null=True)
    nearest_customs_port_of_entry = models.ForeignKey(CustomsPortOfEntryDistance,
                                                      on_delete=models.SET_NULL,
                                                      db_column="nearest_customs_port_of_entry",
                                                      blank=True,
                                                      null=True)
    nearest_research_centre = models.ForeignKey(ResearchCentreDistance,
                                                related_name="research_centre",
                                                on_delete=models.SET_NULL,
                                                db_column="nearest_research_centre",
                                                blank=True,
                                                null=True)
    nearest_health_center = models.ForeignKey(HospitalDistance,
                                              on_delete=models.SET_NULL,
                                              db_column="nearest_health_center",
                                              blank=True,
                                              null=True)
    nearest_transmission_line = models.DecimalField(max_digits=16,
                                                    decimal_places=4,
                                                    blank=False,
                                                    null=True)
    nearest_fire_station = models.ForeignKey(FirstResponderDistance,
                                             related_name="fire_station",
                                             on_delete=models.SET_NULL,
                                             db_column="nearest_fire_station",
                                             blank=True,
                                             null=True)
    nearest_police_station = models.ForeignKey(FirstResponderDistance,
                                               related_name="police_station",
                                               on_delete=models.SET_NULL,
                                               db_column="nearest_police_station",
                                               blank=True,
                                               null=True)
    nearest_ambulance_station = models.ForeignKey(FirstResponderDistance,
                                                  related_name="ambulance_station",
                                                  on_delete=models.SET_NULL,
                                                  db_column="nearest_ambulance_station",
                                                  blank=True,
                                                  null=True)
    nearest_coast_guard_station = models.ForeignKey(FirstResponderDistance,
                                                    related_name="coast_guard_station",
                                                    on_delete=models.SET_NULL,
                                                    db_column="nearest_coast_guard_station",
                                                    blank=True,
                                                    null=True)
    nearest_post_secondary = models.ForeignKey(PostSecondaryDistance,
                                               related_name="post_secondary",
                                               on_delete=models.SET_NULL,
                                               db_column="nearest_post_secondary",
                                               blank=True,
                                               null=True)

    # Parcel
    parcel_ownership = models.TextField(blank=True, null=True)
    parcel_size = models.DecimalField(max_digits=15, decimal_places=3, blank=True, null=True)
    pid = models.TextField(blank=True, null=True)
    parcel_geometry = models.PolygonField(srid=WGS84_SRID, null=True)
    # Physical
    geo_position = models.PointField(srid=WGS84_SRID, null=False, blank=False)
    elevation_at_location = models.DecimalField(max_digits=7,
                                                decimal_places=3,
                                                blank=True,
                                                null=True)
    soil_name = models.TextField(blank=True, null=True)
    soil_texture = models.TextField(blank=True, null=True)
    soil_drainage = models.TextField(blank=True, null=True)
    # Services
    # Road
    opportunity_road_connected = models.CharField(blank=False,
                                                  null=False,
                                                  default="U",
                                                  max_length=1,
                                                  choices=ACCESS_CHOICES)
    # Water
    opportunity_water_connected = models.CharField(blank=False,
                                                   null=False,
                                                   default="U",
                                                   max_length=1,
                                                   choices=ACCESS_CHOICES)
    opportunity_water_capacity = models.DecimalField(max_digits=7,
                                                     decimal_places=3,
                                                     blank=True,
                                                     null=True)
    # Sewer
    opportunity_sewer_connected = models.CharField(blank=False,
                                                   null=False,
                                                   default="U",
                                                   max_length=1,
                                                   choices=ACCESS_CHOICES)
    opportunity_sewer_capacity = models.DecimalField(max_digits=7,
                                                     decimal_places=3,
                                                     blank=True,
                                                     null=True)
    # Natural Gase
    opportunity_natural_gas_connected = models.CharField(blank=False,
                                                         null=False,
                                                         default="U",
                                                         max_length=1,
                                                         choices=ACCESS_CHOICES)
    opportunity_natural_gas_capacity = models.DecimalField(max_digits=7,
                                                           decimal_places=3,
                                                           blank=True,
                                                           null=True)
    # Electric
    opportunity_electrical_connected = models.CharField(blank=False,
                                                        null=False,
                                                        default="U",
                                                        max_length=1,
                                                        choices=ACCESS_CHOICES)
    opportunity_electrical_capacity = models.DecimalField(max_digits=7,
                                                          decimal_places=3,
                                                          blank=True,
                                                          null=True)
