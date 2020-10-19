from rest_framework import serializers

from pipeline.constants import DATABC_PERMALINK_URL
from pipeline.models.general import LocationDistance, Service, RegionalDistrict, SchoolDistrict, DataSource, CivicLeader
from pipeline.models.community import Community
from pipeline.models.census import CensusSubdivision


class DataSourceSerializer(serializers.ModelSerializer):
    source = serializers.CharField(source='get_source_display')
    source_url = serializers.SerializerMethodField()

    class Meta:
        model = DataSource
        fields = ("name", "display_name", "source", "source_url", "last_updated")

    def get_source_url(self, obj):
        if obj.external_url:
            return obj.external_url
        if obj.permalink_id:
            return DATABC_PERMALINK_URL.format(permalink_id=obj.permalink_id)


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
    percent_50_10 = serializers.SerializerMethodField()
    percent_25_5 = serializers.SerializerMethodField()
    percent_10_2 = serializers.SerializerMethodField()
    percent_5_1 = serializers.SerializerMethodField()
    pop_2km_capacity = serializers.SerializerMethodField()
    remaining_pop_capacity = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
            "child_communities",
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
            "nearest_substation_name",
            "nearest_substation_distance",
            "nearest_transmission_distance",
            "transmission_lines_owner",
            "transmission_line_description",
            "transmission_line_voltage",
            "pop_2km_capacity",
            "remaining_pop_capacity",
        )

    def get_percent_50_10(self, obj):
        return obj.percent_50_10 if obj.percent_50_10 else 0

    def get_percent_25_5(self, obj):
        return obj.percent_25_5 if obj.percent_25_5 else 0

    def get_percent_10_2(self, obj):
        return obj.percent_10_2 if obj.percent_10_2 else 0

    def get_percent_5_1(self, obj):
        return obj.percent_5_1 if obj.percent_5_1 else 0

    def get_pop_2km_capacity(self, obj):
        return obj.pop_2km_capacity if obj.pop_2km_capacity else -1

    def get_remaining_pop_capacity(self, obj):
        return obj.remaining_pop_capacity if obj.remaining_pop_capacity else -1


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
            "nearest_substation_name",
            "nearest_substation_distance",
            "transmission_lines_owner",
            "transmission_line_description",
            "transmission_line_voltage",
            "pop_2km_capacity",
            "remaining_pop_capacity",
        )


class CommunityDetailSerializer(serializers.ModelSerializer):
    display_fields = serializers.SerializerMethodField()
    locations = serializers.SerializerMethodField()
    child_communities = serializers.SerializerMethodField()
    parent_community = serializers.SerializerMethodField()
    hidden_report_pages = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id",
            "parent_community",
            "child_communities",
            "display_fields",
            "latitude",
            "longitude",
            "regional_district",
            "locations",
            "hidden_report_pages",
        )

    def get_display_fields(self, obj):
        return obj.get_display_fields()

    def get_locations(self, obj):
        return obj.get_location_assets()

    def get_parent_community(self, obj):
        if not obj.parent_community:
            return None

        return {
            "id": obj.parent_community.id,
            "name": obj.parent_community.place_name,
        }

    def get_child_communities(self, obj):
        return [{
            "id": child_community.id,
            "place_name": child_community.place_name,
        } for child_community in obj.child_communities.all()]

    def get_hidden_report_pages(self, obj):
        return obj.census_subdivision.get_hidden_detail_report_pages()


class CommunitySearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
            "nation",
            "regional_district",
            "latitude",
            "longitude",
        )


class CensusSubdivisionSerializer(serializers.ModelSerializer):
    population_percentage_change = serializers.DecimalField(
        source='get_population_percentage_change_as_decimal',
        decimal_places=2, max_digits=6)
    pop_pct_0_14 = serializers.DecimalField(
        source='get_pop_pct_0_14_as_decimal',
        decimal_places=2, max_digits=6)
    pop_pct_14_65 = serializers.DecimalField(
        source='get_pop_pct_14_65_as_decimal',
        decimal_places=2, max_digits=6)
    pop_pct_65 = serializers.DecimalField(
        source='get_pop_pct_65_as_decimal',
        decimal_places=2, max_digits=6)
    housing_cost_less_30_pct_income = serializers.DecimalField(
        source='get_housing_cost_less_30_pct_income_as_decimal',
        decimal_places=2, max_digits=6)
    housing_cost_30_pct_more_income = serializers.DecimalField(
        source='get_housing_cost_30_pct_more_income_as_decimal',
        decimal_places=2, max_digits=6)
    households_owner_pct_mortgage = serializers.DecimalField(
        source='get_households_owner_pct_mortgage_as_decimal',
        decimal_places=2, max_digits=6)
    households_owner_pct_spending_30_pct_income = serializers.DecimalField(
        source='get_households_owner_pct_spending_30_pct_income_as_decimal',
        decimal_places=2, max_digits=6)
    households_tenant_pct_subsidized_housing = serializers.DecimalField(
        source='get_households_tenant_pct_subsidized_housing_as_decimal',
        decimal_places=2, max_digits=6)
    households_tenant_pct_spending_30_pct_income = serializers.DecimalField(
        source='get_households_tenant_pct_spending_30_pct_income_as_decimal',
        decimal_places=2, max_digits=6)

    class Meta:
        model = CensusSubdivision
        exclude = [
            'geom', 'geom_simplified',
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
    distance = serializers.SerializerMethodField()
    birds_eye_distance = serializers.FloatField(source='distance', read_only=True)
    driving_distance = serializers.FloatField(read_only=True)

    class Meta:
        model = LocationDistance
        fields = (
            "id",
            "community",
            "location",
            "distance",
            "birds_eye_distance",
            "driving_distance",
            "travel_time",
            "travel_time_display",
        )

    def get_distance(self, obj):
        return obj.driving_distance if obj.driving_distance else obj.distance


class RegionalDistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionalDistrict
        fields = (
            "id",
            "name",
        )


class SchoolDistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolDistrict
        fields = (
            "id",
            "name",
            "sd_num",
            "community"
        )


class CivicLeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CivicLeader
        fields = (
            "id",
            "last_name",
            "first_name",
            "middle_name",
            "community",
            "gender",
            "position",
            "experience",
        )
