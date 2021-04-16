from rest_framework import status
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from pipeline.models.users.user import User, Assignments
from pipeline.models.general import Municipality, RegionalDistrict

from pipeline.serializers.users.user import UserGetSerializer, UserPostSerializer
from pipeline.permissions.IsAuthenticated import IsAdminAuthenticated


def get_row(user):
    """
    Builds a user response dictionary from a user(s) request
    """
    response = dict()
    response['municipalities'] = []
    response['regional_districts'] = []
    response['id'] = user.id
    response['name'] = user.name
    response['email'] = user.email
    response['role'] = user.role
    response['date_created'] = user.date_created.strftime("%Y-%b-%d")
    response['is_admin'] = user.is_admin
    for assignment in user.assignments_set.all():
        try:
            municipality = Municipality.objects.get(id=assignment.municipality_id)
            response['municipalities'].append({'id': municipality.id, 'name': municipality.name})
        except Municipality.DoesNotExist:
            pass
        try:
            reg = RegionalDistrict.objects.get(id=assignment.regional_district_id)
            response['regional_districts'].append({'id': reg.id, 'name': reg.name})
        except RegionalDistrict.DoesNotExist:
            pass

    return response


class UserListView(GenericAPIView):
    """
    View to retrieve a list of users
    """
    serializer_class = UserGetSerializer(many=True)
    permission_classes = [IsAdminAuthenticated]

    user_email_param = openapi.Parameter('email',
                                         in_=openapi.IN_QUERY,
                                         description='User Email',
                                         type=openapi.TYPE_STRING,
                                         required=False)

    @swagger_auto_schema(manual_parameters=[user_email_param],
                         method='GET',
                         responses={status.HTTP_200_OK: UserGetSerializer(many=True)})
    @action(detail=False, methods=['get'])
    def get(self, request, format=None):
        """
        Get override
        """
        response = []
        user_id = request.query_params.get('id')
        user_email = request.query_params.get('email')
        if user_email is not None:
            users = User.objects.filter(email=user_email, deleted=False)
        elif user_id is not None:
            users = User.objects.filter(id=user_id, deleted=False)
        else:
            users = User.objects.filter(deleted=False)
        for user in users:
            response.append(get_row(user))
        return Response(response)


class UserView(GenericAPIView):
    """
    View to save details of a single user
    """
    serializer_class = UserPostSerializer
    permission_classes = [IsAdminAuthenticated]

    @swagger_auto_schema(request_body=UserPostSerializer,
                         method='POST',
                         responses={status.HTTP_200_OK: UserGetSerializer(many=True)})
    @action(detail=False, methods=['post'])
    def post(self, request, format=None):
        """
        Post override
        """
        user_name = request.data.get('name', None)
        user_email = request.data.get('email', None)
        user_role = request.data.get('role', None)
        assignment_municipality = int(request.data.get('municipality', 0))
        assignment_regional_district = int(request.data.get('regional_district', 0))

        try:
            user = User.objects.get(email=user_email)
            user.name = user_name
            user.role = user_role
            user.save()
        except User.DoesNotExist:
            user = User.objects.create(name=user_name, email=user_email, role=user_role)

        if assignment_municipality != 0 and len(
                user.assignments_set.filter(municipality_id=assignment_municipality)) == 0:
            try:
                municipality = Municipality.objects.get(id=assignment_municipality)
                user.assignments_set.add(
                    Assignments.objects.create(user=user, municipality=municipality))
            except Municipality.DoesNotExist:
                return Response({'message': 'The assigned Municipality does not exist'},
                                status=status.HTTP_400_BAD_REQUEST)

        # Only assign regional District if not assigning a municipality
        # TODO: Evaluate this use case with client
        if assignment_regional_district != 0 and assignment_municipality == 0 and len(
                user.assignments_set.filter(
                    regional_district_id=assignment_regional_district)) == 0:
            try:
                regional_district = RegionalDistrict.objects.get(id=assignment_regional_district)
                user.assignments_set.add(
                    Assignments.objects.create(user=user, regional_district=regional_district))
            except RegionalDistrict.DoesNotExist:
                return Response({'message': 'The assigned Regional District does not exist'},
                                status=status.HTTP_400_BAD_REQUEST)
        response = get_row(user)
        return Response(response)
    
    def put(self, request, format=None):
        user_email = request.data.get('email', None)
        assignment_municipalities = [x['id'] for x in request.data.get('municipalities', [])]
        assignment_regional_districts = [x['id'] for x in request.data.get('regionalDistricts', [])]
        print(request.data)
        try:
            user = User.objects.get(email=user_email)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'},
                            status=status.HTTP_400_BAD_REQUEST)

        assignments = user.assignments_set.all()
        for assignment in assignments:
            if assignment.municipality is not None and assignment.municipality.id not in assignment_municipalities:
                assignment.delete()

        # Only assign Regional District if not assigning a municipality
        # TODO: Evaluate this use case with client
        assignments = user.assignments_set.all()
        for assignment in assignments:
            if assignment.regional_district is not None and assignment.regional_district.id not in assignment_regional_districts:
                assignment.delete()

        user_is_admin = request.data.get('is_admin', None)
        if user_is_admin is not None:
            user.is_admin = user_is_admin
            user.save()
        
        return Response({'message' :'ok'}, status.HTTP_202_ACCEPTED)


    def delete(self, request, format=None):
        """
        Post override
        """
        user_id = request.query_params.get('id', None)

        try:
            user = User.objects.get(id=user_id)
            user.deleted = True
            user.save()
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'},
                            status=status.HTTP_400_BAD_REQUEST)
    
        return Response({'message' :'ok'}, status.HTTP_202_ACCEPTED)

