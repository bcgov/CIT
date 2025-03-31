import os
from django.core.management.base import BaseCommand
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket5.bucket5_civic_facilities import import_data_sources
from pipeline.models.general import DataSource
from admin import settings
from pipeline.management.commands.util.azure_blob_utils import download_static_files


class Command(BaseCommand):

    def handle(self, *args, **options):
        #If in test or prod make sure the most recent static files are fetched.
        download_static_files(self.SUB_FOLDERS)

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'civic_facilities'
        ])

        for resource in data_resources:
            print(f'Importing {resource.display_name}...')
            import_wms_resource(resource)
            
        print("Import process for bucket5_civic_facilities completed!")