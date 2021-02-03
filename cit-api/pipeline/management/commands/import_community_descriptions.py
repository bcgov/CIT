from django.core.management.base import BaseCommand

from pipeline.importers.utils import import_community_descriptions


class Command(BaseCommand):
    def handle(self, *args, **options):
        import_community_descriptions()
