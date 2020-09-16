import csv

from django.contrib.gis.geos import Point

from pipeline.models.community import Community
from pipeline.models.general import WildfireZone, TsunamiZone, Road, Municipality
from pipeline.models.census import CensusSubdivision
from django.db.utils import IntegrityError
from django.contrib.gis.measure import D


def import_communities_from_csv(communities_file_path):
    with open(communities_file_path) as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=',')
        for row in csv_reader:
            place_id = row["Place ID"]

            print("{place_name} ({place_id})".format(
                place_name=row["Place Name"], place_id=place_id))

            try:
                community = Community.objects.get(place_id=place_id)
            except Community.DoesNotExist:
                community = Community(place_id=place_id)

            community.place_name = row["Place Name"]

            community.point = Point(float(row["Longitude"]), float(row["Latitude"]), srid=4326)

            # TODO: spatial query?
            try:
                census_subdivision = CensusSubdivision.objects.get(id=row['CSDUID'])
                community.census_subdivision_id = census_subdivision.id
            except CensusSubdivision.DoesNotExist:
                # TODO: spatial query
                print("CensusSubdivision {} corresponding to Community {} was not found in the CensusSubdivision data"
                      .format(row['CSDUID'], community.place_name))
                census_subdivisions = CensusSubdivision.objects.filter(geom__contains=community.point)
                print("performing spatial search for census subdivision", census_subdivisions)
                if census_subdivisions:
                    community.census_subdivision_id = census_subdivisions.first().id

            # PostGIS uses the ST_DistanceSphere function to calculate distance
            # points inside the polygon return a distance of 0
            # https://postgis.net/docs/ST_DistanceSphere.html
            community.wildfire_zone = WildfireZone.objects.filter(
                geom__distance_lt=(community.point, D(m=5000))
            ).first()
            community.tsunami_zone = TsunamiZone.objects.filter(geom__distance_lt=(community.point, D(m=5000))).first()

            community.hexuid_id = row['HEXID']
            community.community_type = row['Place Type']

            community.fn_community_name = row['FN Alt Name']
            community.nation = row['Nation']
            community.band_number = row['Band Number'] or None
            if row['Incorporated'] == "Yes":
                community.incorporated = True
            elif row['Incorporated'] == "No":
                community.incorporated = False

            if community.incorporated:
                try:
                    community.municipality = Municipality.objects.get(geom__contains=community.point)
                except Municipality.DoesNotExist:
                    print("Error: Municipality not found for {}!".format(community.place_name))

            community.last_mile_status = row['Last-Mile Status (Sept2020)']
            community.transport_mile_status = row['Transport Status (Sept2020)']
            community.cbc_phase = row['CBC Phase']

            if row['Coastal_5km'] == "Yes":
                community.is_coastal = True
            elif row['Coastal_5km'] == "No":
                community.is_coastal = False

            if community.municipality:
                roads = Road.objects.filter(geom__intersects=community.municipality.geom)
            else:
                roads = Road.objects.filter(geom__distance_lt=(community.point, D(km=10)))

            speeds_map = {'50/10': 0, '25/5': 0, '10/2': 0, '5/1': 0, '': 0}
            sk = ['50/10', '25/5', '10/2', '5/1', '']
            total_length = 0
            for road in roads:
                key_index = sk.index(road.best_broadband)
                for k in sk[key_index:]:
                    speeds_map[k] += road.geom.length
                total_length += road.geom.length

            if total_length:
                community.percent_50_10 = speeds_map['50/10'] / total_length
                community.percent_25_5 = speeds_map['25/5'] / total_length
                community.percent_10_2 = speeds_map['10/2'] / total_length
                community.percent_5_1 = speeds_map['5/1'] / total_length

            community.nearest_substation_name = row['Nearest Substation Name']
            try:
                community.nearest_substation_distance = float(row['Distance to Nearest Substation (km)'])
            except ValueError:
                # nearest_substation_distance is null
                pass

            try:
                community.nearest_transmission_distance = float(row['Distance to Nearest Transmission Line (km)'])
            except ValueError:
                # nearest_transmission_distance is null
                pass
            community.transmission_lines_owner = row['Transmission Lines Owner']
            community.transmission_line_description = row['Transmission Line Description']

            try:
                community.transmission_line_voltage = float(row['Transmission Line Voltage (kV)'])
            except ValueError:
                # transmission_line_voltage is null
                pass

            try:
                community.power_pop_2km_capacity = float(
                    row['POP Capacity (Gbps) for communities that are within 2km of POP'])
            except ValueError:
                # power_pop_2km_capacity is null
                pass

            try:
                community.power_remaining_pop_capacity = float(
                    row['Remaining Capacity of POP (Gbps) - (-1 indicates capacity is unknown)'])
            except ValueError:
                # power_remaining_pop_capacity is null
                pass

            try:
                community.save()
            except IntegrityError as e:
                print(e)
