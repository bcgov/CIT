from rest_framework import serializers
from pipeline.models.preferred_development import PreferredDevelopment
from pipeline.models.indian_reserve_band_name import IndianReserveBandName
from pipeline.models.users.user import User
from pipeline.serializers.opportunity.distance import (
    IndianReserveBandSerializer, MunicipalitySerializer,
    OpportunityCommunitySerializer, OpportunityPostSecondarySerializer,
    OpportunityFirstResponderSerializer, OpportunityHospitalSerializer,
    OpportunityResearchCentreSerializer, OpportunityAirportSerializer,
    OpportunityCustomsPortOfEntrySerializer,
    OpportunityPortAndTerminalSerializer, OpportunityRailwaySerializer,
    OpportunityRoadsAndHighwaysSerializer, OpportunityRiverSerializer,
    OpportunityLakeSerializer, OpportunityMunicipalitySerializer,
    OpportunityRegionalDistrictSerializer)
from pipeline.models.opportunity import (
    Opportunity, PostSecondaryDistance,
    CommunityDistance, MunicipalityDistance, IndianReserveBandDistance,
    LakeDistance, RiverDistance, RoadsAndHighwaysDistance, AirportDistance,
    RailwayDistance, PortAndTerminalDistance, CustomsPortOfEntryDistance,
    ResearchCentreDistance, FirstResponderDistance, HospitalDistance)


