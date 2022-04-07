import imp
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
from pipeline.models.cen_prof_detailed_csd_attrs_sp import CEN_PROF_DETAILED_CSD_ATTRS_SP
from pipeline.models.general import WildfireZone
from pipeline.models.general import TsunamiZone


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
        options =  Community.objects.all().values("id", "place_name").order_by('place_name')
        return Response(dict(data=options))
        
class RegionalDistrictOptions(APIView):
    def get(self, request, format=None):
        options =  RegionalDistrict.objects.all().values('id', 'area_id', 'name').order_by('name')
        return Response(dict(data=options))

class TourismRegionOptions(APIView):
    def get(self, request, format=None):
        options =  TourismRegion.objects.all().values('tourism_region_id', 'tourism_region_name').order_by('tourism_region_name')
        return Response(dict(data=options))

class CensusEconomicRegionOptions(APIView):
    def get(self, request, format=None):
        options =  CensusEconomicRegion.objects.all().values('census_year', 'economic_region_id', 'name').order_by('name')
        return Response(dict(data=options))       

class NaturalResourceRegionOptions(APIView):
    def get(self, request, format=None):
        options =  NaturalResourceRegion.objects.all().values('org_unit', 'name').order_by('name')
        return Response(dict(data=options))    

class CensusSubdivisionOptions(APIView):
    def get(self, request, format=None):
        options =  CEN_PROF_DETAILED_CSD_ATTRS_SP.objects.all().values('census_subdivision_id', 'census_subdivision_name').order_by('census_subdivision_name')
        return Response(dict(data=options)) 

class WildfireZoneOptions(APIView):
    def get(self, request, format=None):
        options =  WildfireZone.objects.all().values('id', 'name').order_by('name')
        return Response(dict(data=options)) 

class TsunamiZoneOptions(APIView):
    def get(self, request, format=None):
        options =  TsunamiZone.objects.all().values('id', 'name').order_by('name')
        return Response(dict(data=options)) 

