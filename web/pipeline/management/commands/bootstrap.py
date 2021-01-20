from django.core.management.base import BaseCommand

from pipeline.importers.csv_resource import import_csv_resources
from pipeline.importers.data_sources import import_data_sources
from pipeline.importers.databc_resource import import_databc_resources
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.importers.utils import (
    calculate_community_num_schools, calculate_community_num_hospitals, calculate_community_num_courts,
    calculate_community_num_timber_facilities, calculate_nearest_location_types_outside_50k,
    calculate_communities_for_schools, calculate_regional_districts_for_communities)
from pipeline.models.general import DataSource


class Command(BaseCommand):
    def handle(self, *args, **options):
        # import metadata about datasets
        # print("Importing list of data sources...")
        # import_data_sources()

        # import census subdivisions first because a lot of other tables have foreign keys to
        # CensusSubdivision
        print("Importing CensusSubdivisions...")
        import_shp_resources("census")

        print("Importing Roads...")
        import_shp_resources("roads")

        print("Importing connectivity Hexes...")
        import_shp_resources("hexes")

        # import remaining shp resources
        shp_resources = DataSource.objects.filter(source_type="shp").exclude(name__in=["census", "roads", "hexes"])
        for resource in shp_resources:
            print("Importing {}...".format(resource.name))
            import_shp_resources(resource.name)

        # import communities first because many tables foreign key to Community
        print("Importing Communities...")
        import_csv_resources("communities")

        print("Importing Services...")
        import_csv_resources("services")

        # import remaining csv resources
        csv_resources = DataSource.objects.filter(source_type="csv").exclude(name__in=["communities", "services"])
        for resource in csv_resources:
            print("Importing {}...".format(resource.name))
            import_csv_resources(resource.name)

        print("Importing databc locations...")
        import_databc_resources("all")
        calculate_nearest_location_types_outside_50k()

        # calculate foreign keys
        calculate_communities_for_schools()
        calculate_regional_districts_for_communities()

        # TODO SY - is this still needed
        # calculate cached fields
        calculate_community_num_schools()
        calculate_community_num_hospitals()
        calculate_community_num_courts()
        calculate_community_num_timber_facilities()
