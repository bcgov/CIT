from pathlib import Path
from django.core.management.base import BaseCommand
from pipeline.importers.csv_resource import import_csv_resources

from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket7 import import_data_sources
from pipeline.models.general import DataSource
from pipeline.management.commands.util.azure_blob_utils import download_static_files


class Command(BaseCommand):
    def handle(self, *args, **options):
        download_static_files(self.SUB_FOLDERS)

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        bca_resources = DataSource.objects.filter(name__in=[
            'LinkageWithCensus'
        ]).order_by('import_order')

        for resource in bca_resources:
            print(f'Importing {resource.display_name}...')
            import_csv_resources(resource.name)

        print("Import process for bucket7 completed!")