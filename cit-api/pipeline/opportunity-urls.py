from django.urls import path, re_path, include

from rest_framework.routers import DefaultRouter

from pipeline.views.opportunity.create import OpportunityCreateView
from pipeline.views.opportunity.edit import OpportunityView
from pipeline.views.opportunity.get import OpportunityGetView
from pipeline.views.opportunity.list import OpportunitiesList
from pipeline.views.opportunity.export import OpportunitiesListExport
from pipeline.views.options import OptionsView
from pipeline.views.options import CensusEconomicRegionOptions
from pipeline.views.options import CensusSubdivisionOptions
from pipeline.views.options import CommunityOptions
from pipeline.views.options import HealthAuthorityBoundaryOptions
from pipeline.views.options import NaturalResourceRegionOptions
from pipeline.views.options import RegionalDistrictOptions
from pipeline.views.options import SchoolDistrictOptions
from pipeline.views.options import TourismRegionOptions
from pipeline.views.options import TsunamiZoneOptions
from pipeline.views.options import WildfireZoneOptions

import pipeline.views.proximity
import pipeline.views.users.user
import pipeline.views.users.tracking

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    re_path(r"^export/$", OpportunitiesListExport.as_view()),
    re_path(r"^list/$", OpportunitiesList.as_view()),
    re_path(r"^single/$", OpportunityCreateView.as_view()),
    re_path(r"^single/(?P<id>\w+)/$", OpportunityGetView.as_view()),
    re_path(r"^single/edit/(?P<id>\w+)/$", OpportunityView.as_view()),
    re_path(r"^options/$", OptionsView.as_view()),
    re_path(r"^options/census-economic-regions/$", CensusEconomicRegionOptions.as_view()),
    re_path(r"^options/census-subdivisions/$", CensusSubdivisionOptions.as_view()),
    re_path(r"^options/communities/$", CommunityOptions.as_view()),
    re_path(r"^options/health-authority-boundaries/$", HealthAuthorityBoundaryOptions.as_view()),
    re_path(r"^options/natural-resource-regions/$", NaturalResourceRegionOptions.as_view()),
    re_path(r"^options/regional-districts/$", RegionalDistrictOptions.as_view()),
    re_path(r"^options/school-districts/$", SchoolDistrictOptions.as_view()),
    re_path(r"^options/tourism-regions/$", TourismRegionOptions.as_view()),
    re_path(r"^options/tsunami-zones/$", TsunamiZoneOptions.as_view()),
    re_path(r"^options/wildfire-zones/$", WildfireZoneOptions.as_view()),
    re_path(r"^proximity/$", pipeline.views.proximity.ProximityView.as_view()),
    re_path(r"^users/$", pipeline.views.users.user.UserListView.as_view()),
    re_path(r"^user/$", pipeline.views.users.user.UserView.as_view()),
    re_path(r"^user/tracking/$", pipeline.views.users.tracking.UserTrackingView.as_view()),
]