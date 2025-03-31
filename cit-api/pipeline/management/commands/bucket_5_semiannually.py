import os
from pathlib import Path
from django.core.management.base import BaseCommand

from pipeline.importers.databc_resource import import_wms_resource, import_databc_resources
from pipeline.importers.bucket5.bucket5_semiannually import import_data_sources
from pipeline.importers.utils import (
    calculate_community_num_schools, calculate_community_num_hospitals,
    calculate_community_num_courts, calculate_community_num_timber_facilities,
    calculate_nearest_location_types_outside_50k, calculate_communities_for_schools,
    calculate_regional_districts_for_communities)
from pipeline.models.general import DataSource
from admin import settings
from pipeline.management.commands.util.azure_blob_utils import download_static_files


class Command(BaseCommand):

    def handle(self, *args, **options):
        download_static_files(self.SUB_FOLDERS)

        #Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        import_data_sources()
        #Ensure that the data sources are updated
        data_resources = DataSource.objects.filter(name__in=[
            'airports', 'civic_facilities', 'clinics', 'customs_ports_of_entry',
            'diagnostic_facilities', 'emergency_social_service_facilities', 'hospitals',
            'laboratory_service', 'local_govt_offices', 'pharmacies', 'port_and_terminal',
            'public_library', 'schools', 'servicebc_locations', 'timber_facilities'
        ])

        for resource in data_resources:
            if resource.source_type == "wms":
                print(f'Importing {resource.display_name}...')
                import_wms_resource(resource)
            if resource.source_type == "api":
                print(f'Importing {resource.display_name}...')
                import_databc_resources(resource.name)
            if resource.source_type == "csv":
                print(f'Importing {resource.display_name}...')

        calculate_nearest_location_types_outside_50k()
        calculate_community_num_schools()
        calculate_community_num_hospitals()
        calculate_community_num_courts()
        calculate_community_num_timber_facilities()
        print("Import process for bucket5_semiannually completed!")