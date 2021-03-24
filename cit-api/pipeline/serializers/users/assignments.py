from rest_framework import serializers
from pipeline.models.users.user import Assignments


class AssignmentsSerializer(serializers.ModelSerializer):
    """
    Assignments serializer to control assignments shape
    """
    class Meta:
        model = Assignments
        fields = ('user', 'municipality', 'regional_district')
