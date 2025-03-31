import os
from pathlib import Path
from azure.storage.blob import BlobServiceClient
from admin import settings


def fetch_static_files(sub_folders):
    #If in test or prod make sure the most recent static files are fetched.
    if settings.ENV_LEVEL in ['test', 'prod']:
        print("Pulling down latest static files.")
        for folder in sub_folders:
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
