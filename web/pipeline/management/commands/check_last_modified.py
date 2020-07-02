import requests

from django.core.management.base import BaseCommand


API_URL = "https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?"\
    "resource_id=4b721abc-46e0-4010-b366-5830c000eb56"\
    "&q={{%22Resource%20ID%22:%22{dataset_resource_id}%22}}"


class Command(BaseCommand):
    help = 'Script to check the last modified date of a dataset from the BC Data Catalogue. '\
        'Example usage: `python manage.py check_last_modified 5ff82cf4-0448-4063-804a-7321f0f2b4c6`'

    def add_arguments(self, parser):
        parser.add_argument('resource_id', type=str, help='Resource ID')

    def handle(self, *args, **options):
        dataset_resource_id = options['resource_id']

        response = requests.get(API_URL.format(dataset_resource_id=dataset_resource_id))
        data = response.json()["result"]["records"][0]

        resource_name = data["Title"]
        resource_url = data["Resource URL"]
        last_modified_date = data["Record Last Modified"]
        print("Dataset: {}\nLast Modified: {}\nURL: {}".format(resource_name, last_modified_date, resource_url))
