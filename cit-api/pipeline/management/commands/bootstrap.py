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

        # import remaining resources
        wms_resources = DataSource.objects.order_by('import_order')

        for resource in wms_resources:
            if resource.name != 'census' and resource.name != 'communities' and resource.name != 'closed_mills':
                if resource.source_type == "wms":
                    print((f'Importing {resource.display_name}...'))
                    import_wms_resource(resource)
                if resource.source_type == "csv":
                    print((f'Importing {resource.display_name}...'))
                    import_csv_resources(resource.name)
                if resource.source_type == "shp":
                    print((f'Importing {resource.display_name}...'))
                    import_shp_resources(resource.name)
                if resource.source_type == "api":
                    print((f'Importing {resource.display_name}...'))
                    import_databc_resources(resource.name)

        # shp_resources = DataSource.objects.filter(source_type="shp").exclude(
        #     name__in=["census", "roads", "hexes"])
        # for resource in shp_resources:
        #     print("Importing {}...".format(resource.name))
        #     import_shp_resources(resource.name)

        # print("Importing Services...")
        # import_csv_resources("services")

        # # import remaining csv resources
        # csv_resources = DataSource.objects.filter(source_type="csv").exclude(
        #     name__in=["communities", "services"])
        # for resource in csv_resources:
        #     print("Importing {}...".format(resource.name))
        #     import_csv_resources(resource.name)

        # print("Importing databc locations...")
        # import_databc_resources("all")
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
