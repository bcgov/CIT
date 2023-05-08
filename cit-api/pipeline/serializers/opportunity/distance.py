from rest_framework import serializers
from pipeline.models.opportunity import PostSecondaryDistance,\
    CommunityDistance, MunicipalityDistance, IndianReserveBandDistance,\
    LakeDistance, RiverDistance, RoadsAndHighwaysDistance, AirportDistance,\
    RailwayDistance, PortAndTerminalDistance, CustomsPortOfEntryDistance,\
    ResearchCentreDistance, FirstResponderDistance, HospitalDistance
from pipeline.models.general import Municipality, RegionalDistrict


class OpportunityPostSecondarySerializer(serializers.ModelSerializer):
    class Meta:
        model = PostSecondaryDistance
        fields = ('location_id', 'location_distance')


class OpportunityCommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityDistance
        fields = ('community_id', 'community_distance')


class OpportunityIndianReserveBandSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndianReserveBandDistance
        fields = ('reserve_id', 'reserve_distance','community_id')


class OpportunityLakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LakeDistance
        fields = ('lake_id', 'lake_distance')


class OpportunityRiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiverDistance
        fields = ('river_id', 'river_distance')


class OpportunityRoadsAndHighwaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadsAndHighwaysDistance
        fields = ('highway_id', 'highway_distance','name')


class OpportunityAirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AirportDistance
        fields = ('airport_id', 'airport_distance','name')


class OpportunityRailwaySerializer(serializers.ModelSerializer):
    class Meta:
        model = RailwayDistance
        fields = ('railway_id', 'railway_distance', 'name')


class OpportunityPortAndTerminalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortAndTerminalDistance
        fields = ('port_id', 'port_distance','name')


class OpportunityCustomsPortOfEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomsPortOfEntryDistance
        fields = ('customs_port_id', 'customs_port_distance','name')


class OpportunityResearchCentreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchCentreDistance
        fields = ('research_centre_id', 'research_centre_distance')


class OpportunityFirstResponderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstResponderDistance
        fields = ('first_responder_id', 'first_responder_distance')


class OpportunityHospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalDistance
        fields = ('hospital_id', 'hospital_distance')


class OpportunityMunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipality
        fields = ('name', 'id')


class OpportunityRegionalDistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionalDistrict
        fields = ('name', 'id')


class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MunicipalityDistance
        fields = ('municipality_distance', 'municipality_id')


class IndianReserveBandSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndianReserveBandDistance
        fields = ('reserve_distance', 'reserve_id', 'community_id')
