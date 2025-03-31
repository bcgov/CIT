from pipeline.importers.bucket4.bucket4_monthly import import_data_sources
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.models.general import DataSource
from pipeline.management.commands.util.base_bucket_4_import_command import ImportBaseCommand


class Command(ImportBaseCommand):

    def handle(self, *args, **options):
        self.fetch_latest_static_files()
        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'agricultural_land_reserve'
        ])

        for resource in data_resources:
            print(f'Importing {resource.display_name}...')
            import_wms_resource(resource)
            
        print("Import process for bucket4_monthly completed!")