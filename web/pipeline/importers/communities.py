import csv

from django.contrib.gis.geos import Point

from pipeline.models import Community, WildfireZone, TsunamiZone, Municipality, Road
from django.db.utils import IntegrityError
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance


def import_communities_from_csv(communities_file_path):
    with open(communities_file_path) as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=',')
        for row in csv_reader:
            print(row["Place Name"])
            # place_id = row["Place_ID"]

            # **Other fields to consider adding**
            #    BASE_ACCESS_50Mbps,Community Type,FN_Community_Name,Nation,Band_Number
            #    Municipality Classification,Municipality or is within the boundaries of one (1=Yes)
            #    Municapility URL Code,Municipality URL Address
            #    Distance to nearest Weather Station,Weather Station Number,Weather Station Name
            # **census info. should come from separate normalized table**
            #    CDUID, CENSUS SD TYPE,CENSUS 2016 SD POP,CENSUS 2016 SD Total Dwelling,
            # **these seem inaccurate, don't use**
            #    CSDUID Repeat Count (used to estimate Pop and Dwelling),Estimated Population,Estimated Total Dwellings,CENSUS DIVISION NAME,CENSUS METRO AREA NAME,CENSUS ECONOMIC REGION NAME,CENSUS SD NAME

            place_name = row["Place Name"]
            try:
                community = Community.objects.get(place_name=place_name)
            except Community.DoesNotExist:
                community = Community(place_name=place_name)

            community.point = Point(float(row["Longitude"]), float(row["Latitude"]), srid=4326)

            # TODO: spatial query?
            community.census_subdivision_id = row['CSDUID']

            # TODO: Consider municipal overlap.
            community.wildfire_zone = WildfireZone.objects.filter(
                geom__distance_lt=(community.point, D(m=1000))
            ).first()
            community.tsunami_zone = TsunamiZone.objects.filter(geom__distance_lt=(community.point, D(m=1000))).first()

            # if community.wildfire_zone:
            #     wct+=1
            # if community.tsunami_zone:
            #     tct+=1

            community.hexuid_id = row['HEXID']
            community.community_type = row['Place Type']

            community.fn_community_name = row['FN Alt Name']
            community.nation = row['Nation']
            community.band_number = row['Band Number'] or None
            # community.municipality_classification = row['Municipality Classification']
            # is_mun = row['Municipality or is within the boundaries of one (1=Yes)']
            # if is_mun == '1':
            #     try:
            #         community.municipality = Municipality.objects.get(geom__contains=community.point)
            #     except Municipality.DoesNotExist:
            #         print("Error: Municipality not found for {}!".format(community.place_name))

            if row['Incorporated'] == "Yes":
                community.incorporated = True
            elif row['Incorporated'] == "No":
                community.incorporated = False

            community.last_mile_status = row['Last-Mile Status (Sept2020)']
            community.transport_status = row['Transport Status (Sept2020)']
            community.cbc_phase = row['CBC Phase']

            if community.municipality:
                roads = Road.objects.filter(geom__intersects=community.municipality.geom)
            else:
                roads = Road.objects.filter(geom__distance_lt=(community.point, D(km=10)))

            speeds_map = {}
            total_length = 0
            for road in roads:
                if road.best_broadband not in speeds_map:
                    speeds_map[road.best_broadband] = 0
                speeds_map[road.best_broadband] += road.geom.length
                total_length += road.geom.length

            if '50/10' in speeds_map:
                community.percent_50_10 = speeds_map['50/10'] / total_length
            if '25/5' in speeds_map:
                community.percent_25_5 = speeds_map['25/5'] / total_length

            try:
                community.save()
            except IntegrityError as e:
                print(e)
