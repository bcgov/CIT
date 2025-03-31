from django.core.management.base import BaseCommand

from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket2.bucket2_tsunami_zones import import_data_sources
from pipeline.models.general import DataSource
from pipeline.management.commands.util.blob_utils import fetch_static_files


class Command(BaseCommand):

    def handle(self, *args, **options):
        fetch_static_files(self.SUB_FOLDERS)

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'tsunami_zones'
        ])

        for resource in data_resources:
            import_wms_resource(resource)
        print("Import process for Tsunami Zones completed!")