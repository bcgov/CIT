from django.core.management.base import BaseCommand

from pipeline.importers.databc_resource import import_databc_resource


class Command(BaseCommand):
    help = 'Script to import a dataset from the BC Data Catalogue. '\
        'Example usage: `python manage.py import_databc hospitals`'

    def add_arguments(self, parser):
        parser.add_argument('resource_type', type=str, help='Resource Type')

    def handle(self, *args, **options):
        resource_type = options['resource_type']

        import_databc_resource(resource_type)
