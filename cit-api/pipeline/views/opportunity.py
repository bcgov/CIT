import os
from rest_framework import generics
from rest_framework import pagination
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.db.models import Q, F
from django.contrib.gis.measure import D
import json

from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakConnectionError, KeycloakGetError

from pipeline.models.opportunity import Opportunity
from pipeline.models.general import RegionalDistrict
from pipeline.models.community import Community
from pipeline.serializers.opportunity import OpportunitySerializer

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

        connected_unknown = self.request.query_params.get('connected_unknown', None)
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_road_connected')
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_water_connected')
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_sewer_connected')
        queryset = self.service_queryset(queryset, connected_unknown, 'opportunity_electrical_connected')

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

        zoning = self.request.query_params.get('zoning', None)
        if(zoning is not None):
            zonings = zoning.split(',')
            queryset = queryset.filter(Q(land_use_zoning__in=zonings) | Q(ocp_zoning_code__in=zonings))

        return queryset

    def service_queryset(self, queryset, connected_unknown, service_name):
        service_connected = self.request.query_params.get(service_name, None)
        if(service_name == 'opportunity_road_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_road_connected=service_connected) |
                                           Q(opportunity_road_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_road_connected=service_connected)
        elif(service_name == 'opportunity_water_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_water_connected=service_connected) |
                                           Q(opportunity_water_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_water_connected=service_connected)
        elif(service_name == 'opportunity_sewer_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_sewer_connected=service_connected) |
                                           Q(opportunity_sewer_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_sewer_connected=service_connected)
        elif(service_name == 'opportunity_electrical_connected'):
            if(service_connected is not None and connected_unknown is None):
                queryset = queryset.filter(Q(opportunity_electrical_connected=service_connected) |
                                           Q(opportunity_electrical_connected='U'))
            elif(service_connected is not None):
                queryset = queryset.filter(opportunity_electrical_connected=service_connected)

        return queryset

class OpportunityCreateView(generics.CreateAPIView):
    model=Opportunity
    serializer_class = OpportunitySerializer

class IsAuthenticated(BasePermission):
    message = 'Insufficent user permission.'

    def valid_user(self, request):
        try:
            # Configure client
            keycloak_openid = KeycloakOpenID(server_url=os.environ.get('KEY_CLOAK_URL'),
                                             client_id=os.environ.get('KEY_CLOAK_CLIENT'),
                                             realm_name=os.environ.get('KEY_CLOAK_REALM'))
 
            # Get WellKnow
            config_well_know = keycloak_openid.well_know()

            # Get Userinfo
            userinfo = keycloak_openid.userinfo(request.headers['Authorization'][7:])

            # TODO: Make permission constants for different functions
            return any(i in ["IDIR", "BCeID"] for i in userinfo['roles'])
        except KeycloakConnectionError as e:
            self.message = str(os.environ.get('KEY_CLOAK_URL'))
            # self.message = 'Cannot connect to authorization server'
        except AttributeError as e:
            self.message = str(e)
            # self.message = 'Authorization response in bad format'
        except KeyError as e:
            self.message = str(userinfo)
            # self.message = 'Must supply an Authorization token'
        except KeycloakGetError as e:
            self.message = request.headers['Authorization']
            

        return False

    def has_permission(self, request, view):
        return request.method == "GET" or (request.method not in SAFE_METHODS and self.valid_user(request))


class OpportunityView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OpportunitySerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Opportunity.objects.filter(id=self.kwargs['id'])


