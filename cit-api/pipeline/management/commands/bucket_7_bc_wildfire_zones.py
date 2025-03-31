import os
from django.core.management.base import BaseCommand
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket7.bucket7_bc_wildfire_zones import import_data_sources
from pipeline.models.general import DataSource
from admin import settings
from pipeline.management.commands.util.base_bucket_7_import_command import download_static_files


class Command(BaseCommand):

    def handle(self, *args, **options):
        download_static_files(self.SUB_FOLDERS)

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'bc_wildfires_zones'
        ])

        for resource in data_resources:
            print(f'Importing {resource.display_name}...')
            import_wms_resource(resource)
        
        print("Import process for BC wildfire zone completed!")
