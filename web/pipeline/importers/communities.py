import csv

from django.contrib.gis.geos import Point

from pipeline.models import Community
from django.db.utils import IntegrityError


def import_communities_from_csv(communities_file_path):
    with open(communities_file_path) as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=',')
        for row in csv_reader:
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
                community = Community()

            community.census_subdivision_id = row['CSDUID']
            community.community_type = row['Community Type']
            community.hexuid = row['HEXUID']
            community.community_type = row['Community Type']
            community.point = Point(float(row["Longitude"]), float(row["Latitude"]), srid=3005)
            community.base_access_50mbps = row['BASE_ACCESS_50Mbps'].lower() == 'yes'
            community.fn_community_name = row['FN_Community_Name']
            community.nation = row['Nation']
            community.band_number = row['Band_Number'] or None
            community.municipality_classification = row['Municipality Classification']
            community.municipality_id = row['Municapility URL Code'] or None
            community.estimated_population = row['Estimated Population']
            community.estimated_total_dwellings = row['Estimated Total Dwellings']

            try:
                community.save()
            except IntegrityError as e:
                print(e)
