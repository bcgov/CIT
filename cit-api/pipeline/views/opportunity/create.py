from rest_framework import generics
from pipeline.models.opportunity import Opportunity
from pipeline.serializers.opportunity.edit import OpportunitySerializer


class OpportunityCreateView(generics.CreateAPIView):
    """
    View used to add Opportunities to the DB
    """
    model = Opportunity
    serializer_class = OpportunitySerializer
