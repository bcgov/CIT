from django.core.management.base import BaseCommand

from pipeline.importers.bucket2.bucket2_municipal_land_title_transfers import (
    MunicipalLandTitleTransfersImporter as importer,
)
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.models.general import DataSource
from pipeline.management.commands.util.blob_utils import fetch_static_files


class Command(BaseCommand):
    def handle(self, *args, **options):
        fetch_static_files(self.SUB_FOLDERS)

        # Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        importer.import_data_sources()
        # Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=["municipal_land_title_transfers"])
        for resource in data_resources:
            print(f"Importing {resource.display_name}...")
            import_csv_resources(resource.name)
            print(f"Import process for {resource.display_name} completed!")
