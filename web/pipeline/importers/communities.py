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

            fields = {
                #"id": place_id,
                "place_name": row["Place_Name"],
                "census_subdivision_id": row['CSDUID'],
                "hexuid": row['HEXUID'],
                "community_type": row['Community Type'],
                "point": Point(float(row["Longitude"]), float(row["Latitude"]), srid=3005)
            }

            try:
                Community.objects.get_or_create(**fields)
            except IntegrityError as e:
                print('Failed with IntegrityError', e)
