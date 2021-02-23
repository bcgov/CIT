from rest_framework import generics

from pipeline.models.opportunity import Opportunity
from pipeline.serializers.opportunity import OpportunitySerializer

class OpportunitiesList(generics.ListAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

class Opportunity(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer