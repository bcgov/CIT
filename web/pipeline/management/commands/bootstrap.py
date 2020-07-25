from django.core.management.base import BaseCommand

from pipeline.importers.csv_resource import import_csv_resources
from pipeline.importers.databc_resource import import_databc_resources
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.importers.utils import (
    calculate_community_num_schools, calculate_community_num_hospitals, calculate_community_num_courts,
    calculate_community_num_timber_facilities)


class Command(BaseCommand):
    def handle(self, *args, **options):
        # import census subdivisions first because a lot of other tables have foreign keys to
        # CensusSubdivision
        import_shp_resources("census")

        import_shp_resources("all")

        # Note: Community imports first because it is first in the list of resources in constants.py
        import_csv_resources("all")
        import_databc_resources("all")

        # calculate cached fields
        calculate_community_num_schools()
        calculate_community_num_hospitals()
        calculate_community_num_courts()
        calculate_community_num_timber_facilities()
