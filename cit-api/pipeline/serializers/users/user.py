from rest_framework import serializers
from rest_framework.fields import IntegerField
from pipeline.models.users.user import User
from .assignments import AssignmentsSerializer


class UserGetSerializer(serializers.ModelSerializer):
    assignments = AssignmentsSerializer(required=False)

    """
    User serializer to control user shape
    """
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'role', 'date_created', 'assignments')


class UserPostSerializer(serializers.ModelSerializer):
    """
    User serializer to control user shape
    """
    municipality = IntegerField()
    regional_district = IntegerField()

    class Meta:
        model = User
        fields = ('name', 'email', 'role', 'municipality', 'regional_district')
