from rest_framework import serializers

from pipeline.constants import DATABC_PERMALINK_URL
from pipeline.models.general import (
    LocationDistance, Service, RegionalDistrict, SchoolDistrict, DataSource, CivicLeader, PageView)
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


class RegionalDistrictDetailSerializer(serializers.ModelSerializer):
    census_data = serializers.SerializerMethodField()

    class Meta:
        model = RegionalDistrict
        fields = (
            "id",
            "name",
            "census_data",
        )

    def get_census_data(self, obj):
        return obj.get_census_data()


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


class PageViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageView
        fields = (
            "id",
            "url",
            "timestamp"
        )
