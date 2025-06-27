from rest_framework import generics

from pipeline.models.opportunity import Opportunity
from pipeline.permissions.IsAuthenticated import IsAuthenticated
from pipeline.serializers.opportunity.edit import OpportunitySerializer


class OpportunityView(generics.UpdateAPIView):
    """
    View used to put and patch opportunities in the DB
    """

    serializer_class = OpportunitySerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Opportunity.objects.filter(id=self.kwargs['id'])
