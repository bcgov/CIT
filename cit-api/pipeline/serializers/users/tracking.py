from rest_framework import serializers
from pipeline.models.users.tracking import UserTracking


class UserTrackingSerializer(serializers.ModelSerializer):
    """
    User serializer to control user tracking
    """
    user_id = serializers.IntegerField()

    class Meta:
        model = UserTracking
        fields = ('user_id', 'report_url')
