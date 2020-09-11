from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework_csv import renderers as csv_renderers

from pipeline.models.community import Community
from pipeline.models.census import CensusSubdivision
from pipeline.models.general import LocationDistance, Service, RegionalDistrict, SchoolDistrict
from pipeline.serializers.general import (
    CommunitySerializer,
    CommunityCSVSerializer,
    CommunitySearchSerializer,
    CommunityDetailSerializer,
    CensusSubdivisionSerializer,
    CensusSubdivisionDetailSerializer,
    LocationDistanceSerializer,
    ServiceListSerializer,
    RegionalDistrictSerializer,
    SchoolDistrictSerializer,
)
from pipeline.utils import (
    generate_line_strings, filter_communities,
    serialize_communities_for_regional_districts, communities_advanced_search,
    serialize_data_sources,
)


def auth(request):
    if request.user.is_anonymous:
        return JsonResponse({})
    else:
        return JsonResponse({'username': request.user.username})


class DataSourcesList(APIView):
    def get(self, request, format=None):
        return Response(serialize_data_sources())


class CommunityViewSet(viewsets.GenericViewSet):
    def get_queryset(self):
        filters = self.request.query_params
        communities = filter_communities(filters)
        return communities

    def list(self, request):
        queryset = self.paginate_queryset(self.get_queryset())
        serializer = CommunitySerializer(queryset, many=True)
        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, pk):
        user = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = CommunityDetailSerializer(user)
        return Response(serializer.data)

    @action(detail=False)
    def ids(self, request):
        community_ids = self.get_queryset().values_list('id', flat=True)
        return Response(community_ids)

    @action(detail=False)
    def search(self, request):
        serializer = CommunitySearchSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    @action(detail=False)
    def advanced_search(self, request):
        community_ids = communities_advanced_search(request.query_params)
        return Response(community_ids)

    @action(detail=False)
    def geojson(self, request):
        return HttpResponse(
            serialize('geojson', Community.objects.all(), geometry_field='point',
                      fields=('pk', 'place_name', 'community_type', 'regional_district', 'has_any_k12_school')),
            content_type="application/json",
        )

    @action(detail=False, renderer_classes=[csv_renderers.CSVRenderer])
    def csv(self, request):
        serializer = CommunityCSVSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)


class ServiceList(generics.ListAPIView):
    serializer_class = ServiceListSerializer

    def get_queryset(self):
        return Service.objects.filter(hex__community__isnull=False)\
            .prefetch_related("hex__community")\
            .select_related("isp")


class CensusSubdivisionList(generics.ListAPIView):
    queryset = CensusSubdivision.objects.all()
    serializer_class = CensusSubdivisionSerializer


class CensusSubdivisionDetail(generics.RetrieveAPIView):
    queryset = CensusSubdivision.objects.all()
    serializer_class = CensusSubdivisionDetailSerializer


class LocationDistanceGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        line_strings = generate_line_strings()
        return JsonResponse(line_strings, safe=False)


class LocationDistanceList(generics.ListAPIView):
    queryset = LocationDistance.objects.all()
    serializer_class = LocationDistanceSerializer


class CensusSubdivisionGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        return HttpResponse(
            serialize(
                'geojson',
                CensusSubdivision.objects.all(),
                geometry_field='geom',
                fields=('population', 'population_percent_change'),
            ),
            content_type="application/json",
        )


class RegionalDistrictViewSet(viewsets.GenericViewSet):
    def get_queryset(self):
        return RegionalDistrict.objects.all()

    def list(self, request):
        queryset = self.paginate_queryset(self.get_queryset())
        serializer = RegionalDistrictSerializer(queryset, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=False)
    def communities(self, request):
        regional_districts = serialize_communities_for_regional_districts(self.get_queryset())
        return Response(regional_districts)

    @action(detail=False)
    def geojson(self, request):
        return HttpResponse(
            serialize(
                'geojson', RegionalDistrict.objects.all(),
                geometry_field='geom_simplified', fields=('pk', 'name')),
            content_type="application/json",
        )


class SchoolDistrictList(generics.ListAPIView):
    queryset = SchoolDistrict.objects.all()
    serializer_class = SchoolDistrictSerializer
