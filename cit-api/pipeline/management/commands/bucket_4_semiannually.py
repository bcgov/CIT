from pipeline.importers.bucket4.bucket4_semiannually import import_data_sources
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.importers.databc_resource import (
    import_databc_resources,
    import_wms_resource,
)
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.management.commands.base.base_import_command import BaseImportCommand
from pipeline.models.general import DataSource


class Command(BaseImportCommand):

    def handle(self, *args, **options):
        self.download_static_files()

        # Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()

        # Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(
            name__in=[
                'census_economic_region',
                'courts',
                'health_authority_boundaries',
                'indian_reserve_and_band_name',
                'lakes',
                'natural_resource_regions',
                'post_secondary_institutions',
                'provincial_electoral_district',
                'railways',
                'research_centres',
                'rivers',
                'road_and_highways',
                'services',
            ]
        )

        for resource in data_resources:
            if resource.source_type == "wms":
                print(f'Importing {resource.display_name}...')
                import_wms_resource(resource)
            if resource.source_type == "api":
                print(f'Importing {resource.display_name}...')
                import_databc_resources(resource.name)
            if resource.source_type == "csv":
                print(f'Importing {resource.display_name}...')
                import_csv_resources(resource.name)
            if resource.source_type == "shp":
                print(f'Importing {resource.display_name}...')
                import_shp_resources(resource.name)

        print("Import process for bucket4_semiannually completed!")
