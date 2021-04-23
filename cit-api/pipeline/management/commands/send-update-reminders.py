from django.core.management.base import BaseCommand
from django.utils.timezone import now
from datetime import timedelta
import os, requests, json
from requests.auth import HTTPBasicAuth

from pipeline.models.opportunity import Opportunity
from pipeline.models.users.user import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        email_enabled = os.environ.get("EMAIL_NOTIFICATIONS_ENABLED")
        if email_enabled not in ["True", "true"]:
            print("Email notifications are not currently enabled")
            return
        stale_time = now() - timedelta(days=90)
        print("Notifying opportunities last modified before: " + str(stale_time))
        stale_opportunities = Opportunity.objects.filter(date_updated__lte=stale_time,deleted=False,approval_status="PUBL").exclude(user_id__email__in=['', 'Unknown'])
        print("Total stale opportunities to be notified:" + str(stale_opportunities.count()))

        email_opportunity_mapping = {}
        for opportunity in stale_opportunities:
            print("Sending notification for opportunity with ID " + str(opportunity.id))
            edo_email = get_edo_email_for_opportunity(opportunity.id)
            if edo_email in email_opportunity_mapping:
                email_opportunity_mapping[edo_email].append(opportunity)
            else:
                email_opportunity_mapping[edo_email] = [opportunity]

        for email in email_opportunity_mapping:
            print(email)
            email_result = send_reminder_email(email, email_opportunity_mapping[email])
            if email_result.status_code == 201:
                print("Successfully sent notification for opportunity with ID " + str([mapped_opportunity.id for mapped_opportunity in email_opportunity_mapping[email]]))
            else:
                print("Error from email API: " + str(email_result.status_code))
                print("Unable to send notification for opportunity with ID " + str([mapped_opportunity.id for mapped_opportunity in email_opportunity_mapping[email]]))
                print(email_result.text)

def send_reminder_email(email, opportunity_list):
    token_request_body = {'grant_type': 'client_credentials'}
    response = requests.post(os.environ.get("EMAIL_AUTH_HOST") + "/auth/realms/jbd6rnxw/protocol/openid-connect/token", data=token_request_body, auth=HTTPBasicAuth(os.environ.get("EMAIL_CLIENT_ID"),os.environ.get("EMAIL_CLIENT_SECRET")))       
    if response.status_code == 200:
        access_token = response.json()["access_token"]
        headers = {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
        }
        response = requests.get(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/health", headers=headers)
        if response.status_code == 200:
            email_config = {
                "bcc": [],
                "bodyType": "html",
                "body": construct_email_body(opportunity_list),
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": "You Have Opportunities That Have Not Been Modified For 90 Days",
                "to": [email],
                "tag": "CIT_Admin_Notification",
            }
            email_config_json = json.dumps(email_config)
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config_json, headers=headers)
        return response

def construct_email_body(opportunity_list):
    opportunity_email_string = ""
    for opportunity in opportunity_list:
        opportunity_email_string = opportunity_email_string + "<p>"    
        if opportunity.opportunity_address != "":
            opportunity_email_string = opportunity_email_string + opportunity.opportunity_address + " - "
        else:
            opportunity_email_string = opportunity_email_string + "No address - "
        opportunity_email_string = opportunity_email_string + "Created on " + str(opportunity.date_created)
        opportunity_email_string = opportunity_email_string + "</p>"

    return "<h1>You have opportunities that have not been modified for 90 days.</h1><p>These opportunities must be reviewed:</p>" + opportunity_email_string + "<p>Please click here to view your dashboard, and update any information that has changed: " + build_full_link() + "</p>"

def get_edo_email_for_opportunity(id):
    opportunity = Opportunity.objects.get(id=id)
    edo = User.objects.get(id=opportunity.user_id)
    return edo.email

def build_full_link():
    return os.environ.get("EMAIL_OPPORTUNITY_LINK_HOST") + "/investmentopportunities/dashboard"
