from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import pagination
from django.db.models import Q
from django.contrib.gis.measure import D
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action

from pipeline.models.opportunity import Opportunity
from pipeline.models.general import RegionalDistrict
from pipeline.models.community import Community
from pipeline.serializers.opportunity.get import OpportunityGetSerializer
from pipeline.models.census import CensusSubdivision

MIN_TABLE_ID = 1
MIN_DISTANCE = 0
MIN_SIZE = 0
INVALID_INT = -1

class LargeResultsSetPagination(pagination.PageNumberPagination):
    """
    Pagination to limit opportunity list
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class OpportunitiesList(APIView):
    """
    View a list of multiple opportunities from the DB
    """
    pagination_class = LargeResultsSetPagination
    serializer_class = OpportunityGetSerializer

    user_id = openapi.Parameter('user_id',
                                in_=openapi.IN_QUERY,
                                description='Search opportunities with this internal User ID',
                                type=openapi.TYPE_NUMBER,
                                required=False)
    submitted_from_date = openapi.Parameter('submitted_from_date',
                                            in_=openapi.IN_QUERY,
                                            description='Search opportunities submitted from this date forward',
                                            type=openapi.TYPE_STRING,
                                            required=False)
    submitted_to_date = openapi.Parameter('submitted_to_date',
                                          in_=openapi.IN_QUERY,
                                          description='Search opportunities submitted from this date backward',
                                          type=openapi.TYPE_STRING,
                                          required=False)
    published_from_date = openapi.Parameter('published_from_date',
                                            in_=openapi.IN_QUERY,
                                            description='Search opportunities published from this date backward',
                                            type=openapi.TYPE_STRING,
                                            required=False)
    published_to_date = openapi.Parameter('published_to_date',
                                          in_=openapi.IN_QUERY,
                                          description='Search opportunities published from this date backward',
                                          type=openapi.TYPE_STRING,
                                          required=False)
    approval_status_id = openapi.Parameter('approval_status_id',
                                           in_=openapi.IN_QUERY,
                                           description='Search opportunities this approval status',
                                           type=openapi.TYPE_STRING,
                                           required=False)
    regional_district = openapi.Parameter('regional_district',
                                          in_=openapi.IN_QUERY,
                                          description='Search opportunities with this regional district id',
                                          type=openapi.TYPE_STRING,
                                          required=False)
    exclude_unknowns = openapi.Parameter('exclude_unknowns',
                                         in_=openapi.IN_QUERY,
                                         description='Choose whether to exclude or include opportunities with site servicing values that are not set to (Y)es or (N)o.',
                                         type=openapi.TYPE_STRING,
                                         required=False)
    opportunity_road_connected = openapi.Parameter('opportunity_road_connected',
                                                   in_=openapi.IN_QUERY,
                                                   description='Choose whether to exclude or include opportunities with road connection. options: "Y" or "N"',
                                                   type=openapi.TYPE_STRING,
                                                   required=False)
    opportunity_water_connected = openapi.Parameter('opportunity_water_connected',
                                                    in_=openapi.IN_QUERY,
                                                    description='Choose whether to exclude or include opportunities with water supply connection. options: "Y" or "N"',
                                                    type=openapi.TYPE_STRING,
                                                    required=False)
    opportunity_sewer_connected = openapi.Parameter('opportunity_sewer_connected',
                                                    in_=openapi.IN_QUERY,
                                                    description='Choose whether to exclude or include opportunities with sewer connection. options: "Y" or "N"',
                                                    type=openapi.TYPE_STRING,
                                                    required=False)
    opportunity_electrical_connected = openapi.Parameter('opportunity_electrical_connected',
                                                         in_=openapi.IN_QUERY,
                                                         description='Choose whether to exclude or include opportunities with electrical connection. options: "Y" or "N"',
                                                         type=openapi.TYPE_STRING,
                                                         required=False)
    opportunity_natural_gas_connected = openapi.Parameter('opportunity_natural_gas_connected',
                                                          in_=openapi.IN_QUERY,
                                                          description='Choose whether to exclude or include opportunities with natural gas connection. options: "Y" or "N"',
                                                          type=openapi.TYPE_STRING,
                                                          required=False)
    post_secondary_within_100km = openapi.Parameter('post_secondary_within_100km',
                                                    in_=openapi.IN_QUERY,
                                                    description='Choose whether to search opportunities with post secondary only within 100 kilometers. options: "Y" or "N"',
                                                    type=openapi.TYPE_STRING,
                                                    required=False)
    parcel_size_min = openapi.Parameter('parcel_size_min',
                                        in_=openapi.IN_QUERY,
                                        description='Search opportunities with this minimum parcel size in acres.',
                                        type=openapi.TYPE_NUMBER,
                                        required=False)
    parcel_size_max = openapi.Parameter('parcel_size_max',
                                        in_=openapi.IN_QUERY,
                                        description='Search opportunities with this maximum parcel size in acres.',
                                        type=openapi.TYPE_NUMBER,
                                        required=False)
    power_transmission_lines_min = openapi.Parameter('power_transmission_lines_min',
                                                     in_=openapi.IN_QUERY,
                                                     description='Search opportunities with this minimum distance to power transmission lines in kilometers.',
                                                     type=openapi.TYPE_NUMBER,
                                                     required=False)
    power_transmission_lines_max = openapi.Parameter('power_transmission_lines_max',
                                                     in_=openapi.IN_QUERY,
                                                     description='Search opportunities with this maximum distance to power transmission lines in kilometers.',
                                                     type=openapi.TYPE_NUMBER,
                                                     required=False)
    air_service_min = openapi.Parameter('air_service_min',
                                        in_=openapi.IN_QUERY,
                                        description='Search opportunities with this minimum distance to air services in kilometers.',
                                        type=openapi.TYPE_NUMBER,
                                        required=False)
    air_service_max = openapi.Parameter('air_service_max',
                                        in_=openapi.IN_QUERY,
                                        description='Search opportunities with this maximum distance to air services in kilometers.',
                                        type=openapi.TYPE_NUMBER,
                                        required=False)
    rail_connections_min = openapi.Parameter('rail_connections_min',
                                             in_=openapi.IN_QUERY,
                                             description='Search opportunities with this minimum distance to rail connections in kilometers.',
                                             type=openapi.TYPE_NUMBER,
                                             required=False)
    rail_connections_max = openapi.Parameter('rail_connections_max',
                                             in_=openapi.IN_QUERY,
                                             description='Search opportunities with this maximum distance to rail connections in kilometers.',
                                             type=openapi.TYPE_NUMBER,
                                             required=False)
    deep_water_port_min = openapi.Parameter('deep_water_port_min',
                                            in_=openapi.IN_QUERY,
                                            description='Search opportunities with this minimum distance to deep water ports in kilometers.',
                                            type=openapi.TYPE_NUMBER,
                                            required=False)
    deep_water_port_max = openapi.Parameter('deep_water_port_max',
                                            in_=openapi.IN_QUERY,
                                            description='Search opportunities with this maximum distance to deep water ports in kilometers.',
                                            type=openapi.TYPE_NUMBER,
                                            required=False)
    research_centre_min = openapi.Parameter('research_centre_min',
                                            in_=openapi.IN_QUERY,
                                            description='Search opportunities with this minimum distance to research centres in kilometers.',
                                            type=openapi.TYPE_NUMBER,
                                            required=False)
    research_centre_max = openapi.Parameter('research_centre_max',
                                            in_=openapi.IN_QUERY,
                                            description='Search opportunities with this maximum distance to research centres in kilometers.',
                                            type=openapi.TYPE_NUMBER,
                                            required=False)
    zoning = openapi.Parameter('zoning',
                               in_=openapi.IN_QUERY,
                               description='Search opportunities with current or future zoning codes. Use the comma seperated zoning codes seen in the options endpoint',
                               type=openapi.TYPE_NUMBER,
                               required=False)
    connectivity = openapi.Parameter('connectivity',
                                     in_=openapi.IN_QUERY,
                                     description='Search opportunities with either average network connectivity in community, or network at the nearest road. Use the comma seperated codes such as "50/10", "25/5"',
                                     type=openapi.TYPE_NUMBER,
                                     required=False)
    proximity_community_id = openapi.Parameter('proximity_community_id',
                                               in_=openapi.IN_QUERY,
                                               description='Search opportunities with respect to this community, must also use, `community_population_distance_min` and `community_population_distance_max` to qualify a search',
                                               type=openapi.TYPE_NUMBER,
                                               required=False)
    community_population_distance_min = openapi.Parameter('community_population_distance_min',
                                                          in_=openapi.IN_QUERY,
                                                          description='Search opportunities with this minimum distance to a community, defined in `proximity_community_id` query param, measured in kilometers.',
                                                          type=openapi.TYPE_NUMBER,
                                                          required=False)
    community_population_distance_max = openapi.Parameter('community_population_distance_max',
                                                          in_=openapi.IN_QUERY,
                                                          description='Search opportunities with this maximum distance to a community, defined in `proximity_community_id` query param, measured in kilometers.',
                                                          type=openapi.TYPE_NUMBER,
                                                          required=False)
    proximity_population = openapi.Parameter('proximity_population',
                                             in_=openapi.IN_QUERY,
                                             description='Search opportunities with this this minimum population in a community in proximity.',
                                             type=openapi.TYPE_NUMBER,
                                             required=False)
    page_param = openapi.Parameter('page',
                                   in_=openapi.IN_QUERY,
                                   description='',
                                   type=openapi.TYPE_NUMBER,
                                   default=1,
                                   required=True)
    page_size = openapi.Parameter('page_size',
                                  in_=openapi.IN_QUERY,
                                  description='',
                                  type=openapi.TYPE_NUMBER,
                                  default=10,
                                  required=True)

    @swagger_auto_schema(manual_parameters=[page_param, page_size, user_id, submitted_from_date, submitted_to_date, published_from_date, published_to_date,
                                            approval_status_id,
                                            regional_district, exclude_unknowns, opportunity_road_connected, opportunity_water_connected,
                                            opportunity_sewer_connected, opportunity_electrical_connected,
                                            opportunity_natural_gas_connected, post_secondary_within_100km, parcel_size_min, parcel_size_max,
                                            power_transmission_lines_min, power_transmission_lines_max, air_service_min, air_service_max,
                                            rail_connections_min, rail_connections_max, deep_water_port_min, deep_water_port_max, research_centre_min,
                                            research_centre_max, zoning, connectivity, proximity_community_id, community_population_distance_min,
                                            community_population_distance_max],
                         method='GET',
                         responses={status.HTTP_200_OK: OpportunityGetSerializer})
    @action(detail=False, methods=['GET'])
    def get(self, request, format=None):
        queryset = Opportunity.objects.all()
        queryset = queryset.filter(deleted=False)

        user_id = request.query_params.get('user_id', None)
        if(user_id is not None):
            queryset = queryset.filter(user_id=user_id)

        submitted_from_date = request.query_params.get('submitted_from_date', None)
        submitted_to_date = request.query_params.get('submitted_to_date', None)
        if(submitted_from_date is not None):
            queryset = queryset.filter(date_created__gte=submitted_from_date)
        if(submitted_to_date is not None):
            queryset = queryset.filter(date_created__lte=submitted_to_date)

        published_from_date = request.query_params.get('published_from_date', None)
        published_to_date = request.query_params.get('published_to_date', None)
        if(published_from_date is not None):
            queryset = queryset.filter(date_published__gte=published_from_date)
        if(published_to_date is not None):
            queryset = queryset.filter(date_published__lte=published_to_date)

        approval_status_id = request.query_params.get('approval_status_id', None)
        if(approval_status_id is not None):
            queryset = queryset.filter(approval_status_id=approval_status_id)

        regional_district = request.query_params.get('regional_district', None)
        if(regional_district is not None):
            regional_district_models = RegionalDistrict.objects.get(id=regional_district)
            if(regional_district_models is not None):
                queryset = queryset.filter(geo_position__intersects=regional_district_models.geom)

        exclude_unknowns = request.query_params.get('exclude_unknowns', None)
        queryset = self.service_queryset(request, queryset, exclude_unknowns, 'opportunity_road_connected')
        queryset = self.service_queryset(request, queryset, exclude_unknowns, 'opportunity_water_connected')
        queryset = self.service_queryset(request, queryset, exclude_unknowns, 'opportunity_sewer_connected')
        queryset = self.service_queryset(request, queryset, exclude_unknowns, 'opportunity_electrical_connected')
        queryset = self.service_queryset(request, queryset, exclude_unknowns, 'opportunity_natural_gas_connected')

        post_secondary_within_100km = request.query_params.get('post_secondary_within_100km', None)
        if(post_secondary_within_100km == 'Y'):
            queryset = queryset.filter(nearest_post_secondary__location_distance__lte=100)

        research_centre_within_100km = request.query_params.get('research_centre_within_100km', None)
        if(research_centre_within_100km == 'Y'):
            queryset = queryset.filter(nearest_research_centre__research_centre_distance__lte=100)

        # TODO Figure out distance calulation issues
        community_id = int(request.query_params.get('community_id', INVALID_INT))
        community_distance = float(request.query_params.get('community_distance', INVALID_INT))
        if(community_distance >= MIN_DISTANCE and community_id >= MIN_TABLE_ID):
            community_model = Community.objects.get(id=community_id)
            if(community_model is not None):
                queryset = queryset.filter(geo_position__distance_lte=(community_model.point,
                                                                       D(km=community_distance)))

        parcel_size_min = float(request.query_params.get('parcel_size_min', INVALID_INT))
        parcel_size_max = float(request.query_params.get('parcel_size_max', INVALID_INT))
        if(parcel_size_min >= MIN_SIZE):
            queryset = queryset.filter(parcel_size__gte=parcel_size_min)
        if(parcel_size_max >= MIN_SIZE):
            queryset = queryset.filter(parcel_size__lte=parcel_size_max)

        power_transmission_lines_min = float(request.query_params.get('power_transmission_lines_min', INVALID_INT))
        power_transmission_lines_max = float(request.query_params.get('power_transmission_lines_max', INVALID_INT))
        if(power_transmission_lines_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_transmission_line__gte=power_transmission_lines_min)
        if(power_transmission_lines_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_transmission_line__lte=power_transmission_lines_max)

        air_service_min = float(request.query_params.get('air_service_min', INVALID_INT))
        air_service_max = float(request.query_params.get('air_service_max', INVALID_INT))
        if(air_service_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_airport__airport_distance__gte=air_service_min)
        if(air_service_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_airport__airport_distance__lte=air_service_max)

        rail_connections_min = float(request.query_params.get('rail_connections_min', INVALID_INT))
        rail_connections_max = float(request.query_params.get('rail_connections_max', INVALID_INT))
        if(rail_connections_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_railway__railway_distance__gte=rail_connections_min)
        if(rail_connections_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_railway__railway_distance__lte=rail_connections_max)

        deep_water_port_min = float(request.query_params.get('deep_water_port_min', INVALID_INT))
        deep_water_port_max = float(request.query_params.get('deep_water_port_max', INVALID_INT))
        if(deep_water_port_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_port__port_distance__gte=deep_water_port_min)
        if(deep_water_port_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_port__port_distance__lte=deep_water_port_max)

        research_centre_min = float(request.query_params.get('research_centre_min', INVALID_INT))
        research_centre_max = float(request.query_params.get('research_centre_max', INVALID_INT))
        if(research_centre_min >= MIN_SIZE):
            queryset = queryset.filter(nearest_research_centre__research_centre_distance__gte=research_centre_min)
        if(research_centre_max >= MIN_SIZE):
            queryset = queryset.filter(nearest_research_centre__research_centre_distance__lte=research_centre_max)

        zoning = request.query_params.get('zoning', None)
        if(zoning is not None):
            zonings = zoning.split(',')
            queryset = queryset.filter(Q(land_use_zoning__in=zonings) | Q(ocp_zoning_code__in=zonings))

        connectivity = request.query_params.get('connectivity', None)
        if(connectivity == 'Y'):
            queryset = queryset.filter(Q(network_avg__in=['50/10']) | Q(network_at_road__in=['50/10']))

        community_population_distance_min = float(request.query_params.get('community_population_distance_min', INVALID_INT))
        community_population_distance_max = float(request.query_params.get('community_population_distance_max', INVALID_INT))
        proximity_population = float(request.query_params.get('proximity_population', INVALID_INT))
        proximity_community_id = float(request.query_params.get('proximity_community_id', INVALID_INT))
        if(proximity_community_id >= MIN_TABLE_ID and (community_population_distance_min >= MIN_SIZE or community_population_distance_max >= MIN_SIZE)):
            queryset = self.filter_opportunities_by_distance_from_community(queryset,
                                                                            community_population_distance_min,
                                                                            community_population_distance_max,
                                                                            proximity_community_id)
        if(proximity_population >= MIN_TABLE_ID and (community_population_distance_min >= MIN_SIZE or community_population_distance_max >= MIN_SIZE)):
            queryset = self.filter_opportunities_by_distance_from_population(queryset,
                                                                             community_population_distance_min,
                                                                             community_population_distance_max,
                                                                             proximity_population)
        page_size = request.query_params.get('page_size', 0)
        page = request.query_params.get('page', 0)
        queryset = queryset[int(page) * int(page_size):(int(page) + 1) * int(page_size)]
        serializer = OpportunityGetSerializer(queryset, many=True)
        return Response(serializer.data)

    def filter_opportunities_by_distance_from_community(self, queryset, community_distance_min, community_distance_max, proximity_community_id):
        community = Community.objects.get(pk=proximity_community_id)
        if(community_distance_min >= MIN_SIZE):
            queryset = queryset.filter(geo_position__distance_gte=(community.point, D(km=community_distance_min)))
        if(community_distance_max >= MIN_SIZE):
            queryset = queryset.filter(geo_position__distance_lte=(community.point, D(km=community_distance_max)))
        return queryset

    def filter_opportunities_by_distance_from_population(self, queryset, population_distance_min, population_distance_max, population):
        population_geometry = CensusSubdivision.objects.filter(population__gte=population)
        if population_distance_min >= MIN_SIZE:
            min_query = Q()
            max_query = Q()
            for subdivision in population_geometry:
                min_query |= Q(geo_position__distance_gte=(subdivision.geom, D(km=population_distance_min)))
                max_query |= Q(geo_position__distance_lte=(subdivision.geom, D(km=population_distance_max)))

            if(len(min_query) > 0 and len(max_query) > 0):
                queryset = queryset.filter(min_query & max_query)
            elif(len(min_query) > 0):
                queryset = queryset.filter(min_query)
            elif(len(max_query) > 0):
                queryset = queryset.filter(max_query)
            else:
                queryset = Opportunity.objects.none()

        return queryset

    def service_queryset(self, request, queryset, exclude_unknowns, service_name):
        service_connected = request.query_params.get(service_name, None)

        if(service_name == 'opportunity_road_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns == 'N') and service_connected == 'Y'):
                queryset = queryset.filter(Q(opportunity_road_connected=service_connected) |
                                           Q(opportunity_road_connected='U'))
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'Y'):
                queryset = queryset.filter(opportunity_road_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'N'):
                queryset = queryset.filter(~Q(opportunity_road_connected='U'))
        elif(service_name == 'opportunity_water_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns == 'N') and service_connected == 'Y'):
                queryset = queryset.filter(Q(opportunity_water_connected=service_connected) |
                                           Q(opportunity_water_connected='U'))
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'Y'):
                queryset = queryset.filter(opportunity_water_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'N'):
                queryset = queryset.filter(~Q(opportunity_water_connected='U'))
        elif(service_name == 'opportunity_sewer_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns == 'N') and service_connected == 'Y'):
                queryset = queryset.filter(Q(opportunity_sewer_connected=service_connected) |
                                           Q(opportunity_sewer_connected='U'))
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'Y'):
                queryset = queryset.filter(opportunity_sewer_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'N'):
                queryset = queryset.filter(~Q(opportunity_sewer_connected='U'))
        elif(service_name == 'opportunity_electrical_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns == 'N') and service_connected == 'Y'):
                queryset = queryset.filter(Q(opportunity_electrical_connected=service_connected) |
                                           Q(opportunity_electrical_connected='U'))
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'Y'):
                queryset = queryset.filter(opportunity_electrical_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'N'):
                queryset = queryset.filter(~Q(opportunity_electrical_connected='U'))
        elif(service_name == 'opportunity_natural_gas_connected'):
            if(service_connected is not None and (exclude_unknowns is None or exclude_unknowns == 'N') and service_connected == 'Y'):
                queryset = queryset.filter(Q(opportunity_natural_gas_connected=service_connected) |
                                           Q(opportunity_natural_gas_connected='U'))
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'Y'):
                queryset = queryset.filter(opportunity_natural_gas_connected=service_connected)
            elif(service_connected is not None and exclude_unknowns == 'Y' and service_connected == 'N'):
                queryset = queryset.filter(~Q(opportunity_natural_gas_connected='U'))

        return queryset
