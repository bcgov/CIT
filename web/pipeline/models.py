from django.contrib.gis.db import models
from django.contrib.gis.db.models import PointField


class CensusSubdivision(models.Model):
    # CSUID is used as primary key, just 'id' in Django.
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)


class Community(models.Model):
    place_id = models.CharField(null=True, blank=True, max_length=255)
    place_name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    census_subdivision = models.ForeignKey(CensusSubdivision, on_delete=models.CASCADE)
    hexuid = models.IntegerField(help_text="ID of spatial hex used to color province by connectivity quality.")

    def __str__(self):
        return self.place_name

    class Meta:
        verbose_name_plural = "Communities"

    def latitude(self):
        return self.location[1]

    def longitude(self):
        return self.location[0]


class Location(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    location_type = models.CharField(null=True, blank=True, max_length=255)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    census_subdivision = models.ForeignKey(CensusSubdivision, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def latitude(self):
        return self.point[1]


class Hospital(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'SV_NAME'

    sv_reference = models.IntegerField(null=True, blank=True)
    rg_name = models.CharField(null=True, blank=True, max_length=255)
    # sv_name = models.CharField(null=True, blank=True, max_length=255)
    # sv_description = models.TextField(null=True, blank=True)
    # phone_number = models.CharField(null=True, blank=True, max_length=255)
    # website = models.TextField(null=True, blank=True)
    # wheelchair_accessible = models.CharField(null=True, blank=True, max_length=255)
    # language = models.CharField(null=True, blank=True, max_length=255)
    # hours = models.TextField(null=True, blank=True)
    # street_number = models.CharField(null=True, blank=True, max_length=255)
    # city = models.CharField(null=True, blank=True, max_length=255)
    # province = models.CharField(null=True, blank=True, max_length=255)
    # postal_code = models.CharField(null=True, blank=True, max_length=255)
    # location = PointField(null=True, blank=True)
    # link_811 = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    def load_from_json(self, row):
        Hospital.objects.create(
            sv_reference=row['SV_REFERENCE'],
            rg_name=row['RG_NAME'],
            name=row['SV_NAME'],
            point=Point(float(row["LONGITUDE"]), float(row["LATITUDE"]))
        )

class Court(Location):
    LATITUDE_FIELD = 'Latitude'
    LONGITUDE_FIELD = 'Longitude'
    NAME_FIELD = 'Placemark_name'

    '''
    {
        "_id": 4,
        "Folder": "Provincial",
        "Placemark_name": "GANGES",
        "Latitude": 48.859991,
        "Longitude": -123.509222,
        "Region_Name": "Vancouver Island",
        "Full_Address": "343 Lower Ganges Road, Ganges, BC",
        "Template": 6,
        "Location": "GANGES",
        "Address": "343 Lower Ganges Road",
        "City": "Ganges",
        "Province": "BC",
        "Postal_Code": "V8K 2V3",
        "Contact_Phone": "(250)746-1258",
        "Fax_Number": " Contact Duncan for info",
        "Hours_of_Operation": "-",
        "Staffed/Unstaffed": "No",
        "Court_Level": "Provincial"
    }
    '''

    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=7)
    contact_phone = models.CharField(max_length=30)
    fax_number = models.CharField(max_length=30)
    hours_of_operation = models.CharField(max_length=255)
    court_level = models.CharField(max_length=20)


class EconomicProject(Location):
    '''

    '''

class NaturalResourceProject(Location):
    '''

    '''

class ServiceBCLocation(Location):
    '''

    '''

class School(Location):
    '''

    '''
class Clinic(Location):
    '''

    '''


