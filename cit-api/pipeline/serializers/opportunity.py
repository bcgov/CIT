from rest_framework import serializers
from pipeline.models.preferred_development import PreferredDevelopment

from pipeline.models.opportunity import Opportunity

class OpportunitySerializer(serializers.ModelSerializer):
    opportunity_preferred_development = serializers.PrimaryKeyRelatedField(queryset=PreferredDevelopment.objects.all(), many=True)

    class Meta:
        model = Opportunity
        fields = (
            "id",
            "deleted",
            "opportunity_address",
            "opportunity_name",
            "geo_position",
            "approval_status",
            "date_created",
            "date_updated",
            "date_published",
            "business_contact_name",
            "business_contact_email",
            "opportunity_description",
            "environmental_information",
            "opportunity_link",
            "community_link",
            "parcel_ownership",
            "parcel_size",
            "pid",
            "parcel_geometry",
            "elevation_at_location",
            "soil_name",
            "soil_texture",
            "soil_drainage",
            "opportunity_road_connected",
            "opportunity_water_connected",
            "opportunity_water_capacity",
            "opportunity_sewer_connected",
            "opportunity_sewer_capacity",
            "opportunity_natual_gas_connected",
            "opportunity_natual_gas_capacity",
            "opportunity_electrical_connected",
            "opportunity_electrical_capacity",
            "private_note",
            "public_note",
            "last_admin",
            "land_use_zoning",
            "ocp_zoning_code",
            "opportunity_property_status",
            "opportunity_preferred_development"
        )    