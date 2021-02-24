from rest_framework import generics
from rest_framework import pagination

from pipeline.models.opportunity import Opportunity
from pipeline.serializers.opportunity import OpportunitySerializer

class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class OpportunitiesList(generics.ListAPIView):
    pagination_class = LargeResultsSetPagination
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
   
 
class OpportunityCreateView(generics.CreateAPIView):
    serializer_class = OpportunitySerializer

