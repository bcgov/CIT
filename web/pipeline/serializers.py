from rest_framework import serializers

from .models import Location, Community, CensusSubdivision


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name", "latitude", "longitude", "location_type")


class CommunitySerializer(serializers.ModelSerializer):
    place_type = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id", "place_name", "place_type", "latitude", "longitude")

class CensusSubdivisionSerializer(serializers.ModelSerializer):

    class Meta:
        model = CensusSubdivision
        fields = ("id", "name")
