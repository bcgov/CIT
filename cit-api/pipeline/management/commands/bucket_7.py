from pipeline.management.commands.base.base_import_command import BaseImportCommand
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.importers.bucket7.bucket7 import import_data_sources
from pipeline.models.general import DataSource

class Command(BaseImportCommand):
    def handle(self, *args, **options):
        self.download_static_files()

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