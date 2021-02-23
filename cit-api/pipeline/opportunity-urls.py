from django.conf.urls import url
from django.urls import path, include

from rest_framework.routers import DefaultRouter

import pipeline.views.opportunity

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    
    url(r"^list/$", pipeline.views.opportunity.OpportunitiesList.as_view()),
    url(r"^single/$", pipeline.views.opportunity.Opportunity.as_view()),
]
