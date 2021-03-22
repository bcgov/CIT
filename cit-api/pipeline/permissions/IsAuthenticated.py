import os
from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakConnectionError, KeycloakGetError, KeycloakAuthenticationError 
from rest_framework.permissions import BasePermission, SAFE_METHODS

def valid_user(request, roles):
    try:
        # Configure client
        keycloak_openid = KeycloakOpenID(server_url=os.environ.get('KEY_CLOAK_URL'),
                                          client_id=os.environ.get('KEY_CLOAK_CLIENT'),
                                          realm_name=os.environ.get('KEY_CLOAK_REALM'))

        # Get WellKnow
        config_well_know = keycloak_openid.well_know()

        # Get Userinfo
        userinfo = keycloak_openid.userinfo(request.headers['Authorization'][7:])

        # Use Userinfo to validate permissions
        return any(i in roles for i in userinfo['roles'])
    except KeycloakConnectionError:
        self.message = 'Cannot connect to authorization server'
    except AttributeError:
        self.message = 'Authorization response in bad format'
    except KeyError:
        self.message = 'Must supply an Authorization token'
    except KeycloakGetError:
        self.message = 'Failed to recieve userinfo'
    except KeycloakAuthenticationError:
        self.message = 'Authorization token in not valid'
    return False

class IsAuthenticated(BasePermission):
    message = 'Insufficent user permission.'

    def valid_user(self, request):
        return valid_user(request, ["IDIR", "BCeID"])
  
    def has_permission(self, request, view):
        return request.method == "GET" or (request.method not in SAFE_METHODS and self.valid_user(request))

class IsAdminAuthenticated(BasePermission):
    message = 'Insufficent user permission.'

    def valid_user(self, request):
        return valid_user(request, ["IDIR"])

    def has_permission(self, request, view):
        return request.method == "GET" or (request.method not in SAFE_METHODS and self.valid_user(request))