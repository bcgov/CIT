from rest_framework import serializers
from pipeline.models.preferred_development import PreferredDevelopment
from pipeline.models.general import Municipality
from pipeline.models.indian_reserve_band_name import IndianReserveBandName

from pipeline.models.opportunity import Opportunity, PostSecondaryDistance, CommunityDistance, MunicipalityDistance, IndianReserveBandDistance, LakeDistance, RiverDistance, RoadsAndHighwaysDistance, AirportDistance, RailwayDistance, PortAndTerminalDistance, CustomsPortOfEntryDistance, ResearchCentreDistance, FirstResponderDistance, HospitalDistance

class OpportunityPostSecondarySerializer(serializers.ModelSerializer):
    class Meta:
        model=PostSecondaryDistance
        fields=('location_id', 'location_distance')

class OpportunityCommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model=CommunityDistance
        fields=('community_id', 'community_distance')

class OpportunityMunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model=MunicipalityDistance
        fields=('municipality_id', 'municipality_distance')
class OpportunityIndianReserveBandSerializer(serializers.ModelSerializer):
    class Meta:
        model=IndianReserveBandDistance
        fields=('reserve_id', 'reserve_distance')

class OpportunityLakeSerializer(serializers.ModelSerializer):
    class Meta:
        model=LakeDistance
        fields=('lake_id', 'lake_distance')

class OpportunityRiverSerializer(serializers.ModelSerializer):
    class Meta:
        model=RiverDistance
        fields=('river_id', 'river_distance')

class OpportunityRoadsAndHighwaysSerializer(serializers.ModelSerializer):
    class Meta:
        model=RoadsAndHighwaysDistance
        fields=('highway_id', 'highway_distance')
class OpportunityAirportSerializer(serializers.ModelSerializer):
    class Meta:
        model=AirportDistance
        fields=('airport_id', 'airport_distance')

class OpportunityRailwaySerializer(serializers.ModelSerializer):
    class Meta:
        model=RailwayDistance
        fields=('railway_id', 'railway_distance')

class OpportunityPortAndTerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model=PortAndTerminalDistance
        fields=('port_id', 'port_distance')

class OpportunityCustomsPortOfEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomsPortOfEntryDistance
        fields=('customs_port_id', 'customs_port_distance')

class OpportunityResearchCentreSerializer(serializers.ModelSerializer):
    class Meta:
        model=ResearchCentreDistance
        fields=('research_centre_id', 'research_centre_distance')
 
class OpportunityFirstResponderSerializer(serializers.ModelSerializer):
    class Meta:
        model=FirstResponderDistance
        fields=('first_responder_id', 'first_responder_distance')

class OpportunityHospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model=HospitalDistance
        fields=('hospital_id', 'hospital_distance')


