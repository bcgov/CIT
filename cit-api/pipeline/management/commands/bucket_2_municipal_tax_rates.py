from django.core.management.base import BaseCommand

from pipeline.importers.bucket2.bucket2_municipal_tax_rates import (
    MunicipalTaxRatesImporter as importer,
)
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.models.general import DataSource
from pipeline.management.commands.util.azure_blob_utils import download_static_files


class Command(BaseCommand):
    def handle(self, *args, **options):
        download_static_files(self.SUB_FOLDERS)

        # Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        importer.import_data_sources()
        # Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=["municipal_tax_rates"])
        for resource in data_resources:
            print(f"Importing {resource.display_name}...")
            import_csv_resources(resource.name)

        print("Import process for Municipal Tax Rates completed!")
