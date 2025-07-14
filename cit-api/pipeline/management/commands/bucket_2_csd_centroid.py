from pipeline.importers.bucket2.bucket2_csd_centroid import (
    CSDCentroidImporter as importer,
)
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.management.commands.base.base_import_command import BaseImportCommand
from pipeline.models.general import DataSource


class Command(BaseImportCommand):
    def handle(self, *args, **options):
        self.download_static_files()

        # Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        importer.import_data_sources()
        # Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=["csd_centroid"])

        for resource in data_resources:
            print(f"Importing {resource.display_name}...")
            import_csv_resources(resource.name)
            print(f"Import process for {resource.display_name} completed!")
