import requests

from pipeline.constants import DATABC_RESOURCES

from pipeline.importers.utils import import_data_into_point_model

API_URL = "https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id={resource_id}&limit=10000"


def import_databc_resources(resource_type):
    if resource_type not in ['all', *DATABC_RESOURCES.keys()]:
        print("Error: Resource type {} not supported".format(resource_type))
        return

    if resource_type == "all":
        for available_resource_type in DATABC_RESOURCES.keys():
            import_resource(available_resource_type)
    else:
        import_resource(resource_type)


def import_resource(resource_type):

    resource_config = DATABC_RESOURCES[resource_type]
    resource_id = resource_config['resource_id']
    response = requests.get(API_URL.format(resource_id=resource_id))

    if response.status_code != 200:
        print("Failed to download dataset {} {}".format(resource_type, resource_id))
        print("Error: {} {}".format(response.status_code, response.content))
        return

    data = response.json()["result"]["records"]

    for row in data:
        import_data_into_point_model(resource_type, resource_config["model"], row)
