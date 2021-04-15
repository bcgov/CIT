from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests, os, json
from requests.auth import HTTPBasicAuth

from pipeline.permissions.IsAuthenticated import IsAuthenticated

class EmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request_body = request.data
        opportunity_id = request_body.get("id", -1)
        opportunity_link = request_body.get("link", None)
        if opportunity_link is not None and opportunity_id is not -1:
            token_request_body = {'grant_type': 'client_credentials'}
            response = requests.post(os.environ.get("EMAIL_AUTH_HOST") + "/auth/realms/jbd6rnxw/protocol/openid-connect/token", data=token_request_body, auth=HTTPBasicAuth(os.environ.get("EMAIL_CLIENT_ID"),os.environ.get("EMAIL_CLIENT_SECRET")))       
            if(response.status_code == 200):
                access_token = response.json()["access_token"]
                email_result = self.send_email_notification(opportunity_id, opportunity_link, access_token)
                if(email_result.status_code == 201):
                    return Response("Email sent successfully for opportunity ID " + str(request_body.get("id")), status=status.HTTP_200_OK)
                else:
                    print(email_result.text)
                    return Response("Unable to successfully send email", status=status.HTTP_502_BAD_GATEWAY)
            else:
                return Response("Unable to successfully obtain email token", status=status.HTTP_502_BAD_GATEWAY)        
        elif(opportunity_id == -1):
            return Response("An opportunity id is required", status=status.HTTP_400_BAD_REQUEST)
        elif(opportunity_link == ""):
            return Response("A relative link to the opportunity is required", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("An unknown error occured", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def send_email_notification(self, id, link, access_token):
        headers = {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
        }
        response = requests.get(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/health", headers=headers)
        if(response.status_code == 200):
            email_config = {
                "bcc": [],
                "bodyType": "html",
                "body": "<h1>A new opportunity has been submitted</h1><p>Click here to review the new opportunity: " + self.build_full_link(link) + "</p>",
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": "A New Opportunity is Available for Review",
                # TODO: Replace this address with table of admins
                "to": [os.environ.get("EMAIL_SENDING_ADDRESS")],
                "tag": "CIT_Admin_Notification",
            }
            email_config_json = json.dumps(email_config)
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config_json, headers=headers)
        return response

    def build_full_link(self, relative_link):
        return os.environ.get("EMAIL_OPPORTUNITY_LINK_HOST") + relative_link
