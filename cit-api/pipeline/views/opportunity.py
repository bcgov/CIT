from django.utils.decorators import method_decorator
from rest_framework import generics
from rest_framework import pagination

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

        return queryset

class OpportunityCreateView(generics.CreateAPIView):
    serializer_class = OpportunitySerializer

class OpportunityView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OpportunitySerializer
    lookup_field = 'id'
    def get_queryset(self):
        return Opportunity.objects.filter(id=self.kwargs['id'])

