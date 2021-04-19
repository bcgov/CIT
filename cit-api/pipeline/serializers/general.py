from rest_framework import serializers

from pipeline.constants import DATABC_PERMALINK_URL
from pipeline.models.general import (LocationDistance, Service, RegionalDistrict, SchoolDistrict,
                                     DataSource, CivicLeader, PageView)


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
    communities = serializers.PrimaryKeyRelatedField(read_only=True,
                                                     many=True,
                                                     source='hex.community')

    class Meta:
        model = Service
        fields = ("communities", "technology", "isp")


class ServiceSerializer(serializers.ModelSerializer):
    queryset = Service.objects.all()
    isp = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = Service
        fields = ("technology", "isp")


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
        fields = ("id", "name", "sd_num", "community")


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
        fields = ("id", "url", "timestamp")
