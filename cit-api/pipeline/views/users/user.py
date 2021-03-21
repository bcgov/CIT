from rest_framework import status
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from pipeline.models.users.user import User, Assignments
from pipeline.models.general import Municipality, RegionalDistrict


from pipeline.serializers.users.user import UserGetSerializer, UserPostSerializer


def get_row(user):
    """
    Builds a user response dictionary from a user(s) request
    """
    response = dict()
    response['municipalities'] = []
    response['regional_districts'] = []
    response['name'] = user.name
    response['email'] = user.email
    response['date_created'] = user.date_created.strftime("%Y-%b-%d")
    for assignment in user.assignments_set.all():
        municipality = Municipality.objects.get(id=assignment.municipality_id)
        reg = RegionalDistrict.objects.get(id=assignment.municipality_id)
        if municipality:
            response['municipalities'].append(
                {'id': municipality.id, 'name': municipality.name})
        if reg:
            response['regional_districts'].append(
                {'id': reg.id, 'name': reg.name})

    return response


class UserListView(GenericAPIView):
    """
    View to retrieve a list of users
    """
    serializer_class = UserGetSerializer(many=True)

    def get(self, request, format=None):
        """
        Get override
        """
        response = []
        users = User.objects.all()
        for user in users:
            response.append(get_row(user))
        return Response(response)


class UserAddView(GenericAPIView):
    """
    View to save details of a single user
    """
    serializer_class = UserPostSerializer

    def post(self, request, format=None):
        """
        Post override
        """
        user_name = request.data.get('name', None)
        user_email = request.data.get('email', None)
        assignment_municipality = request.data.get('municipality', 0)
        assignment_regional_district = request.data.get(
            'regional_district', 0)

        user = User.objects.get(email=user_email)
        if user is None:
            user = User.objects.create(name=user_name, email=user_email)

        if assignment_municipality != 0:
            municipality = Municipality.objects.get(id=assignment_municipality)
            user.assignments_set.add(Assignments.objects.create(
                user=user, municipality=municipality))
        # Only assign regional District if not assign municipality
        # TODO: Evaluate this use case with client
        if assignment_regional_district != 0 and assignment_municipality == 0:
            regional_district = RegionalDistrict.objects.get(
                id=assignment_regional_district)
            user.assignments_set.add(Assignments.objects.create(
                user=user, regional_district=regional_district))
        response = get_row(user)
        return Response(response)
