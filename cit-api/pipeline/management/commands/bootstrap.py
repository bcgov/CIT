from django.core.management.base import BaseCommand

from pipeline.importers.csv_resource import import_csv_resources
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.data_sources import import_data_sources
from pipeline.importers.databc_resource import import_databc_resources
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.importers.utils import (
    calculate_community_num_schools, calculate_community_num_hospitals,
    calculate_community_num_courts, calculate_community_num_timber_facilities,
    calculate_nearest_location_types_outside_50k, calculate_communities_for_schools,
    calculate_regional_districts_for_communities)
from pipeline.models.general import DataSource


class Command(BaseCommand):
    def handle(self, *args, **options):
        # import metadata about datasets
        # print("Importing list of data sources...")
        # import_data_sources()

        resources = DataSource.objects.order_by('import_order')

        for resource in resources:
            if resource.name in ['bc_assessment_economic_region']:
                if resource.source_type == "wms":
                    print(f'Importing {resource.display_name}...')
                    import_wms_resource(resource)
                if resource.source_type == "csv":
                    print(f'Importing {resource.display_name}...')
                    import_csv_resources(resource.name)
                if resource.source_type == "shp":
                    print(f'Importing {resource.display_name}...')
                    import_shp_resources(resource.name)
                if resource.source_type == "api":
                    print(f'Importing {resource.display_name}...')
                    import_databc_resources(resource.name)

        # calculate_nearest_location_types_outside_50k()

        # calculate foreign keys
        calculate_communities_for_schools()
        calculate_regional_districts_for_communities()

        # TODO SY - is this still needed
        # calculate cached fields
        calculate_community_num_schools()
        calculate_community_num_hospitals()
        calculate_community_num_courts()
        calculate_community_num_timber_facilities()
