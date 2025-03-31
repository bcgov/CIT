# pipeline/management/base_bucket_import_command.py

import os
from pathlib import Path
from django.core.management.base import BaseCommand
from azure.storage.blob import BlobServiceClient
from pipeline.models.general import DataSource
from admin import settings
from pipeline.importers.databc_resource import import_wms_resource


class BaseBucketImportCommand(BaseCommand):
    SUB_FOLDERS = ['bc_assessment']
    RESOURCE_NAMES = []  # override in subclass

    def fetch_latest_static_files(self):
        print("Pulling down latest static files.")
        for folder in self.SUB_FOLDERS:
            folder_path = os.path.join(settings.AZURE_BLOB_STORAGE_LOCAL_PATH, folder)
            print(folder_path)
            Path(folder_path).mkdir(parents=True, exist_ok=True)

        blob_service_client = BlobServiceClient.from_connection_string(
            settings.AZURE_BLOB_STORAGE_CONNECTION_STRING)
        container_client = blob_service_client.get_container_client('data')
        for blob in container_client.list_blobs():
            blob_client = container_client.get_blob_client(blob)
            download_file_path = os.path.join(settings.AZURE_BLOB_STORAGE_LOCAL_PATH, blob.name)
            print(download_file_path)
            print(blob)
            if blob.name[-1] != ('/'):
                with open(download_file_path, "wb") as download_file:
                    download_file.write(blob_client.download_blob().readall())

    def import_data_resources(self):
        data_resources = DataSource.objects.filter(name__in=self.RESOURCE_NAMES).order_by('import_order')
        for resource in data_resources:
            if resource.source_type == "wms":
                print(f'Importing {resource.display_name}...')
                import_wms_resource(resource)

    def handle(self, *args, **options):
        if settings.ENV_LEVEL in ['test', 'prod']:
            self.fetch_latest_static_files()

        print("Importing newest list of data sources.")
        self.import_sources()
        self.import_data_resources()

    def import_sources(self):
        """Subclasses must override this to call their specific import_data_sources()"""
        raise NotImplementedError("Subclasses must implement import_sources()")
