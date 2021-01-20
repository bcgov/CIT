import json

from django.http import HttpResponse
from django.core.serializers import serialize

from rest_framework import generics
from rest_framework.views import APIView

from pipeline.models.location_assets import (
    Location,
    FirstResponder, DiagnosticFacility, TimberFacility, CivicFacility, Hospital, NaturalResourceProject,
    EconomicProject, Project, ServiceBCLocation, School, Clinic, Court,
    PostSecondaryInstitution, ClosedMill, ResearchCentre, Airport,
)
from pipeline.serializers.location_types import (
    FirstResponderSerializer,
    DiagnosticFacilitySerializer,
    TimberFacilitySerializer,
    CivicFacilitySerializer,
    HospitalSerializer,
    NaturalResourceProjectSerializer,
    EconomicProjectSerializer,
    ProjectSerializer,
    ServiceBCLocationSerializer,
    SchoolSerializer,
    PostSecondaryInstitutionSerializer,
    ClinicSerializer,
    CourtSerializer,
    ClosedMillSerializer,
    ResearchCentreSerializer,
    AirportSerializer,
    LocationSerializer,
)


class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        unique_projects_query = Project.objects.order_by(
            'project_id', '-source_date').distinct('project_id')
        unique_project_ids = unique_projects_query.values_list('id', flat=True)
        unique_projects_location_query = Location.objects.filter(id__in=unique_project_ids)
        projects_serialized = json.loads(serialize(
            'geojson', unique_projects_location_query, geometry_field='point',
            fields=('name', 'location_type', 'location_phone', 'location_email', 'location_website')))

        # use project_name instead of name for Projects
        for project in projects_serialized["features"]:
            project["properties"]["name"] = unique_projects_query.get(name=project["properties"]["name"]).project_name

        # TODO: remove deprecated economic_projects and natural_resource_projects datasets
        location_types_to_exclude = ["projects", "natural_resource_projects", "economic_projects"]
        other_location_types_query = Location.objects.exclude(location_type__in=location_types_to_exclude)

        other_location_types_serialized = serialize(
            'geojson', other_location_types_query, geometry_field='point',
            fields=('name', 'location_type', 'location_phone', 'location_email', 'location_website'))

        all_location_types_serialized = json.loads(
            other_location_types_serialized)

        # add modified Projects back to full queryset
        all_location_types_serialized["features"].extend(projects_serialized["features"])

        return HttpResponse(
            json.dumps(all_location_types_serialized),
            content_type="application/json",
        )


class FirstResponderList(generics.ListAPIView):
    queryset = FirstResponder.objects.all()
    serializer_class = FirstResponderSerializer


class DiagnosticFacilityList(generics.ListAPIView):
    queryset = DiagnosticFacility.objects.all()
    serializer_class = DiagnosticFacilitySerializer


class TimberFacilityList(generics.ListAPIView):
    queryset = TimberFacility.objects.all()
    serializer_class = TimberFacilitySerializer


class CivicFacilityList(generics.ListAPIView):
    queryset = CivicFacility.objects.all()
    serializer_class = CivicFacilitySerializer


class HospitalList(generics.ListAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer


class NaturalResourceProjectList(generics.ListAPIView):
    queryset = NaturalResourceProject.objects.all()
    serializer_class = NaturalResourceProjectSerializer


class EconomicProjectList(generics.ListAPIView):
    queryset = EconomicProject.objects.all()
    serializer_class = EconomicProjectSerializer


class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class LatestProjectList(generics.ListAPIView):
    queryset = Project.objects.order_by('project_id', '-source_date').distinct('project_id')
    serializer_class = ProjectSerializer


class ServiceBCLocationList(generics.ListAPIView):
    queryset = ServiceBCLocation.objects.all()
    serializer_class = ServiceBCLocationSerializer


class SchoolList(generics.ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class PostSecondaryInstitutionList(generics.ListAPIView):
    queryset = PostSecondaryInstitution.objects.all()
    serializer_class = PostSecondaryInstitutionSerializer


class ClinicList(generics.ListAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer


class CourtList(generics.ListAPIView):
    queryset = Court.objects.all()
    serializer_class = CourtSerializer


class ClosedMillList(generics.ListAPIView):
    queryset = ClosedMill.objects.all()
    serializer_class = ClosedMillSerializer


class ResearchCentreList(generics.ListAPIView):
    queryset = ResearchCentre.objects.all()
    serializer_class = ResearchCentreSerializer


class AirportList(generics.ListAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer
