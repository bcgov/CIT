from django.core.management.base import BaseCommand
from pipeline.management.commands.util.blob_utils import download_static_files
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket1.bucket1_census_subdivisions_2016 import import_data_sources
from pipeline.models.general import DataSource


class Command(BaseCommand):
    
    SUB_FOLDERS = ['bc_assessment']
    
    def handle(self, *args, **options):
        download_static_files(self.SUB_FOLDERS)

        # Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'census_subdivisions'
        ]).order_by('import_order')

        for resource in data_resources:
            if resource.source_type == "wms":
                print(f'Importing {resource.display_name}...')
                import_wms_resource(resource)

        print("Import process for bucket1 completed!")