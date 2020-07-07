from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView, TemplateView

from rest_framework.schemas import get_schema_view

import pipeline.views


urlpatterns = [

    url(r"^auth/$", pipeline.views.auth),
    url(r"^locations/$", pipeline.views.LocationList.as_view()),
    url(r"^communities/$", pipeline.views.CommunityList.as_view()),
    url(r"^censussubdivisions/$", pipeline.views.CensusSubdivisionList.as_view()),

    path('openapi', get_schema_view(
        title="CIT",
        description="API for CIT",
        version="1.0.0"
    ), name='openapi-schema'),
    path('api/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
]
