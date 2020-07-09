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
