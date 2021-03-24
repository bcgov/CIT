from django.core.management.base import BaseCommand

from pipeline.importers.data_sources import import_data_sources


class Command(BaseCommand):
    def handle(self, *args, **options):
        import_data_sources()


