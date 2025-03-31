from pipeline.management.commands.util.base_bucket_1_import_command import BaseImportCommand
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.bucket1.bucket1_census_divisions import import_data_sources
from pipeline.models.general import DataSource


class Command(BaseImportCommand):
    def handle(self, *args, **options):
        self.fetch_static_files()

        # Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()

        # Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'census_divisions'
        ]).order_by('import_order')

        for resource in data_resources:
            if resource.source_type == "wms":
                print(f'Importing {resource.display_name}...')
                import_wms_resource(resource)

        print("Import process for Census Divisions completed!")
