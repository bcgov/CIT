from rest_framework import serializers

from pipeline.models.location_assets import Location
from pipeline.models.general import LocationDistance, Service, RegionalDistrict
from pipeline.models.community import Community
from pipeline.models.census import CensusSubdivision


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name", "community_id", "location_type", "get_latitude", "get_longitude", "location_fuzzy")


class ServiceListSerializer(serializers.ModelSerializer):
    queryset = Service.objects.all()
    isp = serializers.SlugRelatedField(read_only=True, slug_field='name')
    communities = serializers.PrimaryKeyRelatedField(
        read_only=True, many=True, source='hex.community')

    class Meta:
        model = Service
        fields = ("communities", "technology", "isp")


class ServiceSerializer(serializers.ModelSerializer):
    queryset = Service.objects.all()
    isp = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = Service
        fields = ("technology", "isp")


class CommunitySerializer(serializers.ModelSerializer):
    queryset = Community.objects.all().select_related(
        'hexuid', 'hexuid__service__isp').prefetch_related('hexuid__service')
    wildfire_zone = serializers.SlugRelatedField(read_only=True, slug_field='risk_class')
    tsunami_zone = serializers.SlugRelatedField(read_only=True, slug_field='zone_class')
    community_type = serializers.CharField(source='get_display_community_type', read_only=True)

    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
            "latitude",
            "longitude",
            "census_subdivision",
            "regional_district",
            "community_type",
            "incorporated",
            "fn_community_name",
            "wildfire_zone",
            "tsunami_zone",
            "is_coastal",
            "last_mile_status",
            "transport_mile_status",
            "cbc_phase",
            "num_schools",
            "num_courts",
            "num_hospitals",
            "num_timber_facilities",
            "percent_50_10",
            "percent_25_5",
            "percent_10_2",
            "percent_5_1",
        )


class CommunityCSVSerializer(serializers.ModelSerializer):
    queryset = Community.objects.all().select_related(
        'hexuid', 'hexuid__service__isp').prefetch_related('hexuid__service')
    wildfire_zone = serializers.SlugRelatedField(read_only=True, slug_field='risk_class')
    tsunami_zone = serializers.SlugRelatedField(read_only=True, slug_field='zone_class')
    community_type = serializers.CharField(source='get_display_community_type', read_only=True)

    class Meta:
        model = Community
        fields = (
            "id",
            "place_id",
            "place_name",
            "latitude",
            "longitude",
            "census_subdivision",
            "regional_district",
            "community_type",
            "incorporated",
            "fn_community_name",
            "wildfire_zone",
            "tsunami_zone",
            "is_coastal",
            "last_mile_status",
            "transport_mile_status",
            "cbc_phase",
            "num_schools",
            "num_courts",
            "num_hospitals",
            "num_timber_facilities",
            "percent_50_10",
            "percent_25_5",
            "percent_10_2",
            "percent_5_1",
        )


class CommunityDetailSerializer(serializers.ModelSerializer):
    display_fields = serializers.SerializerMethodField()
    locations = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id",
            "display_fields",
            "latitude",
            "longitude",
            "regional_district",
            "locations",
        )

    def get_display_fields(self, obj):
        return obj.get_display_fields()

    def get_locations(self, obj):
        return obj.get_location_assets()


class CensusSubdivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CensusSubdivision
        exclude = [
            'geom', 'geom_simplified',
            # Percentage fields are excluded because there are corresponding count fields for each
            'population_percentage_change', 'pop_pct_0_14', 'pop_pct_14_65', 'pop_pct_65',
            'households_owner_pct_mortgage', 'households_owner_pct_spending_30_pct_income',
            'households_tenant_pct_subsidized_housing', 'households_tenant_pct_spending_30_pct_income'
        ]


class CensusSubdivisionDetailSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField()

    class Meta:
        model = CensusSubdivision
        fields = (
            "id", "name", "groups",)

    def get_groups(self, obj):
        return obj.api_field_groups()


class LocationDistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationDistance
        fields = (
            "id",
            "community",
            "location",
            "distance",
            "driving_distance",
            "travel_time",
            "travel_time_display",
        )


class RegionalDistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionalDistrict
        fields = (
            "id",
            "name",
        )
