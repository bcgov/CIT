from rest_framework import serializers
from pipeline.models.preferred_development import PreferredDevelopment

from pipeline.models.opportunity import Opportunity, CommunityDistance, MunicipalityDistance, IndianReserveBandDistance, LakeDistance, RiverDistance, RoadsAndHighwaysDistance, AirportDistance, RailwayDistance, PortAndTerminalDistance, CustomsPortOfEntryDistance, ResearchCentreDistance, FirstResponderDistance, HospitalDistance


class NearestPostSecondarySerializer(serializers.ModelSerializer):
    class Meta:
        model=ResearchCentreDistance
        fields=('research_centre_id', 'research_centre_distance')


class OpportunitySerializer(serializers.ModelSerializer):
    opportunity_preferred_development = serializers.PrimaryKeyRelatedField(queryset=PreferredDevelopment.objects.all(), many=True)
    nearest_post_secondary = NearestPostSecondarySerializer()
    nearest_coast_guard_station = serializers.PrimaryKeyRelatedField(queryset=FirstResponderDistance.objects.all(), many=False)
    nearest_ambulance_station = serializers.PrimaryKeyRelatedField(queryset=FirstResponderDistance.objects.all(), many=False)
    nearest_police_station = serializers.PrimaryKeyRelatedField(queryset=FirstResponderDistance.objects.all(), many=False)
    nearest_fire_station = serializers.PrimaryKeyRelatedField(queryset=FirstResponderDistance.objects.all(), many=False)
    nearest_health_center = serializers.PrimaryKeyRelatedField(queryset=HospitalDistance.objects.all(), many=False)
    nearest_research_center = NearestPostSecondarySerializer()
    nearest_customs_port_of_entry = serializers.PrimaryKeyRelatedField(queryset=CustomsPortOfEntryDistance.objects.all(), many=False)
    nearest_port = serializers.PrimaryKeyRelatedField(queryset=PortAndTerminalDistance.objects.all(), many=False)
    nearest_railway = serializers.PrimaryKeyRelatedField(queryset=RailwayDistance.objects.all(), many=False)
    nearest_airport = serializers.PrimaryKeyRelatedField(queryset=AirportDistance.objects.all(), many=False)
    nearest_highway = serializers.PrimaryKeyRelatedField(queryset=RoadsAndHighwaysDistance.objects.all(), many=False)
    nearest_river = serializers.PrimaryKeyRelatedField(queryset=RiverDistance.objects.all(), many=False)
    nearest_lake = serializers.PrimaryKeyRelatedField(queryset=LakeDistance.objects.all(), many=False)
    nearest_first_nations = serializers.PrimaryKeyRelatedField(queryset=IndianReserveBandDistance.objects.all(), many=True)
    nearest_municipalities = serializers.PrimaryKeyRelatedField(queryset=MunicipalityDistance.objects.all(), many=True)

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
            "nearest_research_center",
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
            "nearest_municipalities"
        )    