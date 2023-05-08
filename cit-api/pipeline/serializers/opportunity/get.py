from rest_framework import serializers
import json
from django.db.models import F
from django.contrib.gis.measure import D
from pipeline.models.location_assets import Airport
from pipeline.models.community import Community
from pipeline.models.general import Municipality
from pipeline.models.indian_reserve_band_name import IndianReserveBandName
from pipeline.models.location_assets import PortAndTerminal, CustomsPortOfEntry
from pipeline.models.roads_and_highways import RoadsAndHighways
from django.contrib.gis.db.models.functions import Distance
from pipeline.models.opportunity import Opportunity
from pipeline.models.preferred_development import PreferredDevelopment
from pipeline.models.railway import Railway
from pipeline.serializers.opportunity.distance import (
    OpportunityCommunitySerializer, OpportunityPostSecondarySerializer,
    OpportunityFirstResponderSerializer, OpportunityHospitalSerializer, OpportunityCustomsPortOfEntrySerializer,
    OpportunityResearchCentreSerializer, OpportunityRiverSerializer, OpportunityLakeSerializer,
    OpportunityMunicipalitySerializer, OpportunityRegionalDistrictSerializer, OpportunityPortAndTerminalSerializer,
    OpportunityRailwaySerializer, OpportunityRoadsAndHighwaysSerializer, OpportunityAirportSerializer,
    OpportunityIndianReserveBandSerializer)


class OpportunityGetSerializer(serializers.ModelSerializer):
    opportunity_preferred_development = serializers.PrimaryKeyRelatedField(
        queryset=PreferredDevelopment.objects.all(), many=True, required=False)
    nearest_first_nations = OpportunityIndianReserveBandSerializer(many=True)
    nearest_municipalities = serializers.SerializerMethodField()
    nearest_community = OpportunityCommunitySerializer(required=False)
    nearest_post_secondary = OpportunityPostSecondarySerializer(required=False)
    nearest_coast_guard_station = OpportunityFirstResponderSerializer(required=False)
    nearest_ambulance_station = OpportunityFirstResponderSerializer(required=False)
    nearest_police_station = OpportunityFirstResponderSerializer(required=False)
    nearest_fire_station = OpportunityFirstResponderSerializer(required=False)
    nearest_health_center = OpportunityHospitalSerializer(required=False)
    nearest_research_centre = OpportunityResearchCentreSerializer(required=False)
    nearest_customs_port_of_entry = OpportunityCustomsPortOfEntrySerializer(required=False)
    nearest_port = OpportunityPortAndTerminalSerializer(required=False)
    nearest_railway = OpportunityRailwaySerializer(required=False)
    nearest_airport = OpportunityAirportSerializer(required=False)
    nearest_highway = OpportunityRoadsAndHighwaysSerializer(required=False)
    nearest_river = OpportunityRiverSerializer(required=False)
    nearest_lake = OpportunityLakeSerializer(required=False)
    municipality = OpportunityMunicipalitySerializer(required=False)
    regional_district = OpportunityRegionalDistrictSerializer(required=False)

    class Meta:
        model = Opportunity
        fields = (
            "id",
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
            "regional_district_id",
            "parcel_ownership",
            "parcel_size",
            "pid",
            "user_id",
            "parcel_geometry",
            "elevation_at_location",
            "soil_name",
            "soil_texture",
            "soil_drainage",
            "opportunity_sale_price",
            "opportunity_rental_price",
            "opportunity_road_connected",
            "opportunity_water_connected",
            "opportunity_water_capacity",
            "opportunity_sewer_connected",
            "opportunity_sewer_capacity",
            "opportunity_natural_gas_connected",
            "opportunity_natural_gas_capacity",
            "opportunity_electrical_connected",
            "opportunity_electrical_capacity",
            "private_note",
            "public_note",
            "last_admin",
            "land_use_zoning",
            "ocp_zoning_code",
            "opportunity_property_status",
            "opportunity_preferred_development",
            "opportunity_preferred_development_v2",
            "nearest_port",
            "nearest_airport",
            "nearest_research_centre",
            "nearest_customs_port_of_entry",
            "nearest_transmission_line",
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
            "nearest_post_secondary",
            "nearest_community",
            "network_at_road",
            "network_avg",
            "municipality",
            "regional_district",
        )

    def get_nearest_municipalities(self, instance):
        index = 0
        nearest_municipalities = list(instance.nearest_municipalities.all().values())
        for municipality in nearest_municipalities:
            nearest_municipalities[index]['municipality_name'] = Municipality.objects.get(
                id=municipality['municipality_id_id']).name
            community_queryset = Community.objects.filter(
                municipality_id=municipality['municipality_id_id']).annotate(
                    count=F('census_subdivision__pop_total_2016'))
            nearest_municipalities[index]['municipality_population'] = 0
            if len(community_queryset):
                nearest_municipalities[index][
                    'municipality_population'] = community_queryset.values()[0]['count']
            index += 1
        return nearest_municipalities
