from django.core.management.base import BaseCommand

from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket2.bucket2_municipalities import import_data_sources
from pipeline.importers.shp_resource import import_shp_resources
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
            'municipalities'
        ])

        for resource in data_resources:
            import_wms_resource(resource)
        print("Import process for Municipalities completed!")