from pipeline.management.commands.base.base_import_command import BaseImportCommand
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.data_sources import import_data_sources
from pipeline.importers.databc_resource import import_databc_resources
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.importers.utils import (
    calculate_community_num_schools, calculate_community_num_hospitals,
    calculate_community_num_courts, calculate_community_num_timber_facilities,
    calculate_nearest_location_types_outside_50k, calculate_communities_for_schools,
    calculate_regional_districts_for_communities)
from pipeline.models.general import DataSource


class Command(BaseImportCommand):
    SUB_FOLDERS = ['bc_assessment']

    def handle(self, *args, **options):
        import traceback
        self.download_static_files()

        errors = []

        # Ensure that the data sources are updated
        print("Importing newest list of data sources.")
        try:
            import_data_sources()
        except Exception as e:
            print("Error in import_data_sources:")
            traceback.print_exc()
            errors.append(("import_data_sources", e, traceback.format_exc()))

        non_bca_resources = DataSource.objects.exclude(name__in=[
            'bc_assessment_economic_region', 'bc_assessment_census_subdivision',
            'bc_assessment_regional_district'
        ]).order_by('import_order')

        for resource in non_bca_resources:
            print(resource)
            try:
                if resource.source_type == "wms":
                    print(f'Importing {resource.display_name}...')
                    import_wms_resource(resource)
                if resource.source_type == "csv":
                    print(f'Importing {resource.display_name}...')
                    import_csv_resources(resource.name)
                if resource.source_type == "shp":
                    print(f'Importing {resource.display_name}...')
                    import_shp_resources(resource.name)
                if resource.source_type == "api":
                    print(f'Importing {resource.display_name}...')
                    import_databc_resources(resource.name)
            except Exception as e:
                print(f"Error importing resource {resource.display_name} ({resource.source_type}):")
                traceback.print_exc()
                errors.append((f"import_{resource.display_name}", e, traceback.format_exc()))

        # calculate foreign keys
        try:
            calculate_communities_for_schools()
        except Exception as e:
            print("Error in calculate_communities_for_schools:")
            traceback.print_exc()
            errors.append(("calculate_communities_for_schools", e, traceback.format_exc()))
        try:
            calculate_regional_districts_for_communities()
        except Exception as e:
            print("Error in calculate_regional_districts_for_communities:")
            traceback.print_exc()
            errors.append(("calculate_regional_districts_for_communities", e, traceback.format_exc()))

        # have to import BCA resources after this mapping is done for regional districts.
        bca_resources = DataSource.objects.filter(name__in=[
            'bc_assessment_economic_region', 'bc_assessment_census_subdivision',
            'bc_assessment_regional_district'
        ]).order_by('import_order')

        for resource in bca_resources:
            try:
                print(f'Importing {resource.display_name}...')
                import_csv_resources(resource.name)
            except Exception as e:
                print(f"Error importing BCA resource {resource.display_name}:")
                traceback.print_exc()
                errors.append((f"import_BCA_{resource.display_name}", e, traceback.format_exc()))

        try:
            calculate_nearest_location_types_outside_50k()
        except Exception as e:
            print("Error in calculate_nearest_location_types_outside_50k:")
            traceback.print_exc()
            errors.append(("calculate_nearest_location_types_outside_50k", e, traceback.format_exc()))

        # calculate cached fields
        try:
            calculate_community_num_schools()
        except Exception as e:
            print("Error in calculate_community_num_schools:")
            traceback.print_exc()
            errors.append(("calculate_community_num_schools", e, traceback.format_exc()))
        try:
            calculate_community_num_hospitals()
        except Exception as e:
            print("Error in calculate_community_num_hospitals:")
            traceback.print_exc()
            errors.append(("calculate_community_num_hospitals", e, traceback.format_exc()))
        try:
            calculate_community_num_courts()
        except Exception as e:
            print("Error in calculate_community_num_courts:")
            traceback.print_exc()
            errors.append(("calculate_community_num_courts", e, traceback.format_exc()))
        try:
            calculate_community_num_timber_facilities()
        except Exception as e:
            print("Error in calculate_community_num_timber_facilities:")
            traceback.print_exc()
            errors.append(("calculate_community_num_timber_facilities", e, traceback.format_exc()))

        print("Import process completed!")
        if errors:
            print("\nSummary of errors encountered:")
            for label, exc, tb in errors:
                print(f"\n--- {label} ---\n{tb}")