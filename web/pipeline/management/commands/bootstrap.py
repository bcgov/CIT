from django.core.management.base import BaseCommand

from pipeline.importers.csv_resource import import_csv_resources
from pipeline.importers.databc_resource import import_databc_resources
from pipeline.importers.shp_resource import import_shp_resources


class Command(BaseCommand):
    def handle(self, *args, **options):
        # import census subdivisions first because a lot of other tables have foreign keys to
        # CensusSubdivision
        import_shp_resources("census")

        import_shp_resources("all")

        # Note: Community imports first because it is first in the list of resources in constants.py
        import_csv_resources("all")
        import_databc_resources("all")
