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
    OpportunityFirstResponderSerializer, OpportunityHospitalSerializer,
    OpportunityResearchCentreSerializer, OpportunityRiverSerializer, OpportunityLakeSerializer,
    OpportunityMunicipalitySerializer, OpportunityRegionalDistrictSerializer)


class OpportunityGetSerializer(serializers.ModelSerializer):
    opportunity_preferred_development = serializers.PrimaryKeyRelatedField(
        queryset=PreferredDevelopment.objects.all(), many=True, required=False)
    nearest_first_nations = serializers.SerializerMethodField()
    nearest_municipalities = serializers.SerializerMethodField()
    nearest_community = OpportunityCommunitySerializer(required=False)
    nearest_post_secondary = OpportunityPostSecondarySerializer(required=False)
    nearest_coast_guard_station = OpportunityFirstResponderSerializer(required=False)
    nearest_ambulance_station = OpportunityFirstResponderSerializer(required=False)
    nearest_police_station = OpportunityFirstResponderSerializer(required=False)
    nearest_fire_station = OpportunityFirstResponderSerializer(required=False)
    nearest_health_center = OpportunityHospitalSerializer(required=False)
    nearest_research_centre = OpportunityResearchCentreSerializer(required=False)
    nearest_customs_port_of_entry = serializers.SerializerMethodField()
    nearest_port = serializers.SerializerMethodField()
    nearest_railway = serializers.SerializerMethodField()
    nearest_airport = serializers.SerializerMethodField()
    nearest_highway = serializers.SerializerMethodField()
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

    def get_nearest_customs_port_of_entry(self, instance):
        nearest_customs_port_of_entry = None
        if instance.nearest_customs_port_of_entry:
            nearest_customs_port_of_entry = dict()
            nearest_customs_port_of_entry[
                'customs_port_id'] = instance.nearest_customs_port_of_entry.customs_port_id_id
            nearest_customs_port_of_entry[
                'customs_port_distance'] = instance.nearest_customs_port_of_entry.customs_port_distance
            nearest_customs_port_of_entry['name'] = CustomsPortOfEntry.objects.get(
                id=nearest_customs_port_of_entry['customs_port_id']).name
        return nearest_customs_port_of_entry

    def get_nearest_port(self, instance):
        nearest_port = None
        if instance.nearest_port:
            nearest_port = dict()
            nearest_port['port_id'] = instance.nearest_port.port_id_id
            nearest_port['port_distance'] = instance.nearest_port.port_distance
            nearest_port['name'] = PortAndTerminal.objects.get(id=nearest_port['port_id']).name
        return nearest_port

    def get_nearest_railway(self, instance):
        nearest_railway = None
        if instance.nearest_railway:
            nearest_railway = dict()
            nearest_railway['railway_id'] = instance.nearest_railway.railway_id_id
            nearest_railway['railway_distance'] = instance.nearest_railway.railway_distance
            nearest_railway['name'] = Railway.objects.get(id=nearest_railway['railway_id']).name
        return nearest_railway

    def get_nearest_airport(self, instance):
        nearest_airport = None
        if instance.nearest_airport:
            nearest_airport = dict()
            nearest_airport['airport_id'] = instance.nearest_airport.airport_id_id
            nearest_airport['airport_distance'] = instance.nearest_airport.airport_distance
            nearest_airport['name'] = Airport.objects.get(id=nearest_airport['airport_id']).name
        return nearest_airport

    def get_nearest_highway(self, instance):
        nearest_highway = None
        if instance.nearest_highway:
            nearest_highway = dict()
            nearest_highway['highway_id'] = instance.nearest_highway.highway_id_id
            nearest_highway['highway_distance'] = instance.nearest_highway.highway_distance
            nearest_highway['name'] = RoadsAndHighways.objects.get(
                id=nearest_highway['highway_id']).name
        return nearest_highway

    def get_nearest_first_nations(self, instance):
        index = 0
        nearest_first_nations = None
        if instance.nearest_first_nations:
            nearest_first_nations = []
            nearest_fns = Community.objects.annotate(distance=Distance("point", instance.geo_position)).filter(point__distance_lte=(instance.geo_position, D(km=100)), community_type__in=["Rural First Nations Reserve", "Urban First Nations Reserve"]).order_by('distance')[:3]
            for fn in nearest_fns:
                mapped_fn = dict()
                mapped_fn["name"] = fn.place_name
                mapped_fn["link"] = fn.place_name
                mapped_fn["distance"] = fn.distance.km
                nearest_first_nations.append(mapped_fn)
                index += 1
        return nearest_first_nations

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
