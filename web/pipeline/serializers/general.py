from rest_framework import serializers

from pipeline.models.location_assets import Location
from pipeline.models.general import LocationDistance, Service
from pipeline.models.community import Community
from pipeline.models.census import CensusSubdivision


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name", "community_id", "location_type", "latitude", "longitude", "location_fuzzy")


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
    # services = ServiceSerializer(many=True, read_only=True)

    #def to_representation(self, instance):
    #    repr = super().to_representation(instance)
    #    repr['services'] = [ServiceSerializer(x).data for x in instance.hexuid.service_set.all()]
    #    return repr

    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
            "latitude",
            "longitude",
            "census_subdivision",
            "community_type",
            "incorporated",
            "fn_community_name",
            "wildfire_zone",
            "tsunami_zone",
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


class CommunitySearchSerializer(serializers.ModelSerializer):
    queryset = Community.objects.all()

    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
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
