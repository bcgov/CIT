from pipeline.management.commands.base.base_import_command import BaseImportCommand

from pipeline.importers.bucket2.bucket2_businesses_by_csd import import_data_sources
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.models.general import DataSource


class Command(BaseImportCommand):

    def handle(self, *args, **options):
        self.download_static_files()

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'BusinessesByCSD'
        ])

        for resource in data_resources:
            import_csv_resources(resource.name)
        print("Import process for Businesses by Census Subdivisions completed!")