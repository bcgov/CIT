from django.core.management.base import BaseCommand

from pipeline.importers.utils import (
    calculate_nearest_location_types_outside_50k_for_communities)


class Command(BaseCommand):
    def handle(self, *args, **options):
        calculate_nearest_location_types_outside_50k_for_communities()
