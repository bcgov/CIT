import os

from django.apps import apps
from django.conf import settings

from pipeline.constants import SOURCE_DATABC, SOURCE_OPENCA, SOURCE_STATSCAN
from pipeline.models.general import DataSource
from pipeline.importers.communities import import_communities_from_csv
from pipeline.importers.projects import import_projects
from pipeline.importers.utils import (import_data_into_point_model, read_csv,
                                      import_civic_leaders_from_csv, get_databc_last_modified_date,
                                      import_services, get_openca_last_modified_date,
                                      import_connectivity_project, import_naics_codes,
                                      import_businesses_by_cid,import_bc_assessment_data,import_housing,import_census_subdivision_linkage,import_nbdphhspeeds,import_phdemographicdistribution,
                                      import_core_housing_need)

FILES_DIR = settings.BASE_DIR


def import_csv_resources(resource_type):
    csv_resource_names = DataSource.objects.filter(source_type="csv").values_list("name", flat=True)
    print(csv_resource_names)
    if resource_type not in ['all', *csv_resource_names]:
        print(resource_type)
        print('Cannot parse NAICS Codes csv file')
        print("Error: Resource type {} not supported".format(resource_type))
        return

    if resource_type == "all":
        for available_resource_type in csv_resource_names:
            import_resource(available_resource_type)
    else:
        import_resource(resource_type)


def import_resource(resource_type):
    data_source = DataSource.objects.get(name=resource_type)
    file_path = os.path.join(FILES_DIR, data_source.source_file_path)
    URL = data_source.external_url

    # TODO SY - move this into constants?
    location_csv_resources = [
        'first_responders', 'diagnostic_facilities', 'timber_facilities', 'civic_facilities',
        'closed_mills', 'airports', 'port_and_terminal', 'eao_projects', 'laboratory_service',
        'local_govt_offices', 'emergency_social_service_facilities', 'natural_resource_projects',
        'customs_ports_of_entry', 'pharmacies', 'public_library'
    ]
    bca_resources = [
        'bc_assessment_census_subdivision', 'bc_assessment_economic_region',
        'bc_assessment_regional_district'
    ]
    print(resource_type)
    if resource_type == "core_housing":
        import_core_housing_need(file_path)
    if resource_type == "communities":
        import_communities_from_csv(file_path)
    elif resource_type == "civic_leaders":
        import_civic_leaders_from_csv(file_path)
    elif resource_type == "services":
        import_services(URL)
    elif resource_type == "projects":
        import_projects(file_path)
    elif resource_type == "LinkageWithCensus":
        import_census_subdivision_linkage(file_path)
    elif resource_type == "Housing_Data":
        import_housing(URL) 
    elif resource_type == "phdemographicdistribution":
        import_phdemographicdistribution(URL, file_path)    
    elif resource_type == "NBDPHHSpeeds":
        import_nbdphhspeeds(URL)
    elif resource_type == "NAICS_Codes":
        import_naics_codes(URL)
    elif resource_type == 'BusinessesByCSD':
        import_businesses_by_cid(file_path, URL)
    elif resource_type == 'connectivity_infrastructure_projects':
        import_connectivity_project(URL)
    elif resource_type in bca_resources:
        model_class = apps.get_model("pipeline", data_source.model_name)
        import_bc_assessment_data(file_path, model_class, resource_type)
    elif resource_type in location_csv_resources:
        data = read_csv(data_source.source_file_path)
        for row in data:
            model_class = apps.get_model("pipeline", data_source.model_name)
            import_data_into_point_model(resource_type, model_class, row)
    else:
        print("Error: Resource type {} not supported".format(resource_type))

    if data_source.source == SOURCE_DATABC:
        data_source.last_updated = get_databc_last_modified_date(data_source)
        data_source.save()
    elif data_source.source == SOURCE_OPENCA:
        data_source.last_updated = get_openca_last_modified_date(data_source)
        data_source.save()
