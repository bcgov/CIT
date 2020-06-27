from rest_framework import serializers

from .models import Location, Community


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name")


class CommunitySerializer(serializers.ModelSerializer):
    place_type = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id", "place_name", "place_type", "latitude", "longitude")
