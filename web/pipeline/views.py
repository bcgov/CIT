from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize

from rest_framework import generics
from rest_framework.views import APIView

from .models import Location, Community, CensusSubdivision, LocationDistance
from .serializers import LocationSerializer, CommunitySerializer, CensusSubdivisionSerializer, LocationDistanceSerializer


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
            serialize('geojson', Location.objects.all(), geometry_field='point', fields=('name', 'location_type')),
            content_type="application/json",
        )


class CommunityGeoJSONList(APIView):
    schema = None

    def get(self, request, format=None):
        return HttpResponse(
            serialize(
                'geojson', Community.objects.all(), geometry_field='point', fields=('place_name', 'place_type')
            ),
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




def generate_line_strings():
    line_strings = {
        "type": "FeatureCollection",
        "features": []
    }

    _map = {}
    for location_distance in LocationDistance.objects.select_related('community', 'hospital'):
        if location_distance.community.id not in _map:
            _map[location_distance.community.id] = location_distance
        if location_distance.distance < _map[location_distance.community.id].distance:
            _map[location_distance.community.id] = location_distance

    for k, location_distance in _map.items():
        line_strings["features"].append({
            "type": "Feature",
            "properties": {
                "distance": float(location_distance.distance)
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        location_distance.community.longitude(),
                        location_distance.community.latitude()
                    ],
                    [
                        location_distance.location.longitude(),
                        location_distance.location.latitude()
                    ]
                ]
            }
        })

    return line_strings
