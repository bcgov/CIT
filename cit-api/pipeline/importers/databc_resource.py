import requests
import bcdata
import pandas as pd

from django.apps import apps

from pipeline.constants import SOURCE_DATABC, SOURCE_OPENCA, BC_ALBERS_SRID, WGS84_SRID
from pipeline.models.general import DataSource
from pipeline.importers.utils import (import_data_into_point_model, import_data_into_area_model,
                                      get_databc_last_modified_date, get_openca_last_modified_date,
                                      _generate_geom, _generate_bcdata_geom, calculate_muni_or_rd)

API_URL = "https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id={resource_id}&limit=10000"
LOCATION_RESOURCES = [
    'first_responders',
    'diagnostic_facilities',
    'timber_facilities',
    'civic_facilities',
    'airports',
    'port_and_terminal',
    'eao_projects',
    'laboratory_service',
    'economic_projects',
    'local_govt_offices',
    'emergency_social_service_facilities',
    'customs_ports_of_entry',
    'pharmacies',
    'public_library',
]


def import_databc_resources(resource_type):
    databc_resource_names = DataSource.objects.filter(source_type="api").values_list("name",
                                                                                     flat=True)
    if resource_type not in ['all', *databc_resource_names]:
        print("Error: Resource type {} not supported".format(resource_type))
        return

    if resource_type == "all":
        for available_resource_type in databc_resource_names:
            import_resource(available_resource_type)
    else:
        import_resource(resource_type)


def import_resource(resource_type):
    data_source = DataSource.objects.get(name=resource_type)
    resource_id = data_source.resource_id
    response = requests.get(API_URL.format(resource_id=resource_id))

    if response.status_code != 200:
        print("Failed to download dataset {} {}".format(resource_type, resource_id))
        print("Error: {} {}".format(response.status_code, response.content))
        return

    data = response.json()["result"]["records"]

    for row in data:
        model_class = apps.get_model("pipeline", data_source.model_name)
        import_data_into_point_model(resource_type, model_class, row)

    if data_source.source == SOURCE_DATABC:
        data_source.last_updated = get_databc_last_modified_date(data_source)
        data_source.save()
    elif data_source.source == SOURCE_OPENCA:
        data_source.last_updated = get_openca_last_modified_date(data_source)
        data_source.save()


def import_wms_resource(resource):
    query = None
    if resource.name == 'lakes':
        query = "FEATURE_AREA_SQM >= 1000000"
    if resource.name == 'road_and_highways':
        query = "ROAD_CLASS in ('highway','freeway','ramp', 'arterial')"

    ds = bcdata.get_data(resource.dataset, as_gdf=True, query=query)
    for index, row in ds.iterrows():
        model_class = apps.get_model("pipeline", resource.model_name)
        print(resource.name)
        print(row)
        if resource.name in LOCATION_RESOURCES:
            instance = import_data_into_point_model(resource.name, model_class, row)
        else:
            instance = import_data_into_area_model(resource.display_name, model_class, row, index)
            geos_geom_out, geos_geom_simplified = _generate_bcdata_geom(row, WGS84_SRID)
            instance.geom = geos_geom_out
            instance.geom_simplified = geos_geom_simplified
            if resource.name == 'tsunami_zones':
              instance.tsunami_zone_name  = import_tsunami_full_description(instance.name, resource.source_file_path)
        if resource.name == 'agricultural_land_reserve':
            calculate_muni_or_rd(instance)
        instance.save()

def import_tsunami_full_description(zone_classification, file_path):
    data =  pd.read_excel(file_path,engine='openpyxl',skiprows = 1)
    for index, row in data.iterrows():
        if row['TSUNAMI_ZONE_CLASSIFICATION'] == zone_classification:
            return row['TSUNAMI_ZONE_NAME']
        else:
            return ''