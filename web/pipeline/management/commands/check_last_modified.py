import csv
import os

import requests

from django.core.management.base import BaseCommand


API_URL = "https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id=4b721abc-46e0-4010-b366-5830c000eb56&q={{%22Resource%20ID%22:%22{dataset_resource_id}%22}}"

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('resource_id', type=str, help='Resource ID')

    def handle(self, *args, **options):
        dataset_resource_id = options['resource_id']

        response = requests.get(API_URL.format(dataset_resource_id=dataset_resource_id))
        print("response", response)
