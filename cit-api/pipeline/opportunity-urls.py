from django.conf.urls import url
from django.urls import path, include

from rest_framework.routers import DefaultRouter

import pipeline.views.opportunity
import pipeline.views.options
import pipeline.views.proximity
import pipeline.views.users.user

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),

    url(r"^list/$", pipeline.views.opportunity.OpportunitiesList.as_view()),
    url(r"^single/$", pipeline.views.opportunity.OpportunityCreateView.as_view()),
    url(r"^single/(?P<id>\w+)/$",
        pipeline.views.opportunity.OpportunityView.as_view()),
    url(r"^options/$", pipeline.views.options.OptionsView.as_view()),
    url(r"^proximity/$", pipeline.views.proximity.ProximityView.as_view()),
    url(r"^users/$", pipeline.views.users.user.UserListView.as_view()),
    url(r"^user/add/$", pipeline.views.users.user.UserAddView.as_view()),
]
