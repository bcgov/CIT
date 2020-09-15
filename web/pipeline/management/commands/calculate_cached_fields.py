from django.core.management.base import BaseCommand

from pipeline.importers.utils import (
    calculate_community_num_schools, calculate_community_num_hospitals, calculate_community_num_courts,
    calculate_community_num_timber_facilities, calculate_communities_for_schools,
    calculate_regional_districts_for_communities, calculate_municipality_flag_for_location_assets)


class Command(BaseCommand):
    def handle(self, *args, **options):
        calculate_community_num_schools()
        calculate_community_num_hospitals()
        calculate_community_num_courts()
        calculate_community_num_timber_facilities()

        calculate_communities_for_schools()
        calculate_regional_districts_for_communities()
        calculate_municipality_flag_for_location_assets()
