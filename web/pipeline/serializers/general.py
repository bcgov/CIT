from rest_framework import serializers

from pipeline.models import (
    Location, Community, CensusSubdivision, LocationDistance,
)


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name", "community_id", "location_type", "latitude", "longitude", "location_fuzzy")


class CommunitySerializer(serializers.ModelSerializer):

    wildfire_zone = serializers.SlugRelatedField(read_only=True, slug_field='risk_class')
    tsunami_zone = serializers.SlugRelatedField(read_only=True, slug_field='zone_class')

    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
            "latitude",
            "longitude",
            "census_subdivision",
            "community_type",
            'base_access_50mbps',
            'fn_community_name',
            'municipality_classification',
            'estimated_population',
            'estimated_total_dwellings',
            "wildfire_zone",
            "tsunami_zone",
            "num_schools",
            "num_courts",
            "num_hospitals",
            "num_timber_facilities",
        )


class CommunityDetailSerializer(serializers.ModelSerializer):
    display_fields = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id",
            "display_fields",
            "latitude",
            "longitude"
        )

    def get_display_fields(self, obj):
        return obj.get_display_fields()


class CensusSubdivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CensusSubdivision
        exclude = ['geom', 'geom_simplified']


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
            # "travel_time",
            # "travel_time_display", "driving_route_available"
        )
