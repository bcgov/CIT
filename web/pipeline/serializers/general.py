from rest_framework import serializers

from pipeline.models import (
    Location, Community, CensusSubdivision, LocationDistance, Service
)


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name", "community_id", "location_type", "latitude", "longitude", "location_fuzzy")


class ServiceSerializer(serializers.ModelSerializer):
    queryset = Service.objects.all()
    isp = serializers.SlugRelatedField(read_only=True, slug_field='name')
    community = serializers.SlugRelatedField(read_only=True, slug_field='hex__community')

    class Meta:
        model = Service
        fields = ("technology", "isp", "community")


class CommunitySerializer(serializers.ModelSerializer):
    queryset = Community.objects.all().select_related('hexuid', 'hexuid__service__isp').prefetch_related('hexuid__service')
    wildfire_zone = serializers.SlugRelatedField(read_only=True, slug_field='risk_class')
    tsunami_zone = serializers.SlugRelatedField(read_only=True, slug_field='zone_class')
    # services = ServiceSerializer(many=True, read_only=True)

    def to_representation(self, instance):
        repr = super().to_representation(instance)
        repr['services'] = [ServiceSerializer(x).data for x in instance.hexuid.service_set.all()]
        return repr

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
            "percent_50_10",
            "percent_25_5"
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
