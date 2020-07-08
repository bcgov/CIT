from django.core.management.base import BaseCommand

from pipeline.importers.csv_resource import import_csv_resource


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('resource_type', type=str, help='Resource Type')

    def handle(self, *args, **options):
        resource_type = options['resource_type']

        import_csv_resource(resource_type)
