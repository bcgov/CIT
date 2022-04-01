from django.core.management.base import BaseCommand
from django.db import connection
from datetime import date, timedelta
import csv
import os
import requests
import json
from io import StringIO
from requests.auth import HTTPBasicAuth
import calendar
import base64


class Command(BaseCommand):
    def handle(self, *args, **options):
        print("Status of data import pipeline getting ready to send...")
        response = send_pipeline_status_email()
        if response is not None and response.status_code == 201:
            print("Status report sent!")
        else:
            if response is not None:
                print(response.text)
            print("Status report could not send!")

def send_pipeline_status_email():
    token_request_body = {'grant_type': 'client_credentials'}
    response = requests.post(os.environ.get("EMAIL_AUTH_HOST") + "/auth/realms/jbd6rnxw/protocol/openid-connect/token",
                             data=token_request_body, auth=HTTPBasicAuth(os.environ.get("EMAIL_CLIENT_ID"), os.environ.get("EMAIL_CLIENT_SECRET")))
    if response.status_code == 200:
        access_token = response.json()["access_token"]
        headers = {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
        }
        response = requests.get(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/health", headers=headers)
        # Get time span
        if response.status_code == 200:
            email_config = {
                "bcc": [],
                "bodyType": "html",
                "body": construct_email_body(),
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": construct_email_subject(),
                "to": [os.environ.get("USER_TRACKING_TO_EMAIL")],
                "tag": "CIT_Pipeline_Notification",
            }
            email_config_json = json.dumps(email_config)
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config_json, headers=headers)
        return response
    else:
        print(response.text)

def construct_email_body():
    return f"The data import pipeline", os.environ.get("BUCKET_COMMAND"), "has completed", os.environ.get("JOB_STATUS")

def construct_email_subject():
    return f"The scheduled job", os.environ.get("BUCKET_COMMAND"), "was", os.environ.get("JOB_STATUS")