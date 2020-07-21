from rest_framework import serializers

from pipeline.models import (
    FirstResponder, DiagnosticFacility, TimberFacility, CivicFacility, Hospital, NaturalResourceProject,
    EconomicProject, ServiceBCLocation, School, Clinic, Court, PostSecondaryInstitution,
)


class FirstResponderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstResponder
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "keywords",
        )


class DiagnosticFacilitySerializer(serializers.ModelSerializer):
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
    class Meta:
        model = CivicFacility
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "keywords",
            "bus_cat_cl",
            "bus_cat_ds",
        )


class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "rg_name",
            "sv_description",
            "hours",
        )


class NaturalResourceProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = NaturalResourceProject
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "project_comments",
            "project_description",
            "estimated_cost",
            "update_activity",
            "construction_type",
            "construction_subtype",
            "project_type",
            "developer",
            "architect",
            "project_status",
            "project_stage",
            "project_category_name",
            "provinvial_funding",
            "federal_funding",
            "municipal_funding",
            "green_building_ind",
            "green_building_desc",
            "clean_energy_ind",
            "construction_jobs",
            "operating_jobs",
            "standardized_start_date",
            "standardized_completion_date",
        )


class EconomicProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicProject
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "flnro_project_status",
            "project_type",
            "project_category",
            "proponent",
            "eao_project_status",
            "project_comments",
        )


class ServiceBCLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBCLocation
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
        )


class SchoolSerializer(serializers.ModelSerializer):
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
        )


class PostSecondaryInstitutionSerializer(serializers.ModelSerializer):
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
    class Meta:
        model = Clinic
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "sv_description",
            "hours",
        )


class CourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Court
        fields = (
            "id",
            "name",
            "latitude",
            "longitude",
            "location_fuzzy",
            "community",
            "hours_of_operation",
            "court_level",
        )
