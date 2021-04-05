from django.conf.urls import url
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from pipeline.views.opportunity.create import OpportunityCreateView
from pipeline.views.opportunity.edit import OpportunityView
from pipeline.views.opportunity.get import OpportunityGetView
from pipeline.views.opportunity.list import OpportunitiesList
import pipeline.views.options
import pipeline.views.proximity
import pipeline.views.users.user
import pipeline.views.users.tracking

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),

    url(r"^list/$", OpportunitiesList.as_view()),
    url(r"^single/$", OpportunityCreateView.as_view()),
    url(r"^single/(?P<id>\w+)/$", OpportunityGetView.as_view()),
    url(r"^single/edit/(?P<id>\w+)/$", OpportunityView.as_view()),
    url(r"^options/$", pipeline.views.options.OptionsView.as_view()),
    url(r"^proximity/$", pipeline.views.proximity.ProximityView.as_view()),
    url(r"^users/$", pipeline.views.users.user.UserListView.as_view()),
    url(r"^user/add/$", pipeline.views.users.user.UserAddView.as_view()),
    url(r"^user/tracking/$", pipeline.views.users.tracking.UserTrackingView.as_view()),
]
