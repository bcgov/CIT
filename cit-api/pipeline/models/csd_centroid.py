from django.contrib.gis.db import models


class CSDCentroid(models.Model):
    id = models.IntegerField(primary_key=True)
    census_subdivision_id = models.IntegerField(null=False, blank=False) 

    name = models.IntegerField(null=False)
    closest_community_id = models.CharField(max_length=127, null=True) # currently null
    closest_community_distance = models.CharField(max_length=127, null=True) # currently null
    
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    location_name = models.CharField(max_length=127, name="Location Name")

    first_responders = models.IntegerField(name="First Responders", null=True)
    diagnostic_facilities = models.IntegerField(name="Diagnostic Facilities", null=True)
    timber_facilities = models.IntegerField(name="Timber Facilities", null=True)
    civic_facilities = models.IntegerField(name="Civic Facilities", null=True)
    airports = models.IntegerField(name="Airports", null=True)
    port_and_terminal = models.IntegerField(name="Port And Terminal", null=True)
    customs_ports_of_entry = models.IntegerField(name="Customs Ports Of Entry", null=True)
    local_govt_offices = models.IntegerField(name="Local Govt Offices", null=True)
    laboratory_services = models.IntegerField(name="Laboratory Service", null=True)
    emergency_social_service_facilities = models.IntegerField(name="Emergency Social Service Facilities", null=True)
    pharmacies = models.IntegerField(name="Pharmacies", null=True)
    economic_projects = models.IntegerField(name="Economic Projects", null=True)
    hospitals = models.IntegerField(name="Hospitals", null=True)
    service_bc_locations = models.IntegerField(name="Service BC Locations", null=True)
    schools = models.IntegerField(name="Schools", null=True)
    clinics = models.IntegerField(name="Clinics", null=True)
    courts = models.IntegerField(name="Courts", null=True)
    post_secondary_institutions = models.IntegerField(name="Post Secondary Institutions", null=True)
    research_centres = models.IntegerField(name="Research Centres", null=True)
    public_library = models.IntegerField(name="Public Library", null=True)
    is_within_50km = models.IntegerField(name="Is within 50 km", null=True)

    location_type_id = models.IntegerField(null=True)
    location_website = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = "c2021_FeatureToPoint_TableToExcel"
