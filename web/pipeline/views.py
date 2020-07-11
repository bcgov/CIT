from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize

from rest_framework import generics
from rest_framework.views import APIView

from .models import Location, Community, CensusSubdivision
from .serializers import LocationSerializer, CommunitySerializer, CensusSubdivisionSerializer


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


class CensusSubdivisionList(generics.ListAPIView):
    queryset = CensusSubdivision.objects.all()
    serializer_class = CensusSubdivisionSerializer


class LocationGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        return HttpResponse(
            serialize('geojson', Hospital.objects.all(), geometry_field='location', fields=('name', 'location_type', 'location_subtype')),
            content_type="application/json",
        )


class CommunityGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        return HttpResponse(
            serialize(
                'geojson', Community.objects.all(), geometry_field='location', fields=('place_name', 'place_type')
            ),
            content_type="application/json",
        )


# class DistanceGeoJSONList(APIView):
#     schema = None

#     def get(self, request, format=None):
#         line_strings = generate_line_strings()
#         return JsonResponse(line_strings, safe=False)


class CensusSubdivisionGeoJSONList(APIView):
    pass
