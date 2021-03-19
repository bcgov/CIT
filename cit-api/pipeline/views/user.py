from rest_framework import status
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response

from pipeline.models.users.user import User, Assignments
from pipeline.models.general import Municipality, RegionalDistrict

# returns dict from user object
def get_row(user):
    response = dict()
    response['municipalities'] = []
    response['regional_districts'] = []
    response['name'] = user.name
    response['email'] = user.email
    response['date_created'] = user.date_created.strftime("%Y-%b-%d")
    for assignment in user.assignments_set.all():
        muni = Municipality.objects.get(id=assignment.municipality_id)
        reg = RegionalDistrict.objects.get(id=assignment.municipality_id)
        if muni:
            response['municipalities'].append({'id': muni.id, 'name': muni.name})
        if reg:
            response['regional_districts'].append({'id': reg.id, 'name': reg.name})

    return response

class UserView(APIView):        
    def get(self, request, format=None):
        id = request.query_params.get('id', None)
        if id is None:
            return Response({'message': 'This is a bad request'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(id=id)
        response = get_row(user)
        return Response(response)

class UserListView(APIView):
    def get(self, request, format=None):
        response = []
        users = User.objects.all()
        for user in users:
            response.append(get_row(user))
        return Response(response)