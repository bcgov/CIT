from django.contrib.gis.geos.point import Point
from django.contrib.gis.db.models.functions import Distance
from rest_framework import generics
from rest_framework import pagination
from django.db.models import Q, F
from django.contrib.gis.measure import D
import json

from pipeline.models.opportunity import Opportunity
from pipeline.models.general import RegionalDistrict
from pipeline.models.community import Community
from pipeline.serializers.opportunity import OpportunitySerializer
from pipeline.permissions.IsAuthenticated import IsAuthenticated
from pipeline.models.census import CensusSubdivision

MIN_TABLE_ID = 1
MIN_DISTANCE = 0
MIN_SIZE = 0
INVALID_INT = -1

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
        
        user_id = self.request.query_params.get('user_id', None)
        if(user_id is not None):
            queryset = queryset.filter(user_id=user_id)

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

        exclude_unknowns = self.request.query_params.get('exclude_unknowns', None)
        queryset = self.service_queryset(queryset, exclude_unknowns, 'opportunity_road_connected')
        queryset = self.service_queryset(queryset, exclude_unknowns, 'opportunity_water_connected')
        queryset = self.service_queryset(queryset, exclude_unknowns, 'opportunity_sewer_connected')
        queryset = self.service_queryset(queryset, exclude_unknowns, 'opportunity_electrical_connected')
        queryset = self.service_queryset(queryset, exclude_unknowns, 'opportunity_natural_gas_connected')

        post_secondary_within_100km = self.request.query_params.get('post_secondary_within_100km', None)
        if(post_secondary_within_100km == 'Y'):
            queryset = queryset.filter(nearest_post_secondary__location_distance__lte=100)

        # TODO Figure out distance calulation issues
        community_id = int(self.request.query_params.get('community_id', INVALID_INT))
        community_distance = float(self.request.query_params.get('community_distance', INVALID_INT))
        if(community_distance >= MIN_DISTANCE and community_id >= MIN_TABLE_ID):
            community_model = Community.objects.get(id=community_id)
            if(community_model is not None):
                queryset = queryset.filter(geo_position__distance_lte=(community_model.point,
                                                                       D(km=community_distance)))
        
        parcel_size_min = float(self.request.query_params.get('parcel_size_min', INVALID_INT))
        parcel_size_max = float(self.request.query_params.get('parcel_size_max', INVALID_INT))
        if(parcel_size_min >= MIN_SIZE):
            queryset = queryset.filter(parcel_size__gte=parcel_size_min)
        if(parcel_size_max >= MIN_SIZE):
            queryset = queryset.filter(parcel_size__lte=parcel_size_max)

        power_transmission_lines_min = float(self.request.query_params.get('power_transmission_lines_min', INVALID_INT))
        power_transmission_lines_max = float(self.request.query_params.get('power_transmission_lines_max', INVALID_INT))
        if(power_transmission_lines_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_transmission_line__gte=power_transmission_lines_min)
        if(power_transmission_lines_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_transmission_line__lte=power_transmission_lines_max)

        air_service_min = float(self.request.query_params.get('air_service_min', INVALID_INT))
        air_service_max = float(self.request.query_params.get('air_service_max', INVALID_INT))
        if(air_service_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_airport__airport_distance__gte=air_service_min)
        if(air_service_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_airport__airport_distance__lte=air_service_max) 

        rail_connections_min = float(self.request.query_params.get('rail_connections_min', INVALID_INT))
        rail_connections_max = float(self.request.query_params.get('rail_connections_max', INVALID_INT))
        if(rail_connections_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_railway__railway_distance__gte=rail_connections_min)
        if(rail_connections_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_railway__railway_distance__lte=rail_connections_max) 

        deep_water_port_min = float(self.request.query_params.get('deep_water_port_min', INVALID_INT))
        deep_water_port_max = float(self.request.query_params.get('deep_water_port_max', INVALID_INT))
        if(deep_water_port_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_port__port_distance__gte=deep_water_port_min)
        if(deep_water_port_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_port__port_distance__lte=deep_water_port_max) 

        research_centre_min = float(self.request.query_params.get('research_centre_min', INVALID_INT))
        research_centre_max = float(self.request.query_params.get('research_centre_max', INVALID_INT))
        if(research_centre_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_research_center__research_centre_distance__gte=research_centre_min)
        if(research_centre_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_research_center__research_centre_distance__lte=research_centre_max) 

        zoning = self.request.query_params.get('zoning', None)
        if(zoning is not None):
            zonings = zoning.split(',')
            queryset = queryset.filter(Q(land_use_zoning__in=zonings) | Q(ocp_zoning_code__in=zonings))

        connectivity = self.request.query_params.get('connectivity', None)
        if(connectivity is not None):
            connectivities = connectivity.split(',')
            queryset = queryset.filter(Q(network_avg__in=connectivities) | Q(network_at_road__in=connectivities))

        community_population_distance_min = float(self.request.query_params.get('community_population_distance_min', INVALID_INT))
        community_population_distance_max = float(self.request.query_params.get('community_population_distance_max', INVALID_INT))
        proximity_population = float(self.request.query_params.get('proximity_population', INVALID_INT))
        proximity_community_id = float(self.request.query_params.get('proximity_community_id', INVALID_INT))
        if(proximity_community_id >= MIN_TABLE_ID and (community_population_distance_min >= MIN_SIZE or community_population_distance_max >= MIN_SIZE)):
            queryset = self.filter_opportunities_by_distance_from_community(queryset, community_population_distance_min, community_population_distance_max, proximity_community_id)
        if(proximity_population >= MIN_TABLE_ID and (community_population_distance_min >= MIN_SIZE or community_population_distance_max >= MIN_SIZE)):
            queryset = self.filter_opportunities_by_distance_from_population(queryset, community_population_distance_min, community_population_distance_max, proximity_population)
        
        return queryset

    def filter_opportunities_by_distance_from_community(self, queryset, community_distance_min, community_distance_max, proximity_community_id):
        community = Community.objects.get(pk=proximity_community_id)
        if(community_distance_min >= MIN_SIZE):
            queryset = queryset.filter(geo_position__distance_gte=(community.point, D(km=community_distance_min)))
        if(community_distance_max >= MIN_SIZE):
            queryset = queryset.filter(geo_position__distance_lte=(community.point, D(km=community_distance_max)))
        return queryset

    def filter_opportunities_by_distance_from_population(self, queryset, population_distance_min, population_distance_max, population):
        #TODO: one loop instead of two
        population_geometry = CensusSubdivision.objects.filter(population__gte=population)
        if population_distance_min >= MIN_SIZE:
            query = Q()
            for subdivision in population_geometry:
                query |= Q(geo_position__distance_gte=(subdivision.geom, D(km=population_distance_min)))

        if population_distance_max >= MIN_SIZE:
            query = Q()
            for subdivision in population_geometry:
                query |= Q(geo_position__distance_lte=(subdivision.geom, D(km=population_distance_max)))
            queryset = queryset.filter(query)
            if(len(query) > 0):
                queryset = queryset.filter(query)
            else:
                queryset = Opportunity.objects.none()
            

        
        return queryset

    def service_queryset(self, queryset, exclude_unknowns, service_name):
        service_connected = self.request.query_params.get(service_name, None)
    
        if(service_name == 'opportunity_road_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns is 'N') and service_connected is 'Y'):
                queryset = queryset.filter(Q(opportunity_road_connected=service_connected) |
                                           Q(opportunity_road_connected='U'))
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'Y'):
                queryset = queryset.filter(opportunity_road_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'N'):
                queryset = queryset.filter(~Q(opportunity_road_connected='U'))
        elif(service_name == 'opportunity_water_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns is 'N') and service_connected is 'Y'):
                queryset = queryset.filter(Q(opportunity_water_connected=service_connected) |
                                           Q(opportunity_water_connected='U'))
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'Y'):
                queryset = queryset.filter(opportunity_water_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'N'):
                queryset = queryset.filter(~Q(opportunity_water_connected='U'))
        elif(service_name == 'opportunity_sewer_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns is 'N') and service_connected is 'Y'):
                queryset = queryset.filter(Q(opportunity_sewer_connected=service_connected) |
                                           Q(opportunity_sewer_connected='U'))
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'Y'):
                queryset = queryset.filter(opportunity_sewer_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'N'):
                queryset = queryset.filter(~Q(opportunity_sewer_connected='U'))
        elif(service_name == 'opportunity_electrical_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns is 'N') and service_connected is 'Y'):
                queryset = queryset.filter(Q(opportunity_electrical_connected=service_connected) |
                                           Q(opportunity_electrical_connected='U'))
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'Y'):
                queryset = queryset.filter(opportunity_electrical_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'N'):
                queryset = queryset.filter(~Q(opportunity_electrical_connected='U'))
        elif(service_name == 'opportunity_natural_gas_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns is 'N') and service_connected is 'Y'):
                queryset = queryset.filter(Q(opportunity_natural_gas_connected=service_connected) |
                                           Q(opportunity_natural_gas_connected='U'))
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'Y'):
                queryset = queryset.filter(opportunity_natural_gas_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns is 'Y' and service_connected is 'N'):
                queryset = queryset.filter(~Q(opportunity_natural_gas_connected='U'))

        return queryset

class OpportunityCreateView(generics.CreateAPIView):
    model=Opportunity
    serializer_class = OpportunitySerializer


class OpportunityView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OpportunitySerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Opportunity.objects.filter(id=self.kwargs['id'])


