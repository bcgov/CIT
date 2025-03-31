from pipeline.management.commands.util.base_bucket_1_import_command import BaseBucketImportCommand
from pipeline.importers.bucket1.bucket1_census_subdivisions_2016 import import_data_sources

class Command(BaseBucketImportCommand):
    RESOURCE_NAMES = ['census_subdivisions_2016']

    def import_sources(self):
        import_data_sources()

    def handle(self, *args, **options):
        super().handle(*args, **options)
        print("Import process for Census Subdivisions 2016 completed!")
