from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
import json

from pipeline.models.general import RegionalDistrict
from pipeline.models.location_assets import Airport, Location
from pipeline.models.railway import Railway
from pipeline.models.community import Community
from pipeline.models.indian_reserve_band_name import IndianReserveBandName


class ProximityView(APIView):
    def get(self, request, format=None):
        """
        Points of interests in proximity to opportunity.
        """
        lat = request.query_params.get('lat', None)
        lng = request.query_params.get('lng', None)
        errors = []
        if lat is None:
            errors.append(
                'Must supply a parameter "lat" with a valid latitude')
        if lng is None:
            errors.append(
                'Must supply a parameter "lng" with a valid longitude')
        if lat is not None and lat.isdigit() is not False:
            errors.append('Parameter "lat" must be a valid latitude')
        if lng is not None and lng.isdigit() is not False:
            errors.append('Parameter "lng" must be a valid longitude')

        if len(errors) > 0:
            return Response(dict(
                errors=errors,
                status=status.HTTP_400_BAD_REQUEST))

        point = Point(float(lng), float(lat))

        regional_district = None
        regional_check = RegionalDistrict.objects.get(geom__contains=point)
        if regional_check:
            regional_district = dict(id=regional_check.id,
                                     name=regional_check.name)

        airport = None
        airport_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(point__distance_lte=(point, D(km=100)),
                                                      location_type="airports").order_by('distance')[:1]
        if airport_check:
            airport = json.loads(serializers.serialize('geojson',
                                                       airport_check,
                                                       geometry_field=point))
            airport['distance'] = airport_check.first().distance.km

        deep_port = None
        deep_port_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(point__distance_lte=(point, D(km=100)),
                                                      location_type="port_and_terminal").order_by('distance')[:1]
        if deep_port_check:
            deep_port = json.loads(serializers.serialize('geojson',
                                                         deep_port_check,
                                                         geometry_field=point))
            deep_port['distance'] = deep_port_check.first().distance.km

        post_secondary = None
        post_secondary_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(point__distance_lte=(point, D(km=100)),
                                                      location_type="post_secondary_institutions").order_by('distance')[:1]
        if post_secondary_check:
            post_secondary = json.loads(serializers.serialize('geojson',
                                                              post_secondary_check,
                                                              geometry_field=point))
            post_secondary['distance'] = post_secondary_check.first().distance.km

        railway = None
        railway_check = Railway.objects.annotate(
            distance=Distance("geom", point)).filter(geom__distance_lte=(point, D(km=100)),
                                                      track_classification="Yard").order_by('distance')[:1]
        if railway_check:
            railway = json.loads(serializers.serialize('geojson',
                                                              railway_check,
                                                              geometry_field=point))
            railway['distance'] = railway_check.first().distance.km

        research_center = None
        research_center_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(point__distance_lte=(point, D(km=100)),
                                                      location_type="research_centres").order_by('distance')[:1]
        if research_center_check:
            research_center = json.loads(serializers.serialize('geojson',
                                                              research_center_check,
                                                              geometry_field=point))
            research_center['distance'] = research_center_check.first().distance.km

        communities = None
        community_check = Community.objects.annotate(
            distance=Distance("point", point)).filter(point__distance_lte=(point, D(km=100))).order_by('distance')[:5]
        if community_check:
            communities = json.loads(serializers.serialize('geojson',
                                                              community_check,
                                                              geometry_field=point))
            communities['distance'] = community_check.first().distance.km

        first_nation_communities = None
        first_nation_community_check = IndianReserveBandName.objects.annotate(
            distance=Distance("geom", point)).filter(geom__distance_lte=(point, D(km=100))).order_by('distance')[:3]
        if first_nation_community_check:
            first_nation_communities = json.loads(serializers.serialize('geojson',
                                                              first_nation_community_check,
                                                              geometry_field=point))
            first_nation_communities['distance'] = first_nation_community_check.first().distance.km

        return Response(dict(regionalDistrict=regional_district,
                             airportLocation=airport,
                             deepPort=deep_port,
                             postSecondary=post_secondary,
                             railway=railway,
                             researchCenter=research_center,
                             communities=communities,
                             firstNationCommunities=first_nation_communities
                             ))
