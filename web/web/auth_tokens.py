import datetime
import os

import dateutil.parser
import msal

from django.core.cache import cache
from django.http import JsonResponse

import requests
s = requests.Session()
s.proxies = {}

if "DJANGO_HTTP_PROXY" in os.environ:
  s.proxies["http"] = os.environ.get("DJANGO_HTTP_PROXY")

if "DJANGO_HTTPS_PROXY" in os.environ:
  s.proxies["https"] = os.environ.get("DJANGO_HTTPS_PROXY")


def get_access_token(request):
    '''Returns AAD token using MSAL'''

    existing_access_token = cache.get('access_token')
    existing_access_token_expiry = cache.get('access_token_expiry')

    if existing_access_token and existing_access_token_expiry:
        expires_in = dateutil.parser.parse(existing_access_token_expiry) - datetime.datetime.now()
        if expires_in > datetime.timedelta(minutes=30):
            print("returning existing access token which expires at {}".format(expires_in))
            return JsonResponse({
                "access_token": existing_access_token
            })

    response = None
    try:
        authority = os.environ.get('AUTHORITY') + os.environ.get('TENANT_ID')

        clientapp = msal.ConfidentialClientApplication(
            os.environ.get('CLIENT_ID'), client_credential=os.environ.get('CLIENT_SECRET'), authority=authority,
            http_client=s)

        # Retrieve Access token from cache if available
        response = clientapp.acquire_token_silent(scopes=[os.environ.get('SCOPE')], account=None)
        if not response:
            # Make a client call if Access token is not available in cache
            response = clientapp.acquire_token_for_client(scopes=[os.environ.get('SCOPE')])
        try:
            access_token = response['access_token']
            expires_in = response['expires_in']
            expiry_date = datetime.datetime.now() + datetime.timedelta(seconds=expires_in)

            cache.set('access_token', access_token)
            cache.set('access_token_expiry', expiry_date.isoformat())
            return JsonResponse({
                "access_token": access_token
            })
        except KeyError:
            raise Exception(response['error_description'])

    except Exception as ex:
        raise Exception('Error retrieving Access token\n' + str(ex))
