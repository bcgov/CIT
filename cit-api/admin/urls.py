"""web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers
from pipeline.views.file_upload import FileUploadViewSet

from admin import auth_tokens

router = routers.DefaultRouter()
router.register(r'file', FileUploadViewSet, basename='file')


def fail(request):
    raise Exception()


schema_view = get_schema_view(
    openapi.Info(
        title="CIT API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[
        permissions.AllowAny,
    ],
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r"^api/pipeline/", include('pipeline.pipeline-urls')),
    re_path(r"^api/opportunity/", include('pipeline.opportunity-urls')),
    re_path(r"^api/email/", include('pipeline.email-urls')),
    re_path(r"^api/token/", auth_tokens.get_access_token),
    re_path(r"^upload/", include(router.urls)),
    re_path(r"^api/health/fail/", fail),
]

urlpatterns += staticfiles_urlpatterns()
