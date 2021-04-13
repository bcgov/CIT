from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from pipeline.permissions.IsAuthenticated import IsAuthenticated

class EmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request_body = request.data
        print(request_body)
        if request_body is not None and request_body.get("id", -1) is not -1:
            opportunity_id = request_body.get("id")
            print(opportunity_id)
            return Response("Email sent successfully for opportunity ID " + str(request_body.get("id")), status=status.HTTP_200_OK)
        else:
            return Response("An opportunity id is required", status=status.HTTP_400_BAD_REQUEST)
