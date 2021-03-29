from rest_framework import generics
from rest_framework import status
from pipeline.models.users.tracking import UserTracking
from pipeline.serializers.users.tracking import UserTrackingSerializer
from pipeline.permissions.IsAuthenticated import IsAdminAuthenticated
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


user_id_param = openapi.Parameter('id', in_=openapi.IN_QUERY,
                                  description='Existing User ID',
                                  type=openapi.TYPE_INTEGER, required=True)
report_url_param = openapi.Parameter('id', in_=openapi.IN_QUERY,
                                     description='Report URL viewed',
                                     type=openapi.TYPE_STRING, required=True)

@swagger_auto_schema(manual_parameters=[user_id_param], method='post',
                      responses={status.HTTP_200_OK: UserTrackingSerializer()})
@api_view(methods=['post'])
class UserTrackingView(generics.CreateAPIView):
    model=UserTracking
    serializer_class = UserTrackingSerializer
    permission_classes = [IsAdminAuthenticated]