from pipeline.management.commands.base.base_import_command import BaseImportCommand
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket5.bucket5_monthly import import_data_sources
from pipeline.models.general import DataSource


class Command(BaseImportCommand):

    def handle(self, *args, **options):
        self.download_static_files()

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'economic_projects', 'first_responders'
        ])

        for resource in data_resources:
            print(f'Importing {resource.display_name}...')
            import_wms_resource(resource)
        print("Import process for bucket5_monthly completed!")