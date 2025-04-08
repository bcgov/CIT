from pipeline.management.commands.base.base_import_command import BaseImportCommand
from pipeline.importers.bucket5.bucket5_clinics import import_data_sources
from pipeline.importers.databc_resource import import_wms_resource, import_databc_resources
from pipeline.models.general import DataSource


class Command(BaseImportCommand):

    def handle(self, *args, **options):
        #If in test or prod make sure the most recent static files are fetched.
        self.download_static_files()

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'clinics'
        ])

        for resource in data_resources:
            print(f'Importing {resource.display_name}...')
            import_databc_resources(resource.name)
            
        print("Import process for bucket5_clinics completed!")