class OpportunitySerializer(serializers.ModelSerializer):
    opportunity_preferred_development = serializers.PrimaryKeyRelatedField(queryset=PreferredDevelopment.objects.all(), many=True)
    nearest_first_nations = serializers.PrimaryKeyRelatedField(queryset=IndianReserveBandName.objects.all(), many=True)
    nearest_municipalities = serializers.PrimaryKeyRelatedField(queryset=Municipality.objects.all(), many=True)
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
    
    def create(self, validated_data):
        community = validated_data.pop('nearest_community')
        if community.get('community_id') is not None:
            nearest_community = CommunityDistance.objects.create(**community)
            # validated_data['nearest_community'] = nearest_community.id
        
        post_secondary = validated_data.pop('nearest_post_secondary')
        if post_secondary.get('research_centre_id') is not None:
            nearest_post_secondary = PostSecondaryDistance.objects.create(**post_secondary)
            # validated_data['nearest_post_secondary'] = nearest_post_secondary
        
        coast_guard_station = validated_data.pop('nearest_coast_guard_station')
        if coast_guard_station.get('first_responder_id') is not None:
            nearest_coast_guard_station = FirstResponderDistance.objects.create(**coast_guard_station)
            # validated_data['nearest_coast_guard_station'] = nearest_coast_guard_station
        
        ambulance_station = validated_data.pop('nearest_ambulance_station')
        if ambulance_station.get('first_responder_id') is not None:
            nearest_ambulance_station = FirstResponderDistance.objects.create(**ambulance_station) 
            # validated_data['nearest_ambulance_station'] = nearest_ambulance_station
        
        police_station = validated_data.pop('nearest_police_station')
        if police_station.get('first_responder_id') is not None:
            nearest_police_station = FirstResponderDistance.objects.create(**police_station)
            # validated_data['nearest_police_station'] = nearest_police_station
        
        fire_station = validated_data.pop('nearest_fire_station')
        if fire_station.get('first_responder_id') is not None:
            nearest_fire_station = FirstResponderDistance.objects.create(**fire_station)
            # validated_data['nearest_fire_station'] = nearest_fire_station
        
        health_center = validated_data.pop('nearest_health_center')
        if health_center.get('hospital_id') is not None:
            nearest_health_center = HospitalDistance.objects.create(**health_center)
            # validated_data['nearest_health_center'] = nearest_health_center
        
        research_centre = validated_data.pop('nearest_research_centre')
        if research_centre.get('research_centre_id') is not None:
            nearest_research_centre = ResearchCentreDistance.objects.create(**research_centre)
            # validated_data['nearest_research_centre'] = nearest_research_centre
        
        customs_port_of_entry = validated_data.pop('nearest_customs_port_of_entry')
        if customs_port_of_entry.get('customs_port_of_entry_id') is not None:
            nearest_customs_port_of_entry = CustomsPortOfEntryDistance.objects.create(**customs_port_of_entry)
            validated_data['nearest_customs_port_of_entry'] = nearest_customs_port_of_entry
        
        port = validated_data.pop('nearest_port')
        if port.get('port_id') is not None:
            nearest_port = PortAndTerminalDistance.objects.create(**port)
            validated_data['nearest_port'] = nearest_port
       
        railway = validated_data.pop('nearest_railway')
        if railway.get('railway_id') is not None:
            nearest_railway = RailwayDistance.objects.create(**railway)
            validated_data['nearest_railway'] = nearest_railway

        airport = validated_data.pop('nearest_airport')
        if airport.get('airport_id') is not None:
            nearest_airport = AirportDistance.objects.create(**airport)
            validated_data['nearest_airport'] = nearest_airport

        highway = validated_data.pop('nearest_highway')
        if highway.get('highway_id') is not None:
            nearest_highway = RoadsAndHighwaysDistance.objects.create(**highway)
            validated_data['nearest_highway'] = nearest_highway
        
        river = validated_data.pop('nearest_river')
        if river.get('river_id') is not None:
            nearest_river = RiverDistance.objects.create(**river)
            validated_data['nearest_river'] = nearest_river
        
        lake = validated_data.pop('nearest_lake')
        if lake.get('lake_id') is not None:
            nearest_lake = LakeDistance.objects.create(**lake)
            validated_data['nearest_lake'] = nearest_lake
        
        pre = validated_data.pop('opportunity_preferred_development')
        devs = PreferredDevelopment.objects.filter(code__in=pre)

        first_nations = validated_data.pop('nearest_first_nations')
        filtered_first_nations = IndianReserveBandName.objects.filter(name__in=first_nations)

        municipalities = validated_data.pop('nearest_municipalities')
        filtered_municipalities = Municipality.objects.filter(name__in=municipalities)

        instance = Opportunity.objects.create(**validated_data)
        
        instance.opportunity_preferred_development.set(devs)
        instance.nearest_first_nations.set(filtered_first_nations)
        instance.nearest_municipalities.set(filtered_municipalities)
        instance.nearest_community.set(nearest_community)
        instance.nearest_post_secondary.set(nearest_post_secondary)
        instance.nearest_coast_guard_station.set(nearest_coast_guard_station)
        instance.nearest_ambulance_station.set(nearest_ambulance_station)
        instance.nearest_police_station.set(nearest_police_station)
        instance.nearest_fire_station.set(nearest_fire_station)
        instance.nearest_health_center.set(nearest_health_center)
        instance.nearest_research_centre.set(nearest_research_centre)



        return instance