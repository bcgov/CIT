from django.urls import path, re_path, include

from rest_framework.routers import DefaultRouter

import pipeline.views.general
import pipeline.views.location_types

router = DefaultRouter()
router.register(r'communities', pipeline.views.general.CommunityViewSet, basename='communities')
router.register(r'regionaldistricts',
                pipeline.views.general.RegionalDistrictViewSet,
                basename='regionaldistricts')

urlpatterns = [
    path("", include(router.urls)),
    re_path(r"^locations/geojson/$", pipeline.views.location_types.LocationGeoJSONList.as_view()),
    re_path(r"^locations/first_responders/$",
        pipeline.views.location_types.FirstResponderList.as_view()),
    re_path(r"^locations/diagnostic_facilities/$",
        pipeline.views.location_types.DiagnosticFacilityList.as_view()),
    re_path(r"^locations/timber_facilities/$",
        pipeline.views.location_types.TimberFacilityList.as_view()),
    re_path(r"^locations/civic_facilities/$",
        pipeline.views.location_types.CivicFacilityList.as_view()),
    re_path(r"^locations/hospitals/$", pipeline.views.location_types.HospitalList.as_view()),
    re_path(r"^locations/projects/latest/$", pipeline.views.location_types.LatestProjectList.as_view()),
    re_path(r"^locations/projects/$", pipeline.views.location_types.ProjectList.as_view()),
    re_path(r"^locations/servicebc_locations/$",
        pipeline.views.location_types.ServiceBCLocationList.as_view()),
    re_path(r"^locations/schools/$", pipeline.views.location_types.SchoolList.as_view()),
    re_path(r"^locations/post_secondary_institutions/$",
        pipeline.views.location_types.PostSecondaryInstitutionList.as_view()),
    re_path(r"^locations/clinics/$", pipeline.views.location_types.ClinicList.as_view()),
    re_path(r"^locations/courts/$", pipeline.views.location_types.CourtList.as_view()),
    re_path(r"^locations/research_centres/$",
        pipeline.views.location_types.ResearchCentreList.as_view()),
    re_path(r"^locations/airports/$", pipeline.views.location_types.AirportList.as_view()),
    re_path(r"^locations/$", pipeline.views.location_types.LocationList.as_view()),
    re_path(r"^datasources/$", pipeline.views.general.DataSourcesList.as_view()),
    re_path(r"^services/$", pipeline.views.general.ServiceList.as_view()),
    re_path(r"^locationdistances/$", pipeline.views.general.LocationDistanceList.as_view()),
    re_path(r"^schooldistricts/$", pipeline.views.general.SchoolDistrictList.as_view()),
    re_path(r"^pageviews/$", pipeline.views.general.PageViewList.as_view()),
]
