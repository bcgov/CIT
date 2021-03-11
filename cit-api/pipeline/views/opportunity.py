from rest_framework import generics
from rest_framework import pagination
from django.db.models import Q
import operator

from pipeline.models.opportunity import Opportunity
from pipeline.models.general import RegionalDistrict
from pipeline.serializers.opportunity import OpportunitySerializer


class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class OpportunitiesList(generics.ListAPIView):
    pagination_class = LargeResultsSetPagination
    serializer_class = OpportunitySerializer

    def get_queryset(self):
        queryset = Opportunity.objects.all()
        queryset = queryset.filter(deleted=False)

        submitted_from_date = self.request.query_params.get('submitted_from_date', None)
        submitted_to_date = self.request.query_params.get('submitted_to_date', None)
        if(submitted_from_date is not None):
            queryset = queryset.filter(date_created__gte=submitted_from_date)
        if(submitted_to_date is not None):
            queryset = queryset.filter(date_created__lte=submitted_to_date)

        published_from_date = self.request.query_params.get('published_from_date', None)
        published_to_date = self.request.query_params.get('published_to_date', None)
        if(published_from_date is not None):
            queryset = queryset.filter(date_published__gte=published_from_date)
        if(published_to_date is not None):
            queryset = queryset.filter(date_published__lte=published_to_date)

        approval_status_id = self.request.query_params.get('approval_status_id', None)
        if(approval_status_id is not None):
            queryset = queryset.filter(approval_status_id=approval_status_id)
            
        regional_district = self.request.query_params.get('regional_district', None)
        if(regional_district is not None):
            regional_district_models = RegionalDistrict.objects.get(id=regional_district)
            if(regional_district_models is not None):
                queryset = queryset.filter(geo_position__intersects=regional_district_models.geom)

        connected_unknown = self.request.query_params.get('connected_unknown', None)
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_road_connected')
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_water_connected')
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_sewer_connected')
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_electrical_connected')

        return queryset

    def service_queryset(self, queryset, connected_unknown, service_name):
        service_connected = self.request.query_params.get(service_name, None)
        if(service_name == 'opportunity_road_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_road_connected=service_connected) |
                                           Q(opportunity_road_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_road_connected=service_connected)
        elif(service_name == 'opportunity_water_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_water_connected=service_connected) |
                                           Q(opportunity_water_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_water_connected=service_connected)
        elif(service_name == 'opportunity_sewer_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_sewer_connected=service_connected) |
                                           Q(opportunity_sewer_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_sewer_connected=service_connected)
        elif(service_name == 'opportunity_electrical_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_electrical_connected=service_connected) |
                                           Q(opportunity_electrical_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_electrical_connected=service_connected)

        return queryset

class OpportunityCreateView(generics.CreateAPIView):
    serializer_class = OpportunitySerializer

class OpportunityView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OpportunitySerializer
    lookup_field = 'id'
    def get_queryset(self):
        return Opportunity.objects.filter(id=self.kwargs['id'])

