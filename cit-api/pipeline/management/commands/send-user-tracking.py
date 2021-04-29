from django.core.management.base import BaseCommand
from django.db import connection
from datetime import date
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
        send_tracking_email()

def send_tracking_email():
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
        today = date.today()
        start_end = calendar.monthrange(today.year, today.month)
        from_date = f"{today.year}-{today.month}-1"
        to_date = f"{today.year}-{today.month}-{start_end[1]}"
        # Get user tracking records
        csv_content = get_user_tracking(from_date, to_date)
        encoded_csv_content = encode_csv_file(csv_content)
        if response.status_code == 200:
            email_config = {
                "bcc": [],
                "bodyType": "html",
                "body": construct_email_body(from_date, to_date),
                "cc": [],
                "delayTS": 0,
                "encoding": "utf-8",
                "from": os.environ.get("EMAIL_SENDING_ADDRESS"),
                "priority": "normal",
                "subject": construct_email_body(from_date, to_date),
                "to": [os.environ.get("USER_TRACKING_TO_EMAIL")],
                "tag": "CIT_Admin_Notification",
                "attachments": [
                    {
                        "content": f"{encoded_csv_content}",
                        "encoding": "base64",
                        "filename": f"cit_user_bca_access_from_{from_date}_to_{to_date}.csv"
                    }
                ]
            }
            email_config_json = json.dumps(email_config)
            response = requests.post(os.environ.get("EMAIL_SERVICE_HOST") + "/api/v1/email", data=email_config_json, headers=headers)
        return response

def construct_email_body(from_date, to_date):
    return f"List of CIT BCA User Accesses for {from_date} to {to_date}"

def get_user_tracking(from_date, to_date):
    data_temp = StringIO()
    output = []
    writer = csv.writer(data_temp, quoting=csv.QUOTE_NONNUMERIC)
    with connection.cursor() as cursor:
        cursor.execute(
            f"SELECT ut.report_url, ut.date_viewed, u.name, u.email FROM pipeline_usertracking ut JOIN pipeline_user u ON u.id = ut.user_id WHERE ut.date_viewed BETWEEN '{from_date}'::timestamp AND '{to_date}'::timestamp;")
        columns = [col[0] for col in cursor.description]
        writer.writerow(columns)
        for row in cursor.fetchall():
            output.append(row)
        writer.writerows(output)
    data_temp.seek(0)
    return data_temp.read()

def encode_csv_file(csv_content):
    urlSafeEncodedBytes = base64.urlsafe_b64encode(csv_content.encode("utf-8"))
    urlSafeEncodedStr = str(urlSafeEncodedBytes, "utf-8")
    return urlSafeEncodedStr
