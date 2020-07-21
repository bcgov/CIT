from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize

from rest_framework import generics
from rest_framework.views import APIView

from pipeline.models import (
    Location, Community, CensusSubdivision, LocationDistance,
)
from pipeline.serializers.general import (
    LocationSerializer,
    CommunitySerializer,
    CensusSubdivisionSerializer,
    CensusSubdivisionDetailSerializer,
    LocationDistanceSerializer,
)
from pipeline.utils import generate_line_strings


def auth(request):
    if request.user.is_anonymous:
        return JsonResponse({})
    else:
        return JsonResponse({'username': request.user.username})


class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class CommunityList(generics.ListAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer


class CommunityDetail(generics.RetrieveAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer


class CensusSubdivisionList(generics.ListAPIView):
    queryset = CensusSubdivision.objects.all()
    serializer_class = CensusSubdivisionSerializer


class CensusSubdivisionDetail(generics.RetrieveAPIView):
    queryset = CensusSubdivision.objects.all()
    serializer_class = CensusSubdivisionDetailSerializer


class LocationGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        return HttpResponse(
            serialize('geojson', Location.objects.all(), geometry_field='point', fields=('name', 'location_type')),
            content_type="application/json",
        )


class CommunityGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        return HttpResponse(
            serialize('geojson', Community.objects.all(), geometry_field='point', fields=('place_name', 'place_type')),
            content_type="application/json",
        )


class LocationDistanceGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        line_strings = generate_line_strings()
        return JsonResponse(line_strings, safe=False)


class LocationDistanceList(generics.ListAPIView):
    queryset = LocationDistance.objects.all()
    serializer_class = LocationDistanceSerializer


class CensusSubdivisionGeoJSONList(APIView):
    pass
