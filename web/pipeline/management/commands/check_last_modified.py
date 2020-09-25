from django.core.management.base import BaseCommand
from pipeline.utils import get_databc_last_modified_date


class Command(BaseCommand):
    help = 'Script to check the last modified date of a dataset from the BC Data Catalogue. '\
        'Example usage: `python manage.py check_last_modified 5ff82cf4-0448-4063-804a-7321f0f2b4c6`'

    def add_arguments(self, parser):
        parser.add_argument('resource_id', type=str, help='Resource ID')

    def handle(self, *args, **options):
        dataset_resource_id = options['resource_id']

        get_databc_last_modified_date(dataset_resource_id)
