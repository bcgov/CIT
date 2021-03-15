from rest_framework import serializers
from pipeline.models.preferred_development import PreferredDevelopment
from pipeline.models.general import Municipality
from pipeline.models.indian_reserve_band_name import IndianReserveBandName

from pipeline.models.opportunity import Opportunity, PostSecondaryDistance, CommunityDistance, MunicipalityDistance, IndianReserveBandDistance, LakeDistance, RiverDistance, RoadsAndHighwaysDistance, AirportDistance, RailwayDistance, PortAndTerminalDistance, CustomsPortOfEntryDistance, ResearchCentreDistance, FirstResponderDistance, HospitalDistance

class PostSecondarySerializer(serializers.ModelSerializer):
    class Meta:
        model=PostSecondaryDistance
        fields=('location_id', 'location_distance')

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model=CommunityDistance
        fields=('community_id', 'community_distance')

class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model=MunicipalityDistance
        fields=('municipality_id', 'municipality_distance')
class IndianReserveBandSerializer(serializers.ModelSerializer):
    class Meta:
        model=IndianReserveBandDistance
        fields=('reserve_id', 'reserve_distance')

class LakeSerializer(serializers.ModelSerializer):
    class Meta:
        model=LakeDistance
        fields=('lake_id', 'lake_distance')

class RiverSerializer(serializers.ModelSerializer):
    class Meta:
        model=RiverDistance
        fields=('river_id', 'river_distance')

class RoadsAndHighwaysSerializer(serializers.ModelSerializer):
    class Meta:
        model=RoadsAndHighwaysDistance
        fields=('highway_id', 'highway_distance')
class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model=AirportDistance
        fields=('airport_id', 'airport_distance')

class RailwaySerializer(serializers.ModelSerializer):
    class Meta:
        model=RailwayDistance
        fields=('railway_id', 'railway_distance')

class PortAndTerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model=PortAndTerminalDistance
        fields=('port_id', 'port_distance')

class CustomsPortOfEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomsPortOfEntryDistance
        fields=('customs_port_id', 'customs_port_distance')

class ResearchCentreSerializer(serializers.ModelSerializer):
    class Meta:
        model=ResearchCentreDistance
        fields=('research_centre_id', 'research_centre_distance')
 
class FirstResponderSerializer(serializers.ModelSerializer):
    class Meta:
        model=FirstResponderDistance
        fields=('first_responder_id', 'first_responder_distance')

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model=HospitalDistance
        fields=('hospital_id', 'hospital_distance')


class OpportunitySerializer(serializers.ModelSerializer):
    opportunity_preferred_development = serializers.PrimaryKeyRelatedField(queryset=PreferredDevelopment.objects.all(), many=True)
    nearest_first_nations = serializers.PrimaryKeyRelatedField(queryset=IndianReserveBandName.objects.all(), many=True)
    nearest_municipalities = serializers.PrimaryKeyRelatedField(queryset=Municipality.objects.all(), many=True)
    nearest_community = CommunitySerializer(required=False)
    nearest_post_secondary = PostSecondarySerializer(required=False)
    nearest_coast_guard_station = FirstResponderSerializer(required=False)
    nearest_ambulance_station = FirstResponderSerializer(required=False) 
    nearest_police_station = FirstResponderSerializer(required=False)
    nearest_fire_station = FirstResponderSerializer(required=False)
    nearest_health_center = HospitalSerializer(required=False)
    nearest_research_centre = ResearchCentreSerializer(required=False)
    nearest_customs_port_of_entry = CustomsPortOfEntrySerializer(required=False)
    nearest_port = PortAndTerminalSerializer(required=False)
    nearest_railway = RailwaySerializer(required=False)
    nearest_airport = AirportSerializer(required=False)
    nearest_highway = RoadsAndHighwaysSerializer(required=False)
    nearest_river = RiverSerializer(required=False)
    nearest_lake = LakeSerializer(required=False)

    class Meta:
        model = Opportunity
        fields = (
            "id",
            "deleted",
            "opportunity_address",
            "opportunity_name",
            "geo_position",
            "approval_status",
            "date_created",
            "date_updated",
            "date_published",
            "business_contact_name",
            "business_contact_email",
            "opportunity_description",
            "environmental_information",
            "opportunity_link",
            "community_link",
            "community_id",
            "regional_district_id",
            "parcel_ownership",
            "parcel_size",
            "pid",
            "parcel_geometry",
            "elevation_at_location",
            "soil_name",
            "soil_texture",
            "soil_drainage",
            "opportunity_road_connected",
            "opportunity_water_connected",
            "opportunity_water_capacity",
            "opportunity_sewer_connected",
            "opportunity_sewer_capacity",
            "opportunity_natual_gas_connected",
            "opportunity_natual_gas_capacity",
            "opportunity_electrical_connected",
            "opportunity_electrical_capacity",
            "private_note",
            "public_note",
            "last_admin",
            "land_use_zoning",
            "ocp_zoning_code",
            "opportunity_property_status",
            "opportunity_preferred_development",
            "nearest_port",
            "nearest_airport",
            "nearest_research_centre",
            "nearest_customs_port_of_entry",
            "nearest_transmission_line",
            "nearest_post_secondary",
            "nearest_coast_guard_station",
            "nearest_ambulance_station",
            "nearest_police_station",
            "nearest_fire_station",
            "nearest_health_center",
            "nearest_railway",
            "nearest_highway",
            "nearest_river",
            "nearest_lake",
            "nearest_first_nations",
            "nearest_municipalities",
            "nearest_community"
        )
