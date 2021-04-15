import os

from pathlib import Path
from django.core.management.base import BaseCommand
from azure.storage.blob import BlobServiceClient

from pipeline.importers.data_sources import import_data_sources
from admin import settings


class Command(BaseCommand):
    def handle(self, *args, **options):
        