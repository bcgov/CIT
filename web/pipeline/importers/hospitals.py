from django.contrib.gis.geos import Point

from pipeline.models import Hospital


def import_hospitals(data):
    for row in data:
        print("here", row)
        Hospital.objects.create(
            sv_reference=row['SV_REFERENCE'],
            rg_name=row['RG_NAME'],
            name=row['SV_NAME'],
            point=Point(float(row["LONGITUDE"]), float(row["LATITUDE"]))
        )
