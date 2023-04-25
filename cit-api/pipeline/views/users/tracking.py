from rest_framework import generics
from pipeline.models.users.tracking import UserTracking
from pipeline.serializers.users.tracking import UserTrackingSerializer
from pipeline.permissions.IsAuthenticated import IsAdminAuthenticated


class UserTrackingView(generics.CreateAPIView):
    """
    User tracking endpoint for IDIR users
    """
    model = UserTracking
    serializer_class = UserTrackingSerializer