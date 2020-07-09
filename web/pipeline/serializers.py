from rest_framework import serializers

from .models import Location, Community, CensusSubdivision


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name", "community_id", "location_type", "latitude", "longitude")


class CommunitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Community
        fields = (
            "id", "place_name", "latitude", "longitude", "census_subdivision", "community_type")

class CensusSubdivisionSerializer(serializers.ModelSerializer):

    class Meta:
        model = CensusSubdivision
        fields = (
            "id", "name")