class OpportunitySerializer(serializers.ModelSerializer):
    opportunity_preferred_development = serializers.PrimaryKeyRelatedField(
        queryset=PreferredDevelopment.objects.all(), many=True, required=False)
    nearest_first_nations = serializers.PrimaryKeyRelatedField(
        queryset=IndianReserveBandName.objects.all(), many=True, required=False)
    nearest_municipalities = serializers.PrimaryKeyRelatedField(
        queryset=MunicipalityDistance.objects.all(), many=True, required=False)

    nearest_first_nations_object = IndianReserveBandSerializer(
        many=True, required=False)
    nearest_municipalities_object = MunicipalitySerializer(
        many=True, required=False)

    nearest_community = OpportunityCommunitySerializer(required=False)
    nearest_post_secondary = OpportunityPostSecondarySerializer(required=False)
    nearest_coast_guard_station = OpportunityFirstResponderSerializer(
        required=False)
    nearest_ambulance_station = OpportunityFirstResponderSerializer(
        required=False)
    nearest_police_station = OpportunityFirstResponderSerializer(
        required=False)
    nearest_fire_station = OpportunityFirstResponderSerializer(required=False)
    nearest_health_center = OpportunityHospitalSerializer(required=False)
    nearest_research_centre = OpportunityResearchCentreSerializer(
        required=False)
    nearest_customs_port_of_entry = OpportunityCustomsPortOfEntrySerializer(
        required=False)
    nearest_port = OpportunityPortAndTerminalSerializer(required=False)
    nearest_railway = OpportunityRailwaySerializer(required=False)
    nearest_airport = OpportunityAirportSerializer(required=False)
    nearest_highway = OpportunityRoadsAndHighwaysSerializer(required=False)
    nearest_river = OpportunityRiverSerializer(required=False)
    nearest_lake = OpportunityLakeSerializer(required=False)
    user_id = serializers.IntegerField()
    municipality = OpportunityMunicipalitySerializer(read_only=True)
    municipality_id = serializers.IntegerField()
    regional_district = OpportunityRegionalDistrictSerializer(read_only=True)
    regional_district_id = serializers.IntegerField()

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
            "regional_district_id",
            "parcel_ownership",
            "parcel_size",
            "pid",
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
            "nearest_first_nations_object",
            "nearest_municipalities_object",
            "nearest_community",
            "network_at_road",
            "network_avg",
            "user_id",
            "municipality",
            "municipality_id",
            "regional_district",
            "regional_district_id"
        )

    def create(self, validated_data):
        if validated_data.get('user_id'):
            user_id = validated_data.pop('user_id')
            user = User.objects.get(id=user_id)
            validated_data['user'] = user

        nearest_community = None
        if validated_data.get('nearest_community'):
            community = validated_data.pop('nearest_community')
            if community.get('community_id') is not None:
                nearest_community = CommunityDistance.objects.create(
                    **community)

        nearest_post_secondary = None
        if validated_data.get('nearest_post_secondary'):
            post_secondary = validated_data.pop('nearest_post_secondary')
            if post_secondary.get('location_id') is not None:
                nearest_post_secondary = PostSecondaryDistance.objects.create(
                    **post_secondary)

        nearest_coast_guard_station = None
        if validated_data.get('nearest_coast_guard_station'):
            coast_guard_station = validated_data.pop(
                'nearest_coast_guard_station')
            if coast_guard_station.get('first_responder_id') is not None:
                nearest_coast_guard_station = FirstResponderDistance.objects.create(
                    **coast_guard_station)

        nearest_ambulance_station = None
        if validated_data.get('nearest_ambulance_station'):
            ambulance_station = validated_data.pop('nearest_ambulance_station')
            if ambulance_station.get('first_responder_id') is not None:
                nearest_ambulance_station = FirstResponderDistance.objects.create(
                    **ambulance_station)

        nearest_police_station = None
        if validated_data.get('nearest_police_station'):
            police_station = validated_data.pop('nearest_police_station')
            if police_station.get('first_responder_id') is not None:
                nearest_police_station = FirstResponderDistance.objects.create(
                    **police_station)

        nearest_fire_station = None
        if validated_data.get('nearest_fire_station'):
            fire_station = validated_data.pop('nearest_fire_station')
            if fire_station.get('first_responder_id') is not None:
                nearest_fire_station = FirstResponderDistance.objects.create(
                    **fire_station)

        nearest_health_center = None
        if validated_data.get('nearest_health_center'):
            health_center = validated_data.pop('nearest_health_center')
            if health_center.get('hospital_id') is not None:
                nearest_health_center = HospitalDistance.objects.create(
                    **health_center)

        nearest_research_centre = None
        if validated_data.get('nearest_research_centre'):
            research_centre = validated_data.pop('nearest_research_centre')
            if research_centre.get('research_centre_id') is not None:
                nearest_research_centre = ResearchCentreDistance.objects.create(
                    **research_centre)

        nearest_customs_port_of_entry = None
        if validated_data.get('nearest_customs_port_of_entry'):
            customs_port_of_entry = validated_data.pop(
                'nearest_customs_port_of_entry')
            if customs_port_of_entry.get('customs_port_id') is not None:
                nearest_customs_port_of_entry = CustomsPortOfEntryDistance.objects.create(
                    **customs_port_of_entry)
                validated_data['nearest_customs_port_of_entry'] = nearest_customs_port_of_entry

        nearest_port = None
        if validated_data.get('nearest_port'):
            port = validated_data.pop('nearest_port')
            if port.get('port_id') is not None:
                nearest_port = PortAndTerminalDistance.objects.create(**port)
                validated_data['nearest_port'] = nearest_port

        nearest_railway = None
        if validated_data.get('nearest_railway'):
            railway = validated_data.pop('nearest_railway')
            if railway.get('railway_id') is not None:
                nearest_railway = RailwayDistance.objects.create(**railway)
                validated_data['nearest_railway'] = nearest_railway

        nearest_airport = None
        if validated_data.get('nearest_airport'):
            airport = validated_data.pop('nearest_airport')
            if airport.get('airport_id') is not None:
                nearest_airport = AirportDistance.objects.create(**airport)
                validated_data['nearest_airport'] = nearest_airport

        nearest_highway = None
        if validated_data.get('nearest_highway'):
            highway = validated_data.pop('nearest_highway')
            if highway.get('highway_id') is not None:
                nearest_highway = RoadsAndHighwaysDistance.objects.create(
                    **highway)
                validated_data['nearest_highway'] = nearest_highway

        nearest_river = None
        if validated_data.get('nearest_river'):
            river = validated_data.pop('nearest_river')
            if river.get('river_id') is not None:
                nearest_river = RiverDistance.objects.create(**river)
                validated_data['nearest_river'] = nearest_river

        nearest_lake = None
        if validated_data.get('nearest_lake'):
            lake = validated_data.pop('nearest_lake')
            if lake.get('lake_id') is not None:
                nearest_lake = LakeDistance.objects.create(**lake)
                validated_data['nearest_lake'] = nearest_lake

        preferred_developments = []
        if validated_data.get('opportunity_preferred_development'):
            preferred_developments = validated_data.pop(
                'opportunity_preferred_development')

        # get reserves
        filtered_first_nations_distances = []
        if validated_data.get('nearest_first_nations_object'):
            first_nations = validated_data.pop('nearest_first_nations_object')
            # TODO: validation filtered_first_nations = IndianReserveBandName.objects.filter(name__in=first_nations)

            # create distances

            for nation in first_nations:
                filtered_first_nations_distance = IndianReserveBandDistance.objects.create(
                    **nation)
                filtered_first_nations_distances.append(
                    filtered_first_nations_distance.pk)

        filtered_municipality_distances = []
        if validated_data.get('nearest_municipalities_object'):
            municipalities = validated_data.pop(
                'nearest_municipalities_object')

            for muni in municipalities:
                municipalities_distance = MunicipalityDistance.objects.create(
                    **muni)
                filtered_municipality_distances.append(
                    municipalities_distance.pk)

        # insert opportuntity with literal fields
        instance = Opportunity.objects.create(**validated_data)

        instance.opportunity_preferred_development.set(preferred_developments)

        if filtered_first_nations_distances:
            for dist in filtered_first_nations_distances:
                instance.nearest_first_nations.add(dist)

        if filtered_municipality_distances:
            for dist in filtered_municipality_distances:
                instance.nearest_municipalities.add(dist)

        instance.nearest_post_secondary = nearest_post_secondary
        instance.nearest_community = nearest_community
        instance.nearest_coast_guard_station = nearest_coast_guard_station
        instance.nearest_ambulance_station = nearest_ambulance_station
        instance.nearest_police_station = nearest_police_station
        instance.nearest_fire_station = nearest_fire_station
        instance.nearest_health_center = nearest_health_center
        instance.nearest_research_center = nearest_research_centre
        instance.nearest_customs_port_of_entry = nearest_customs_port_of_entry
        instance.nearest_port = nearest_port
        instance.nearest_railway = nearest_railway
        instance.nearest_airport = nearest_airport
        instance.nearest_highway = nearest_highway
        instance.nearest_river = nearest_river
        instance.nearest_lake = nearest_lake
        instance.save()

        return instance
