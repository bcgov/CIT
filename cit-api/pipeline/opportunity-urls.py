from django.conf.urls import url
from django.urls import path, include

from rest_framework.routers import DefaultRouter

import pipeline.views.opportunity
import pipeline.views.options
import pipeline.views.proximity
import pipeline.views.user

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    
    url(r"^list/$", pipeline.views.opportunity.OpportunitiesList.as_view()),
    url(r"^single/$", pipeline.views.opportunity.OpportunityCreateView.as_view()),
    url(r"^single/(?P<id>\w+)/$", pipeline.views.opportunity.OpportunityView.as_view()),
    url(r"^options/$", pipeline.views.options.OptionsView.as_view()),
    url(r"^proximity/$", pipeline.views.proximity.ProximityView.as_view()),
    url(r"^user/$", pipeline.views.user.UserView.as_view()),
    url(r"^users/$", pipeline.views.user.UserListView.as_view()),
]
