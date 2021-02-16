from rest_framework import generics

from pipeline.models.opportunity import Opportunity
from pipeline.serializers.opportunity import OpportunitySerializer

class OpportunitiesList(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer