from pipeline.management.commands.base.base_import_command import BaseImportCommand

from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket2.bucket2_municipalities import import_data_sources
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.models.general import DataSource


class Command(BaseImportCommand):

    def handle(self, *args, **options):
        self.download_static_files()

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