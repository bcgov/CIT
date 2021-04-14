from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests, os
from requests.auth import HTTPBasicAuth

from pipeline.permissions.IsAuthenticated import IsAuthenticated

class EmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request_body = request.data
        opportunity_id = request_body.get("id", -1)
        if opportunity_id is not None and opportunity_id is not -1:
            token_request_body = {'grant_type': 'client_credentials'}
            response = requests.post(os.environ.get("EMAIL_AUTH_HOST") + "/auth/realms/jbd6rnxw/protocol/openid-connect/token", data=token_request_body, auth=HTTPBasicAuth(os.environ.get("EMAIL_CLIENT_ID"),os.environ.get("EMAIL_CLIENT_SECRET")))       
            if(response.status_code == 200):
                access_token = response.json()["access_token"]
                email_result = self.send_email_notification(opportunity_id, access_token)
                if(email_result.status_code == 200):
                    return Response("Email sent successfully for opportunity ID " + str(request_body.get("id")), status=status.HTTP_200_OK)
                else:
                    print(email_result.text)
                    return Response("Unable to successfully send email", status=status.HTTP_502_BAD_GATEWAY)
            else:
                return Response("Unable to successfully obtain email token", status=status.HTTP_502_BAD_GATEWAY)        
        else:
            return Response("An opportunity id is required", status=status.HTTP_400_BAD_REQUEST)

    def send_email_notification(self, id, access_token):
        headers = {"Authorization": "Bearer " + access_token}
        response = requests.get(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/health", headers=headers)
        if(response.status_code == 200):
            email_config = {
                "bcc": [],
                "bodyType": "html",
                "body": "<h1>A new opportunity has been submitted</h1><p>The ID of this opportunity is " + str(id) + "</p>",
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": "A New Opportunity is Available for Review",
                "to": ["brendan.beach@nttdata.com"], #os.environ.get("EMAIL_SENDING_ADDRESS"),
                "tag": "CIT_Admin_Notification",
            }
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config, headers=headers)
        return response