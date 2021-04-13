from django.core.management.base import BaseCommand
from azure.storage.blob import BlobServiceClient

from pipeline.importers.data_sources import import_data_sources
from admin.settings import AZURE_BLOB_STORAGE_CONNECTION_STRING


class Command(BaseCommand):
    def handle(self, *args, **options):

        blob_service_client = BlobServiceClient.from_connection_string(
            AZURE_BLOB_STORAGE_CONNECTION_STRING)
        container_client = blob_service_client.get_container_client('data')
        for blob in container_client.list_blobs():
            print(blob)