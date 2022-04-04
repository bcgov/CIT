from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core import serializers

from pipeline.models.opportunity import ApprovalStatus
from pipeline.models.preferred_development import PreferredDevelopment
from pipeline.models.property_status import PropertyStatus
from pipeline.models.land_use_zoning import LandUseZoning
from pipeline.models.general import RegionalDistrict
from pipeline.models.tourism_region import TourismRegion
from pipeline.models.census_economic_region import CensusEconomicRegion
from pipeline.models.community import Community
from pipeline.models.natural_resource_region import NaturalResourceRegion

class OptionsView(APIView):
    def get(self, request, format=None):
        """
        Return a list of all options.
        """
        statuses = ApprovalStatus.objects.all().values()
        regional_districts = RegionalDistrict.objects.all().values('id', 'area_id', 'name')
        preferred_development = PreferredDevelopment.objects.all().order_by('name').values()
        property_statuses = PropertyStatus.objects.all().values()
        land_use_zoning = LandUseZoning.objects.all().values()
        communities = Community.objects.all().values("id", "place_name")
        return Response(dict(
            statuses=statuses,
            regionalDistricts=regional_districts,
            preferredDevelopment=preferred_development,
            propertyStatuses=property_statuses,
            landUseZoning=land_use_zoning,
            communities=communities))

class CommunityOptions(APIView):
    def get(self, request, format=None):
        options =  Community.objects.all().values("id", "place_name")
        return Response(dict(data=options))
        
class RegionalDistrictOptions(APIView):
    def get(self, request, format=None):
        options =  RegionalDistrict.objects.all().values('id', 'area_id', 'name')
        return Response(dict(data=options))

class TourismRegionOptions(APIView):
    def get(self, request, format=None):
        options =  TourismRegion.objects.all().values('tourism_region_id', 'tourism_region_name')
        return Response(dict(data=options))

class CensusEconomicRegionOptions(APIView):
    def get(self, request, format=None):
        options =  CensusEconomicRegion.objects.all().values('census_year', 'economic_region_id', 'name')
        return Response(dict(data=options))       

class NaturalResourceRegionOptions(APIView):
    def get(self, request, format=None):
        options =  NaturalResourceRegion.objects.all().values('org_unit', 'name')
        return Response(dict(data=options))    