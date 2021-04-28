from rest_framework import serializers

from pipeline.models.location_assets import (FirstResponder, DiagnosticFacility, TimberFacility,
                                             CivicFacility, Hospital, Project, ServiceBCLocation,
                                             School, Clinic, Court, PostSecondaryInstitution,
                                             ClosedMill, ResearchCentre, Airport, Location)


class LocationSerializer(serializers.ModelSerializer):
    community_id = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = Location
        fields = ("id", "name", "community_id", "location_type", "get_latitude", "get_longitude",
                  "location_fuzzy")


class FirstResponderSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = FirstResponder
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "location_email",
            "category",
            "subcategory",
        )


class DiagnosticFacilitySerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = DiagnosticFacility
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "ser_cd_dsc",
        )


class TimberFacilitySerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = TimberFacility
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "bus_cat_ds",
        )


class CivicFacilitySerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = CivicFacility
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_website",
            "category",
            "subcategory",
            "bus_cat_cl",
            "bus_cat_ds",
        )


class HospitalSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = Hospital
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "location_email",
            "rg_name",
            "sv_description",
            "hours",
            "num_communities_within_50km",
        )


class ProjectSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")
    provincial_funding = serializers.IntegerField(source="provinvial_funding")
    standardized_start_date = serializers.DateField(source='get_standardized_start_date_as_date')
    standardized_completion_date = serializers.DateField(
        source='get_standardized_completion_date_as_date')
    standardized_start_date_quarter = serializers.CharField(
        source='get_standardized_start_date_as_quarter')
    standardized_completion_date_quarter = serializers.CharField(
        source='get_standardized_completion_date_as_quarter')

    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "project_id",
            "project_name",
            "project_description",
            "estimated_cost",
            "update_activity",
            "environmental_assessment_stage",
            "construction_type",
            "project_type",
            "region",
            "municipality",
            "developer",
            "architect",
            "project_status",
            "project_stage",
            "project_category_name",
            "public_funding_ind",
            "provincial_funding",
            "green_building_ind",
            "clean_energy_ind",
            "first_nation_ind",
            "first_nation_names",
            "first_nation_agreement",
            "construction_jobs",
            "operating_jobs",
            "start_date",
            "completion_date",
            "standardized_start_date",
            "standardized_completion_date",
            "standardized_start_date_quarter",
            "standardized_completion_date_quarter",
            "first_entry_date",
            "last_update",
            "source_date",
            "source_website",
            "updated_fields",
            "is_earliest_entry",
            "is_latest_entry",
        )


class ServiceBCLocationSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = ServiceBCLocation
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
        )


class SchoolSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    school_district = serializers.SerializerMethodField()
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = School
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "district_number",
            "public_or_independent",
            "school_education_level",
            "school_district",
        )

    def get_school_district(self, obj):
        return obj.school_district.name if obj.school_district else None


class PostSecondaryInstitutionSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = PostSecondaryInstitution
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "institution_type",
            "economic_development_region",
        )


class ClinicSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = Clinic
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "location_website",
            "location_email",
            "sv_description",
            "hours",
        )


class CourtSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = Court
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_phone",
            "hours_of_operation",
            "court_level",
        )


class ClosedMillSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = ClosedMill
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
        )


class ResearchCentreSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = ResearchCentre
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_website",
            "research_specialties",
            "research_centre_affiliation",
            "institution",
            "inst_acrnm",
            "research_sector",
            "cntr_type",
        )


class AirportSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(source="get_latitude")
    longitude = serializers.FloatField(source="get_longitude")
    community = serializers.IntegerField(source="closest_community_id")

    class Meta:
        model = Airport
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "location_website",
            "location_phone",
            "description",
            "keywords",
            "aerodrome_status",
            "aircraft_access_ind",
            "data_source",
            "data_source_year",
            "elevation",
            "fuel_availability_ind",
            "helicopter_access_ind",
            "iata_code",
            "max_runway_length",
            "number_of_runways",
            "runway_surface",
            "oil_availability_ind",
            "seaplane_access_ind",
        )
