import csv

from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from django.core.exceptions import FieldDoesNotExist

from pipeline.models import Community


def import_data_into_model(resource_type, Model, row):


    try:
        instance = Model.objects.get(name=row[Model.NAME_FIELD], location_type=resource_type)
    except Model.DoesNotExist:
        instance = Model(name=row[Model.NAME_FIELD], location_type=resource_type)

    # containing_subdiv = CensusSubdivision.objects.get(geom__contains=point)
    if hasattr(Model, 'LONGITUDE_FIELD'):
        try:
            point = Point(float(row[Model.LONGITUDE_FIELD]), float(row[Model.LATITUDE_FIELD]), srid=4326)
        except TypeError:
            print("Skipping error:", row[Model.NAME_FIELD], "has no geometry!")
            return
        closest_community = Community.objects.annotate(distance=Distance('point', point)).order_by('distance').first()
        instance.point = point
        instance.community = closest_community

    for field_name, field_value in row.items():
        # loop over fields, and if the field exists
        # on the model, import this field
        if isinstance(field_value, str):
            try:
                field_value = field_value[: Model._meta.get_field(field_name.lower()).max_length]
            except FieldDoesNotExist:
                pass
        setattr(instance, field_name.lower(), field_value)

    instance.save()
    return instance


def read_csv(csv_path):
    data = []
    with open(csv_path, mode='r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        data = list(reader)

    return data
