import csv

from django.contrib.gis.geos import Point

from pipeline.models import Community, WildfireZone, TsunamiZone, Municipality, Road
from django.db.utils import IntegrityError
from django.contrib.gis.measure import D

def import_communities_from_csv(communities_file_path):
    wct = 0
    with open(communities_file_path) as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=',')
        for row in csv_reader:
            print(row["Place_Name"])
            #place_id = row["Place_ID"]

            # **Other fields to consider adding**
            #    BASE_ACCESS_50Mbps,Community Type,FN_Community_Name,Nation,Band_Number
            #    Municipality Classification,Municipality or is within the boundaries of one (1=Yes)
            #    Municapility URL Code,Municipality URL Address
            #    Distance to nearest Weather Station,Weather Station Number,Weather Station Name
            # **census info. should come from separate normalized table**
            #    CDUID, CENSUS SD TYPE,CENSUS 2016 SD POP,CENSUS 2016 SD Total Dwelling,
            # **these seem inaccurate, don't use**
            #    CSDUID Repeat Count (used to estimate Pop and Dwelling),Estimated Population,Estimated Total Dwellings,CENSUS DIVISION NAME,CENSUS METRO AREA NAME,CENSUS ECONOMIC REGION NAME,CENSUS SD NAME

            place_name = row["Place_Name"]
            try:
                community = Community.objects.get(place_name=place_name)
            except Community.DoesNotExist:
                community = Community(place_name=place_name)

            community.point = Point(float(row["Longitude"]), float(row["Latitude"]), srid=4326)

            # TODO: spatial query?
            community.census_subdivision_id = row['CSDUID']

            # TODO: Consider municipal overlap.
            # community.wildfire_zone = WildfireZone.objects.filter(geom__distance_lt = (community.point, D(m=1000))).first()
            # community.tsunami_zone = TsunamiZone.objects.filter(geom__distance_lt = (community.point, D(m=1000))).first()

            # if community.wildfire_zone:
            #     wct+=1
            # if community.tsunami_zone:
            #     tct+=1

            community.hexuid = row['HEXUID']
            community.community_type = row['Community Type']
            community.base_access_50mbps = row['BASE_ACCESS_50Mbps'].lower() == 'yes'
            community.fn_community_name = row['FN_Community_Name']
            community.nation = row['Nation']
            community.band_number = row['Band_Number'] or None
            community.municipality_classification = row['Municipality Classification']
            is_mun = row['Municipality or is within the boundaries of one (1=Yes)']
            if is_mun == '1':
                try:
                    community.municipality = Municipality.objects.get(geom__contains=community.point)
                except Municipality.DoesNotExist:
                    print("Error: Municipality not found for {}!".format(community.place_name))
            community.estimated_population = row['Estimated Population']
            community.estimated_total_dwellings = row['Estimated Total Dwellings']

            try:
                community.save()
            except IntegrityError as e:
                print(e)
            
            if community.municipality:
                roads = Road.objects.filter(geom__intersects=community.municipality.geom)
                print(roads)


    print (wct, tct)