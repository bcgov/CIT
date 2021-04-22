from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests, os, json
from requests.auth import HTTPBasicAuth

from pipeline.permissions.IsAuthenticated import IsAuthenticated, IsAdminAuthenticated
from pipeline.models.users.user import User
from pipeline.models.opportunity import Opportunity

class EmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email_enabled = os.environ.get("EMAIL_NOTIFICATIONS_ENABLED")
        if email_enabled not in ["True", "true"]:
            return Response("Email notifications are currently disabled", status=status.HTTP_503_SERVICE_UNAVAILABLE)
        request_body = request.data
        opportunity_id = request_body.get("id", -1)
        opportunity_link = request_body.get("link", None)
        if opportunity_link is not None and opportunity_id is not -1:
            token_request_body = {'grant_type': 'client_credentials'}
            response = requests.post(os.environ.get("EMAIL_AUTH_HOST") + "/auth/realms/jbd6rnxw/protocol/openid-connect/token", data=token_request_body, auth=HTTPBasicAuth(os.environ.get("EMAIL_CLIENT_ID"),os.environ.get("EMAIL_CLIENT_SECRET")))       
            if response.status_code == 200:
                access_token = response.json()["access_token"]
                email_result = self.send_email_notification(opportunity_id, opportunity_link, access_token)
                if email_result.status_code == 201:
                    return Response("Email sent successfully for opportunity ID " + str(request_body.get("id")), status=status.HTTP_200_OK)
                else:
                    print(email_result)
                    return Response("Unable to successfully send email", status=status.HTTP_502_BAD_GATEWAY)
            else:
                return Response("Unable to successfully obtain email token", status=status.HTTP_502_BAD_GATEWAY)        
        elif opportunity_id == -1:
            return Response("An opportunity id is required", status=status.HTTP_400_BAD_REQUEST)
        elif opportunity_link == "":
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
                "body": "<h1>A new opportunity has been submitted</h1><p>Click here to review the new opportunity: " + build_full_link(link) + "</p>",
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": "A New Opportunity is Available for Review",
                "to": self.get_admin_email_addresses(),
                "tag": "CIT_Admin_Notification",
            }
            email_config_json = json.dumps(email_config)
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config_json, headers=headers)
        return response

    def get_admin_email_addresses(self):
        return list(User.objects.filter(is_admin=True,deleted=False).exclude(email__in=['', 'Unknown']).values_list('email', flat=True))

class EdoEmailView(APIView):
    permission_classes = [IsAdminAuthenticated]

    def post(self, request):
        email_enabled = os.environ.get("EMAIL_NOTIFICATIONS_ENABLED")
        if email_enabled not in ["True", "true"]:
            return Response("Email notifications are currently disabled", status=status.HTTP_503_SERVICE_UNAVAILABLE)
        request_body = request.data
        opportunity_id = request_body.get("id", -1)
        opportunity_link = request_body.get("link", None)
        if opportunity_link is not None and opportunity_id is not -1:
            token_request_body = {'grant_type': 'client_credentials'}
            response = requests.post(os.environ.get("EMAIL_AUTH_HOST") + "/auth/realms/jbd6rnxw/protocol/openid-connect/token", data=token_request_body, auth=HTTPBasicAuth(os.environ.get("EMAIL_CLIENT_ID"),os.environ.get("EMAIL_CLIENT_SECRET")))
            if response.status_code == 200:
                access_token = response.json()["access_token"]
                email_result = self.send_edo_published_notification(opportunity_id, opportunity_link, access_token)
                if email_result.status_code == 201:
                    return Response("Email sent successfully for opportunity ID " + str(request_body.get("id")), status=status.HTTP_200_OK)
                else:
                    print(email_result)
                    return Response("Unable to successfully send email", status=status.HTTP_502_BAD_GATEWAY)
            else:
                return Response("Unable to successfully obtain email token", status=status.HTTP_502_BAD_GATEWAY)        
        elif opportunity_id == -1:
            return Response("An opportunity id is required", status=status.HTTP_400_BAD_REQUEST)
        elif opportunity_link == "":
            return Response("A relative link to the opportunity is required", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("An unknown error occured", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def send_edo_published_notification(self, id, link, access_token):
        headers = {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
        }
        response = requests.get(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/health", headers=headers)
        if(response.status_code == 200):
            email_config = {
                "bcc": [],
                "bodyType": "html",
                "body": "<h1>The opportunity you submitted has been published.</h1><p>Click here to view your published opportunity: " + build_full_link(link) + "</p>",
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": "Your Opportunity has been Published",
                "to": [self.get_edo_email_for_opportunity(id)],
                "tag": "CIT_Admin_Notification",
            }
            email_config_json = json.dumps(email_config)
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config_json, headers=headers)
        return response

    def get_edo_email_for_opportunity(self, id):
        opportunity = Opportunity.objects.get(id=id)
        edo = User.objects.get(id=opportunity.user_id)
        return edo.email

def build_full_link(relative_link):
    return os.environ.get("EMAIL_OPPORTUNITY_LINK_HOST") + relative_link