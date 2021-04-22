from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
from django.db.models import Sum, F
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.measure import D
import json

from pipeline.models.general import RegionalDistrict, Municipality, Road
from pipeline.models.location_assets import Airport, Location, CustomsPortOfEntry, FirstResponder, Hospital
from pipeline.models.railway import Railway
from pipeline.models.river import River
from pipeline.models.lake import Lake
from pipeline.models.community import Community
from pipeline.models.indian_reserve_band_name import IndianReserveBandName
from pipeline.models.roads_and_highways import RoadsAndHighways

# TODO: Reduce properties per feature across all sets in GET

NETWORK_CODES = ['5/1', '10/2', '25/5', '50/10']


class ProximityView(APIView):
    def validate_request(self, lat, lng):
        errors = []
        if lat is None:
            errors.append('Must supply a parameter "lat" with a valid latitude')
        if lng is None:
            errors.append('Must supply a parameter "lng" with a valid longitude')
        if lat is not None and lat.isdigit() is not False:
            errors.append('Parameter "lat" must be a valid latitude')
        if lng is not None and lng.isdigit() is not False:
            errors.append('Parameter "lng" must be a valid longitude')

        if len(errors) > 0:
            return Response(dict(errors=errors, status=status.HTTP_400_BAD_REQUEST))
        return None

    def get(self, request, format=None):
        """
        Points of interests in proximity to opportunity.
        """
        lat = request.query_params.get('lat', None)
        lng = request.query_params.get('lng', None)
        validation_error = self.validate_request(lat, lng)
        if validation_error:
            return validation_error

        point = Point(float(lng), float(lat))

        regional_district = None
        regional_check = RegionalDistrict.objects.get(geom__contains=point)
        if regional_check:
            regional_district = dict(id=regional_check.id, name=regional_check.name)

        airport = None
        airport_check = Location.objects.annotate(distance=Distance("point", point)).filter(
            point__distance_lte=(point, D(km=100)),
            location_type="airports").order_by('distance')[:1]
        if airport_check:
            airport = json.loads(
                serializers.serialize('geojson', airport_check, geometry_field=point))
            location_id = int(airport['features'][0]['properties']['pk'])
            airport['airport_distance'] = airport_check.first().distance.km
            airport['features'][0]['properties']['name'] = Location.objects.get(id=location_id).name

        deep_port = None
        deep_port_check = Location.objects.annotate(distance=Distance("point", point)).filter(
            point__distance_lte=(point, D(km=100)),
            location_type="port_and_terminal").order_by('distance')[:1]
        if deep_port_check:
            deep_port = json.loads(
                serializers.serialize('geojson', deep_port_check, geometry_field=point))
            location_id = int(deep_port['features'][0]['properties']['pk'])
            deep_port['port_distance'] = deep_port_check.first().distance.km
            deep_port['features'][0]['properties']['name'] = Location.objects.get(
                id=location_id).name

        # TODO: join Location to get name field
        customs_port = None
        customs_port_check = CustomsPortOfEntry.objects.annotate(
            distance=Distance("point", point)).filter(point__distance_lte=(point, D(
                km=100))).order_by('distance')[:1]
        if customs_port_check:
            customs_port = json.loads(
                serializers.serialize('geojson', customs_port_check, geometry_field=point))
            customs_port['customs_port_distance'] = customs_port_check.first().distance.km
            location_id = int(customs_port['features'][0]['properties']['pk'])
            customs_port['features'][0]['properties']['name'] = Location.objects.get(
                id=location_id).name

        post_secondary = None
        post_secondary_check = Location.objects.annotate(distance=Distance("point", point)).filter(
            point__distance_lte=(point, D(km=100)),
            location_type="post_secondary_institutions").order_by('distance')[:1]
        if post_secondary_check:
            post_secondary = json.loads(
                serializers.serialize('geojson', post_secondary_check, geometry_field=point))
            post_secondary['post_secondary_distance'] = post_secondary_check.first().distance.km

        railway = None
        railway_check = Railway.objects.annotate(distance=Distance("geom", point)).filter(
            geom__distance_lte=(point, D(km=100))).order_by('distance')[:1]
        if railway_check:
            railway = json.loads(
                serializers.serialize('geojson', railway_check, geometry_field=point))
            railway['railway_distance'] = railway_check.first().distance.km

        highway = None
        highway_check = RoadsAndHighways.objects.annotate(distance=Distance("geom", point)).filter(
            geom__distance_lte=(point, D(km=100)), feature_type="Road").order_by('distance')[:1]
        if highway_check:
            highway = json.loads(
                serializers.serialize('geojson', highway_check, geometry_field=point))
            highway['highway_distance'] = highway_check.first().distance.km

        lake = None
        lake_check = Lake.objects.annotate(distance=Distance("geom", point)).filter(
            geom__distance_lte=(point, D(km=100))).order_by('distance')[:1]
        if lake_check:
            lake = json.loads(serializers.serialize('geojson', lake_check, geometry_field=point))
            lake['lake_distance'] = lake_check.first().distance.km

        river = None
        river_check = River.objects.annotate(distance=Distance("geom", point)).filter(
            geom__distance_lte=(point, D(km=100))).order_by('distance')[:1]
        if river_check:
            river = json.loads(serializers.serialize('geojson', river_check, geometry_field=point))
            river['river_distance'] = river_check.first().distance.km

        research_centre = None
        research_centre_check = Location.objects.annotate(distance=Distance("point", point)).filter(
            point__distance_lte=(point, D(km=100)),
            location_type="research_centres").order_by('distance')[:1]
        if research_centre_check:
            research_centre = json.loads(
                serializers.serialize('geojson', research_centre_check, geometry_field=point))
            research_centre['research_centre_distance'] = research_centre_check.first().distance.km

        community = None
        network_avg = dict()
        transmission = None
        community_check = Community.objects.annotate(distance=Distance("point", point)).filter(
            point__distance_lte=(point, D(km=100))).order_by('distance')[:1]
        if community_check:
            community = json.loads(
                serializers.serialize('geojson', community_check, geometry_field=point))
            community['community_distance'] = community_check.first().distance.km
            transmission = dict()
            transmission['distance'] = community_check.first(
            ).nearest_transmission_distance + community['community_distance']
            properties = community['features'][0]['properties']
            network_percents = [
                properties['percent_5_1'], properties['percent_10_2'], properties['percent_25_5'],
                properties['percent_50_10']
            ]
            # scan for network_avg speed category
            last_network = properties['percent_5_1']
            network_avg = 'Unknown network'
            index = 0
            for network in network_percents:
                if last_network is not None and network is not None and abs(last_network -
                                                                            network) < 0.1:
                    network_avg = NETWORK_CODES[index]
                last_network = network
                index += 1

        nearest_fire_station = None
        nearest_fire_station_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(
                point__distance_lte=(point, D(km=100)),
                firstresponder__keywords__contains="fire").order_by('distance')[:1]
        if nearest_fire_station_check:
            nearest_fire_station = json.loads(
                serializers.serialize('geojson', nearest_fire_station_check, geometry_field=point))
            nearest_fire_station['distance'] = nearest_fire_station_check.first().distance.km

        nearest_police_station = None
        nearest_police_station_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(
                point__distance_lte=(point, D(km=100)),
                firstresponder__keywords__contains="police").order_by('distance')[:1]
        if nearest_police_station_check:
            nearest_police_station = json.loads(
                serializers.serialize('geojson', nearest_police_station_check,
                                      geometry_field=point))
            nearest_police_station['distance'] = nearest_police_station_check.first().distance.km

        nearest_ambulance_station = None
        nearest_ambulance_station_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(
                point__distance_lte=(point, D(km=100)),
                firstresponder__keywords__contains="ambulance").order_by('distance')[:1]
        if nearest_ambulance_station_check:
            nearest_ambulance_station = json.loads(
                serializers.serialize('geojson',
                                      nearest_ambulance_station_check,
                                      geometry_field=point))
            nearest_ambulance_station['distance'] = nearest_ambulance_station_check.first(
            ).distance.km

        nearest_coast_guard_station = None
        nearest_coast_guard_station_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(
                point__distance_lte=(point, D(km=100)),
                firstresponder__keywords__contains="coastguard").order_by('distance')[:1]
        if nearest_coast_guard_station_check:
            nearest_coast_guard_station = json.loads(
                serializers.serialize('geojson',
                                      nearest_coast_guard_station_check,
                                      geometry_field=point))
            nearest_coast_guard_station['distance'] = nearest_coast_guard_station_check.first(
            ).distance.km

        nearest_health_center = None
        nearest_health_center_check = Location.objects.annotate(
            distance=Distance("point", point)).filter(
                point__distance_lte=(point, D(km=100)),
                location_type='hospitals').order_by('distance')[:1]
        if nearest_health_center_check:
            nearest_health_center = json.loads(
                serializers.serialize('geojson', nearest_health_center_check, geometry_field=point))
            nearest_health_center['distance'] = nearest_health_center_check.first().distance.km

        network_at_road = 'Unknown network'
        network_at_road_check = Road.objects.annotate(distance=Distance("geom", point)).filter(
            geom__distance_lte=(point, D(km=100))).order_by('distance')[:1]
        if network_at_road_check and network_at_road_check.first().best_broadband:
            network_at_road = network_at_road_check.first().best_broadband

        municipality = None
        municipalities = None
        municipalities_check = Municipality.objects.annotate(
            distance=Distance("geom", point)).filter(geom__distance_lte=(point, D(
                km=100))).order_by('distance')[:5]
        if municipalities_check:
            municipalities = json.loads(
                serializers.serialize('geojson', municipalities_check, geometry_field=point))
            # Add the missing annotated distance value to each geojson feature
            index = 0
            while index < len(municipalities_check):
                municipality_id = int(municipalities['features'][index]['properties']['pk'])

                if index == 0:
                    municipality = {
                        'id': municipalities['features'][index]['properties']['pk'],
                        'name': municipalities['features'][index]['properties']['name']
                    }
                municipalities['features'][index]['properties']['distance'] = municipalities_check[
                    index].distance.km
                municipalities['features'][index]['properties']['population'] = 0
                community_queryset = Community.objects.filter(
                    municipality_id=municipality_id).annotate(
                        count=Sum(F('census_subdivision__pop_total_2016')))
                if len(community_queryset):
                    municipalities['features'][index]['properties'][
                        'population'] = community_queryset.values()[0]['count']
                index += 1

        # TODO: Join on community, join on census for population
        # Might be missing info
        first_nation_communities = None
        first_nation_community_check = IndianReserveBandName.objects.annotate(
            distance=Distance("geom", point)).filter(geom__distance_lte=(point, D(
                km=100))).order_by('distance')[:3]
        if first_nation_community_check:
            first_nation_communities = json.loads(
                serializers.serialize('geojson', first_nation_community_check,
                                      geometry_field=point))
            # Add the missing annotated distance value to each geojson feature
            index = 0
            while index < len(first_nation_community_check):
                first_nation_communities['features'][index]['properties'][
                    'distance'] = first_nation_community_check[index].distance.km
                index += 1

        return Response(
            dict(municipality=municipality,
                 regionalDistrict=regional_district,
                 nearestAirport=airport,
                 nearestPort=deep_port,
                 nearestCustomsPortOfEntry=customs_port,
                 nearestPostSecondary=post_secondary,
                 nearestHighway=highway,
                 nearestRailway=railway,
                 nearestResearchCentre=research_centre,
                 community=community,
                 nearestTransmission=transmission,
                 nearestFirstNations=first_nation_communities,
                 nearestMunicipalities=municipalities,
                 nearestLake=lake,
                 nearestRiver=river,
                 networkAtRoad=network_at_road,
                 networkAvg=network_avg,
                 nearestFireStation=nearest_fire_station,
                 nearestPoliceStation=nearest_police_station,
                 nearestAmbulanceStation=nearest_ambulance_station,
                 nearestCoastGuardStation=nearest_coast_guard_station,
                 nearestHealthCenter=nearest_health_center))
