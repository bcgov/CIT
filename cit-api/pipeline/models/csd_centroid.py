from django.contrib.gis.db import models


class CSDCentroid(models.Model):
    id = models.IntegerField(primary_key=True)
    census_subdivision_id = models.IntegerField(null=False, blank=False) 

    name = models.CharField(max_length=127, null=False)
    closest_community_id = models.CharField(max_length=127, null=True) # currently null
    closest_community_distance = models.CharField(max_length=127, null=True) # currently null
    
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    location_name = models.CharField(max_length=127)

    first_responders = models.IntegerField(null=True)
    diagnostic_facilities = models.IntegerField(null=True)
    timber_facilities = models.IntegerField(null=True)
    civic_facilities = models.IntegerField(null=True)
    airports = models.IntegerField(null=True)
    port_and_terminal = models.IntegerField(null=True)
    customs_ports_of_entry = models.IntegerField(null=True)
    local_govt_offices = models.IntegerField(null=True)
    laboratory_services = models.IntegerField(null=True)
    emergency_social_service_facilities = models.IntegerField(null=True)
    pharmacies = models.IntegerField(null=True)
    economic_projects = models.IntegerField(null=True)
    hospitals = models.IntegerField(null=True)
    service_bc_locations = models.IntegerField(null=True)
    schools = models.IntegerField(null=True)
    clinics = models.IntegerField(null=True)
    courts = models.IntegerField(null=True)
    post_secondary_institutions = models.IntegerField(null=True)
    research_centres = models.IntegerField(null=True)
    public_library = models.IntegerField(null=True)
    is_within_50km = models.IntegerField(null=True)

    location_type_id = models.IntegerField(null=True)
    location_website = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = "c2021_FeatureToPoint_TableToExcel"
