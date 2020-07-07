import requests

from django.core.management.base import BaseCommand

from django.core.exceptions import FieldDoesNotExist
from pipeline.models import (
    Court,
    Hospital,
    EconomicProject,
    NaturalResourceProject,
    ServiceBCLocation,
    School,
    Clinic,
    Community,
    CensusSubdivision
)
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance


API_URL = "https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id={resource_id}&limit=10000"

RESOURCES = {
    'hospitals': {
        'resource_id': '5ff82cf4-0448-4063-804a-7321f0f2b4c6',
        'model': Hospital,
    },
    'natural_resource_projects': {
        'resource_id': '2b69cc4b-4076-4272-a5a0-1c731455e063',
        'model': NaturalResourceProject
    },
    'economic_projects': {
        'resource_id': 'b12cd4cc-b58b-4079-b630-a20b6df58e8d',
        'model': EconomicProject,
    },
    'servicebc_locations': {
        'resource_id': 'c7cc9297-220c-4d6c-a9a7-72d0680b2f74',
        'model': ServiceBCLocation
    },
    'schools': {
        'resource_id': '5832eff2-3380-435e-911b-5ada41c1d30b',
        'model': School,
    },
    'clinics': {
        'resource_id': '3ca6b086-c92b-4654-ae82-ff5723d00611',
        'model': Clinic
    },
    'courts': {
        'resource_id': '23aa0b75-2715-4ccb-9a36-9a608450dc2d',
        'model': Court
    }
}

class Command(BaseCommand):
    help = 'Script to import a dataset from the BC Data Catalogue. '\
        'Example usage: `python manage.py import_databc hospitals`'

    def add_arguments(self, parser):
        parser.add_argument('resource_type', type=str, help='Resource Type')

    def handle(self, *args, **options):
        rt = options['resource_type']

        for resource_type in RESOURCES.keys():
            if rt != 'all' and rt != resource_type:
                continue
            resource = RESOURCES[resource_type]

            response = requests.get(API_URL.format(resource_id=resource['resource_id']))

            if response.status_code != 200:
                print("Failed to download dataset {} {}".format(resource_type, resource_id))
                print("Error: {} {}".format(response.status_code, response.content))
                return

            data = response.json()["result"]["records"]
            print(data[0])
            Model = resource['model']

            for row in data:
                try:
                    point = Point(
                        float(row[Model.LONGITUDE_FIELD]),
                        float(row[Model.LATITUDE_FIELD]),
                        srid=3005
                    )
                except TypeError:
                    print("Skipping error:", row[Model.NAME_FIELD], "has no geometry!")
                    continue
                closest_community = Community.objects.annotate(
                    distance=Distance('point', point)
                ).order_by('distance').first()
                #containing_subdiv = CensusSubdivision.objects.get(geom__contains=point)
                instance = Model.objects.get_or_create(
                    name=row[Model.NAME_FIELD],
                    point=point,
                    location_type=resource_type,
                    community=closest_community
                )[0]
                
                for k,v in row.items():
                    if isinstance(v, str):
                        try:
                            v=v[:Model._meta.get_field(k.lower()).max_length]
                        except FieldDoesNotExist:
                            pass
                    setattr(instance, k.lower(), v)

                print(instance)
                instance.save()
                