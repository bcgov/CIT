from django.conf.urls import url
from django.urls import path, include
from django.views.generic import TemplateView

from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

import pipeline.views.general
import pipeline.views.location_types

router = DefaultRouter()
router.register(r'communities', pipeline.views.general.CommunityViewSet, basename='communities')
router.register(r'regionaldistricts', pipeline.views.general.RegionalDistrictViewSet, basename='regionaldistricts')


urlpatterns = [
    path("", include(router.urls)),

    url(r"^auth/$", pipeline.views.general.auth),
    url(r"^locations/geojson/$", pipeline.views.location_types.LocationGeoJSONList.as_view()),
    url(r"^locations/first_responders/$", pipeline.views.location_types.FirstResponderList.as_view()),
    url(r"^locations/diagnostic_facilities/$", pipeline.views.location_types.DiagnosticFacilityList.as_view()),
    url(r"^locations/timber_facilities/$", pipeline.views.location_types.TimberFacilityList.as_view()),
    url(r"^locations/civic_facilities/$", pipeline.views.location_types.CivicFacilityList.as_view()),
    url(r"^locations/hospitals/$", pipeline.views.location_types.HospitalList.as_view()),
    url(r"^locations/natural_resource_projects/$", pipeline.views.location_types.NaturalResourceProjectList.as_view()),
    url(r"^locations/economic_projects/$", pipeline.views.location_types.EconomicProjectList.as_view()),
    url(r"^locations/servicebc_locations/$", pipeline.views.location_types.ServiceBCLocationList.as_view()),
    url(r"^locations/schools/$", pipeline.views.location_types.SchoolList.as_view()),
    url(r"^locations/post_secondary_institutions/$",
        pipeline.views.location_types.PostSecondaryInstitutionList.as_view()),
    url(r"^locations/clinics/$", pipeline.views.location_types.ClinicList.as_view()),
    url(r"^locations/courts/$", pipeline.views.location_types.CourtList.as_view()),
    url(r"^locations/closed_mills/$", pipeline.views.location_types.ClosedMillList.as_view()),
    url(r"^locations/research_centres/$", pipeline.views.location_types.ResearchCentreList.as_view()),
    url(r"^locations/airports/$", pipeline.views.location_types.AirportList.as_view()),
    url(r"^locations/$", pipeline.views.location_types.LocationList.as_view()),

    url(r"^datasources/$", pipeline.views.general.DataSourcesList.as_view()),
    url(r"^services/$", pipeline.views.general.ServiceList.as_view()),
    url(r"^censussubdivisions/geojson/$", pipeline.views.general.CensusSubdivisionGeoJSONList.as_view()),
    url(r"^censussubdivisions/(?P<pk>[0-9]+)/$", pipeline.views.general.CensusSubdivisionDetail.as_view()),
    url(r"^censussubdivisions/$", pipeline.views.general.CensusSubdivisionList.as_view()),
    url(r"^locationdistances/geojson/$", pipeline.views.general.LocationDistanceGeoJSONList.as_view()),
    url(r"^locationdistances/$", pipeline.views.general.LocationDistanceList.as_view()),
    url(r"^schooldistricts/$", pipeline.views.general.SchoolDistrictList.as_view()),
    path('openapi', get_schema_view(title="CIT", description="API for CIT", version="1.0.0"), name='openapi-schema'),
    path(
        'api/',
        TemplateView.as_view(template_name='swagger-ui.html', extra_context={'schema_url': 'openapi-schema'}),
        name='swagger-ui',
    ),
]
