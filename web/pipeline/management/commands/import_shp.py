# Run from command line :
# python manage.py import_subdivisions
from django.core.management.base import BaseCommand
from pipeline.importers.shp_resource import import_shp_resources


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('resource_type', type=str, help='Resource Type')

    def handle(self, *args, **options):

        resource_type = options['resource_type']

        import_shp_resources(resource_type)
