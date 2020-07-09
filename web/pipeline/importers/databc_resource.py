import requests

from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.core.exceptions import FieldDoesNotExist

from pipeline.constants import DATABC_RESOURCES
from pipeline.models import (
    Community,
)

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

    resource = DATABC_RESOURCES[resource_type]
    resource_id = resource['resource_id']
    response = requests.get(API_URL.format(resource_id=resource_id))

    if response.status_code != 200:
        print("Failed to download dataset {} {}".format(resource_type, resource_id))
        print("Error: {} {}".format(response.status_code, response.content))
        return

    data = response.json()["result"]["records"]
    Model = resource['model']

    for row in data:
        try:
            point = Point(
                float(row[Model.LONGITUDE_FIELD]),
                float(row[Model.LATITUDE_FIELD]),
                srid=3005
            )
        except TypeError:
            print("Skipping error:", row[Model.NAME_FIELD], "has no geometry!")
            continue
        closest_community = Community.objects.annotate(
            distance=Distance('point', point)
        ).order_by('distance').first()
        # containing_subdiv = CensusSubdivision.objects.get(geom__contains=point)
        instance = Model.objects.get_or_create(
            name=row[Model.NAME_FIELD],
            point=point,
            location_type=resource_type,
            community=closest_community
        )[0]

        for field_name, field_value in row.items():
            # loop over fields, and if the field exists
            # on the model, import this field
            if isinstance(field_value, str):
                try:
                    field_value = field_value[:Model._meta.get_field(field_name.lower()).max_length]
                except FieldDoesNotExist:
                    pass
            setattr(instance, field_name.lower(), field_value)

        print(instance)
        instance.save()
