import requests

from django.core.management.base import BaseCommand

from pipeline.importers import hospitals

API_URL = "https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id={resource_id}"


class Command(BaseCommand):
    help = 'Script to import a dataset from the BC Data Catalogue. '\
        'Example usage: `python manage.py import_databc hospitals 5ff82cf4-0448-4063-804a-7321f0f2b4c6`'

    def add_arguments(self, parser):
        parser.add_argument('resource_type', type=str, help='Resource Type')
        parser.add_argument('resource_id', type=str, help='Resource ID')

    def handle(self, *args, **options):
        resource_type = options['resource_type']
        resource_id = options['resource_id']

        response = requests.get(API_URL.format(resource_id=resource_id))

        if response.status_code != 200:
            print("Failed to download dataset {} {}".format(resource_type, resource_id))
            print("Error: {} {}".format(response.status_code, response.content))
            return

        data = response.json()["result"]["records"]

        # TODO SY - this should be a lookup table of some sort
        if resource_type == "hospitals":
            hospitals.import_hospitals(data)
