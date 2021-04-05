from rest_framework import generics
from pipeline.models.opportunity import Opportunity
from pipeline.serializers.opportunity.get import OpportunityGetSerializer
from pipeline.permissions.IsAuthenticated import IsAuthenticated


class OpportunityGetView(generics.RetrieveAPIView):
    """
    View used to get a single opportunity from the DB
    """
    serializer_class = OpportunityGetSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Opportunity.objects.filter(id=self.kwargs['id'])
