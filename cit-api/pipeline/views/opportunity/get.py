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
        return Opportunity.objects.select_related('nearest_port__port_id',
        'nearest_airport__airport_id', 'nearest_research_centre','nearest_customs_port_of_entry',
        'nearest_coast_guard_station','nearest_ambulance_station', 'nearest_police_station',
        'nearest_fire_station', 'nearest_health_center','nearest_railway__railway_id',
        'nearest_highway__highway_id','nearest_river','nearest_lake','nearest_post_secondary',
        'nearest_community','regional_district','municipality').prefetch_related('nearest_first_nations__reserve_id',
                                                                                 'nearest_first_nations__community_id',
                                                                                 'nearest_municipalities__municipality_id',
                                                                                 'nearest_municipalities__community_id__census_subdivision',
                                                                                 'opportunity_preferred_development').filter(id=self.kwargs['id'])
