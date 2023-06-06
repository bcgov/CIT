from django.contrib.gis.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.gis.geos import Point

from pipeline.utils import get_quarterly_date_str_as_date
from pipeline.constants import WGS84_SRID


class Location(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True, srid=WGS84_SRID)
    location_fuzzy = models.BooleanField(
        default=False,
        help_text=
        "This field should be set to True if the `point` field was not present in the original dataset "
        "and is inferred or approximated by other fields.",
    )

    location_type = models.CharField(null=True, blank=True, max_length=255)

    closest_community = models.ForeignKey('Community', on_delete=models.CASCADE)
    closest_community_distance = models.CharField(null=True, blank=True, max_length=64)

    location_phone = models.CharField(null=True, blank=True, max_length=255)
    location_email = models.EmailField(null=True, blank=True)
    location_website = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name

    def get_latitude(self):
        if self.point:
            return self.point[1]
        else:
            # debugging; remove later
            print("Location {} has no location".format(self.name))
            return None

    def get_longitude(self):
        if self.point:
            return self.point[0]
        else:
            # debugging; remove later
            print("Location {} has no location".format(self.name))
            return None

    class Meta:
        # Note: `name` and `location_type` are not unique; e.g. there are two mills in different cities
        # named "West Fraser Mills Ltd."
        unique_together = [['name', 'point', 'location_type']]
        ordering = ("id", )


class Hospital(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'SV_NAME'
    PHONE_FIELD = 'PHONE_NUMBER'
    WEBSITE_FIELD = 'WEBSITE'
    EMAIL_FIELD = 'EMAIL_ADDRESS'

    rg_name = models.CharField(null=True, blank=True, max_length=255)
    sv_description = models.TextField(null=True, blank=True)
    hours = models.TextField(null=True, blank=True)

    num_communities_within_50km = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ("id", )

    '''
    {
        "_id": 5,
        "SV_TAXONOMY": "LL-3000",
        "TAXONOMY_NAME": "Hospitals",
        "RG_REFERENCE": 17644351,
        "RG_NAME": "Fraser Health Authority",
        "SV_REFERENCE": 17992283,
        "SV_NAME": "Chilliwack General Hospital",
        "SV_DESCRIPTION": "Provides community hospital services.",
        "SL_REFERENCE": 17690993,
        "LC_REFERENCE": 17644355,
        "PHONE_NUMBER": 6047954141,
        "WEBSITE": "https://www.fraserhealth.ca/Service-Directory/Locations/Chilliwack/chilliwack-general-hospital#.W1jqwdVKhEY",
        "EMAIL_ADDRESS": "",
        "WHEELCHAIR_ACCESSIBLE": "Y",
        "LANGUAGE": "",
        "HOURS": "Open visiting hours; number of visitors and length of visits may be limited based on patient or unit needs.",
        "STREET_NUMBER": "45600 Menholm Road",
        "STREET_NAME": "",
        "STREET_TYPE": "",
        "STREET_DIRECTION": "",
        "CITY": "Chilliwack",
        "PROVINCE": "BC",
        "POSTAL_CODE": "V2P 1P7",
        "LATITUDE": 49.165763,
        "LONGITUDE": -121.962422,
        "811_LINK": "http://www.healthlinkbc.ca/find/resource.asp?First=1&org=53965&agencynum=17992283&SiteResourceAgencyNum=17644355"
    }
    '''

    def __str__(self):
        return self.name

    def load_from_json(self, row):
        Hospital.objects.create(
            sv_reference=row['SV_REFERENCE'],
            rg_name=row['RG_NAME'],
            name=row['SV_NAME'],
            point=Point(float(row["LONGITUDE"]), float(row["LATITUDE"])),
        )


class Court(Location):
    LATITUDE_FIELD = 'Latitude'
    LONGITUDE_FIELD = 'Longitude'
    NAME_FIELD = 'Placemark_name'
    PHONE_FIELD = 'Contact_Phone'

    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=7)
    contact_phone = models.CharField(max_length=30)
    fax_number = models.CharField(max_length=30)
    hours_of_operation = models.CharField(max_length=255)
    court_level = models.CharField(max_length=20)

    class Meta:
        ordering = ("id", )

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
        *"Hours_of_Operation": "-",
        "Staffed/Unstaffed": "No",
        *"Court_Level": "Provincial"
    }
    '''


class Project(Location):
    NAME_FIELD = 'ECON_MAJOR_PROJECT_ID'
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    TELEPHONE_FIELD = 'TELEPHONE'
    WEBSITE_FIELD = 'PROJECT_WEBSITE'

    project_id = models.IntegerField(null=True, blank=True)
    project_name = models.CharField(max_length=255, null=True, blank=True)
    project_description = models.CharField(max_length=255, null=True, blank=True)
    estimated_cost = models.IntegerField(null=True, blank=True)
    update_activity = models.CharField(max_length=255, null=True, blank=True)
    environmental_assessment_stage = models.CharField(max_length=255, null=True, blank=True)
    construction_type = models.CharField(max_length=255, null=True, blank=True)
    construction_subtype = models.CharField(max_length=255, null=True, blank=True)
    project_type = models.CharField(max_length=255, null=True, blank=True)

    region = models.CharField(max_length=255, null=True, blank=True)
    municipality = models.CharField(max_length=255, null=True, blank=True)

    developer = models.CharField(max_length=255, null=True, blank=True)
    architect = models.CharField(max_length=255, null=True, blank=True)
    project_status = models.CharField(max_length=255, null=True, blank=True)
    project_stage = models.CharField(max_length=255, null=True, blank=True)
    project_category_name = models.CharField(max_length=255, null=True, blank=True)

    public_funding_ind = models.CharField(max_length=255, null=True, blank=True)
    green_building_ind = models.CharField(max_length=255, null=True, blank=True)
    clean_energy_ind = models.CharField(max_length=255, null=True, blank=True)
    first_nation_ind = models.CharField(max_length=255, null=True, blank=True)
    first_nation_names = models.CharField(max_length=255, null=True, blank=True)
    first_nation_agreement = models.CharField(max_length=255, null=True, blank=True)

    construction_jobs = models.IntegerField(null=True, blank=True)
    operating_jobs = models.IntegerField(null=True, blank=True)

    start_date = models.CharField(max_length=255, null=True, blank=True)
    completion_date = models.CharField(max_length=255, null=True, blank=True)
    standardized_start_date = models.CharField(max_length=255, null=True, blank=True)
    standardized_completion_date = models.CharField(max_length=255, null=True, blank=True)

    first_entry_date = models.CharField(max_length=255, null=True, blank=True)
    last_update = models.CharField(max_length=255, null=True, blank=True)
    source_date = models.CharField(max_length=255, null=True, blank=True)

    source_website = models.CharField(max_length=255, null=True, blank=True)

    updated_fields = models.CharField(max_length=255, null=True, blank=True)

    # calculated fields
    is_earliest_entry = models.BooleanField(null=True)
    is_latest_entry = models.BooleanField(null=True)

    class Meta:
        ordering = ("id", )

    def get_standardized_start_date_as_date(self):
        if not self.standardized_start_date:
            return None

        try:
            return get_quarterly_date_str_as_date(self.standardized_start_date)
        except ValueError:
            return None

    def get_standardized_completion_date_as_date(self):
        if not self.standardized_completion_date:
            return None

        try:
            return get_quarterly_date_str_as_date(self.standardized_completion_date)
        except ValueError:
            return None

    def get_standardized_start_date_as_quarter(self):
        if not self.standardized_start_date:
            return None

        try:
            # try converting to date to see if the format is valid
            get_quarterly_date_str_as_date(self.standardized_start_date)
            return self.standardized_start_date
        except ValueError:
            return None

    def get_standardized_completion_date_as_quarter(self):
        if not self.standardized_completion_date:
            return None

        try:
            # try converting to date to see if the format is valid
            get_quarterly_date_str_as_date(self.standardized_completion_date)
            return self.standardized_completion_date
        except ValueError:
            return None


class ServiceBCLocation(Location):
    NAME_FIELD = 'External Site'
    LATITUDE_FIELD = 'Latitude'
    LONGITUDE_FIELD = 'Longitude'
    PHONE_FIELD = 'Site_Phone_No'
    WEBSITE_FIELD = 'Website_URL'

    class Meta:
        ordering = ("id", )

    '''
    {
        '_id': 1,
        'External Site': 'Service BC - 100 Mile House',
        'Address': '300 South Hwy 97',
        'Locality': '100 Mile House',
        'Site_Phone_No': '250 395-7832',
        'Site_Fax_no': '250 395-7837',
        'Website_URL': 'http://gov.bc.ca/servicebc/100milehouse',
        'Site_Email': '',
        'Latitude': 51.644455,
        'Longitude': -121.297478,
        'Office Code': 61,
        'Item Type': 'Item',
        'Path': 'sites/SBC/SD/HD/ROSites/Lists/GA Site Locations',
        'Site': ''
    }
    '''


class School(Location):
    NAME_FIELD = 'SCHOOL_NAME'
    LATITUDE_FIELD = 'SCHOOL_LATITUDE'
    LONGITUDE_FIELD = 'SCHOOL_LONGITUDE'

    district_number = models.CharField(null=True, blank=True, max_length=255)
    public_or_independent = models.CharField(null=True, blank=True, max_length=255)
    school_education_level = models.CharField(null=True, blank=True, max_length=255)

    school_district = models.ForeignKey('SchoolDistrict', null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ("id", )

    '''
    {
        '_id': 1,
        'SCHOOL_YEAR': '2018/2019',
        'SCHOOL_NUMBER': 8297024,
        'SCHOOL_NAME': "Na Aksa Gyilak'yoo",
        *'DISTRICT_NUMBER': 82,
        'DISTRICT_NAME': 'Coast Mountains',
        *'PUBLIC_OR_INDEPENDENT': 'Independent School',
        'STREET_ADDRESS': '3529 WEST KALUM RD',
        'PHYSICAL_ADDRESS_CITY': 'TERRACE',
        'FACILITY_TYPE': 'Standard School ',
        *'SCHOOL_EDUCATION_LEVEL': 'ELEMENTARY SECONDARY',
        'HAS_CORE_FRENCH': 'NO',
        'HAS_EARLY_FRENCH_IMMERSION': 'NO',
        'HAS_LATE_FRENCH_IMMERSION': 'NO',
        'HAS_PROG_FRANCOPHONE': 'NO',
        'SCHOOL_LATITUDE': 54.52410823,
        'SCHOOL_LONGITUDE': -128.6683472
    }
    '''


class PostSecondaryInstitution(Location):

    NAME_FIELD = 'Institution,Location'
    LATITUDE_FIELD = 'Latitude'
    LONGITUDE_FIELD = 'Longitude'

    institution_type = models.CharField(null=True, blank=True, max_length=255)
    economic_development_region = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )

    '''
    {
        '_id': 137,
        'Institution': 'Regent College - Vancouver',
        'Location': 'Regent College Vancouver Campus',
        *'Institution Type': 'Theological',
        *'Economic Development Region': 'Mainland/Southwest',
        'City': 'Vancouver',
        'Address': '5800 University Boulevard',
        'Location Description': 'Main Campus',
        'Latitude': 49.265748,
        'Longitude': -123.244077
    }
    '''


class Clinic(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'RG_NAME'
    PHONE_FIELD = 'PHONE_NUMBER'
    WEBSITE_FIELD = 'WEBSITE'
    ALT_WEBSITE_FIELD = '811_LINK'
    EMAIL_FIELD = 'EMAIL_ADDRESS'

    sv_description = models.CharField(null=True, blank=True, max_length=255)
    hours = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ("id", )

    '''
    {
        '_id': 1,
        'SV_TAXONOMY': 'LN-9300',
        'TAXONOMY_NAME': 'Walk In Medical Clinics',
        'RG_REFERENCE': 17636590,
        'RG_NAME': 'Sunwood Medical Clinic',
        'SV_REFERENCE': 17636591,
        'SV_NAME': 'Walk-in Clinic',
        *'SV_DESCRIPTION': 'Provides non-emergency health care services on a walk-in basis. Open Saturdays and some evenings.',
        'SL_REFERENCE': 17636593,
        'LC_REFERENCE': 17636592,
        'PHONE_NUMBER': 6044640345,
        'WEBSITE': '',
        'EMAIL_ADDRESS': '',
        'WHEELCHAIR_ACCESSIBLE': 'Y',
        'LANGUAGE': '',
        *'HOURS': 'Mon 09:00 - 20:00; Tue 09:00 - 15:00; Wed 09:00 - 15:00; Fri 09:00 - 14:00; Sat 08:00 - 12:00; Note that hours are subject to physician availability and patient volume. Clinic may stop accepting patients before the listed closing time. Closed on statutory holidays and for lunch 12:00 - 14:00 on Mondays.',
        'STREET_NUMBER': '3000 Lougheed Highway',
        'STREET_NAME': '',
        'STREET_TYPE': '',
        'STREET_DIRECTION': '',
        'CITY': 'Coquitlam',
        'PROVINCE': 'BC',
        'POSTAL_CODE': 'V3B 1C5',
        'LATITUDE': 49.274338,
        'LONGITUDE': -122.793127,
        '811_LINK': 'http://www.healthlinkbc.ca/find/resource.asp?First=1&org=53965&agencynum=17636591&SiteResourceAgencyNum=17636592'
    }
    '''


class FirstResponder(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'FACILITY_NAME'
    PHONE_FIELD = 'CONTACT_PHONE'
    WEBSITE_FIELD = 'WEBSITE_URL'
    EMAIL_FIELD = 'CONTACT_EMAIL'

    keywords = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )

    def category(self):
        return self.keywords.split(';')[0].strip()

    def subcategory(self):
        return self.keywords.split(';')[-1].strip()

    '''
    OrderedDict([
        ('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '),
        ('BUS_CAT_CL', 'provincialProtectiveServices'),
        ('BUS_CAT_DS', 'Provincial protective services'),
        ('OCCPNT_TYP', 'BC First Responders'),
        ('SRCDATA_ID', '1965'),
        ('SRC_ID_IND', 'N'),
        ('FCLTY_NM', 'Prince George Community Policing'),
        ('DESCRIPTION', ''),
        ('ADDRESS', '1156 4th Ave, Prince George, BC'),
        ('MAIL_ADD', '1156 4th Ave, Prince George, BC'),
        ('ST_ADDRESS', '1156 4th Ave'),
        ('POSTAL_CD', ''),
        ('LOCALITY', 'Prince George'),
        ('CONT_PHONE', ''),
        ('CONT_EMAIL', ''),
        ('CONT_FAX', ''),
        ('WEBSITE', ''),
        ('IMAGE_URL', ''),
        ('LATITUDE', '53.9157474'),
        ('LONGITUDE', '-122.7442107'),
        *('KEYWORDS', 'police; community policing station'),
        ('DT_UPDATE', '20200131230118'),
        ('GEOCD_IND', ''),
        ('RESP_TYPE', 'COMMUNITYSTN'),
        ('RESP_GRP', 'POLICE'),
        ('SHAPE', ''),
        ('SEQ_ID', '2998'),
        ('X', '1213279.4932'),
        ('Y', '995112.8456000024')])
    '''


class DiagnosticFacility(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'OWNERSHIP_NAME'

    ser_cd_dsc = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )

    '''
    OrderedDict([
        ('DIA_FAC_ID', '909'),
        ('FCTY_NAME', 'NORTHERN HAIDA GWAII HOSPITAL AND HEALTH CENTRE'),
        ('OWNER_CODE', 'Public'),
        ('OWNER_NAME', 'NORTHERN HEALTH AUTHORITY'),
        ('ADDRESS', '2520 HARRISON AVE'),
        ('CITY', 'MASSET'),
        *('SER_CD_DSC', 'Diagnostic Ultrasound'),
        ('FAC_EST_DT', ''),
        ('LATITUDE', '54.020105'),
        ('LONGITUDE', '-132.157854'),
        ('GEOMETRY', ''),
        ('OBJECTID', '25743'),
        ('X', '597991.0027000001'),
        ('Y', '1019349.9949000068')])
    '''


class TimberFacility(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'COMPANY_NAME'

    bus_cat_ds = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )

    '''
    OrderedDict([
        ('COMPANY_NM','Bear Lumber Ltd.'),
        ('STRTADDRSS', 'P.O. Box 211'),
        ('LOCALITY', 'Cranbrook'),
        ('POSTAL_CD', 'V1C 4H7'),
        ('LATITUDE', '49.450483'),
        ('LONGITUDE', '-115.87103'),
        ('MILL_ID', '643'),
        ('OPRTN_SZE', 'Conventional'),
        ('OPRTN_RNK', 'Primary'),
        ('STATUS', 'DNR'),
        ('PRODUCT_CD', 'LBR'),
        ('MLN_BD_FT', '3.84'),
        ('THSND_BDU', ''),
        ('THSND_TNNE', ''),
        ('MLN_SQ_FT', ''),
        ('THSND_SQ', ''),
        ('MLN_CB_FT', ''),
        ('THSND_PC6', ''),
        ('THSND_PC40', ''),
        ('THSND_PC42', ''),
        ('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '),
        ('BUS_CAT_CL', 'manufacturing'),
        *('BUS_CAT_DS', 'Manufacturing'),
        ('OCCPNT_TYP', 'Timber Processing Facilites'),
        ('UPDATED', '20200318151711'),
        ('SHAPE', ''),
        ('OBJECTID', '719'),
        ('X', '1732441.1482000006'),
        ('Y', '545173.8356000008')])
    '''


class CivicFacility(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'FACILITY_NAME'
    WEBSITE_FIELD = 'WEBSITE_URL'

    keywords = models.CharField(null=True, blank=True, max_length=255)
    bus_cat_cl = models.CharField(null=True, blank=True, max_length=255)
    bus_cat_ds = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )

    def category(self):
        return self.keywords.split(';')[0].strip()

    def subcategory(self):
        return self.keywords.split(';')[-1].strip()

    '''
    OrderedDict([
        ('FCLTY_NM', 'Alberni Valley Multiplex'),
        *('KEYWORDS', 'recreation; rec centre'),
        ('ST_ADDRESS', '3737 Roger St'),
        ('LOCALITY', 'Port Alberni'),
        ('MAIL_ADD', '3737 Roger St, Port Alberni, BC'),
        ('WEBSITE', ''), ('IMAGE_URL', ''),
        ('LATITUDE', '49.2557929'),
        ('LONGITUDE', '-124.7906785'),
        ('CIV_FAC_TY', 'RECCENTRE'),
        ('ADDRESS', '3737 Roger St, Port Alberni, BC'),
        ('DT_UPDATE', '20200131225059'),
        ('GEOCD_IND', ''),
        ('SRCDATA_ID', '992'),
        ('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '),
        *('BUS_CAT_CL', 'artsEntertainmentAndRecreation'),
        *('BUS_CAT_DS', 'Arts, entertainment and recreation'),
        ('OCCPNT_TYP', 'Civic Facilities'),
        ('SHAPE', ''),
        ('SEQ_ID', '1918'),
        ('X', '-124.79067845384972'),
        ('Y', '49.25579290744079')])
    '''



class ResearchCentre(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'RESEARCH_CENTRE_NAME'
    WEBSITE_FIELD = 'RESEARCH_CENTRE_WEBSITE_URL'

    research_specialties = models.CharField(null=True, blank=True, max_length=255)
    research_centre_affiliation = models.CharField(null=True, blank=True, max_length=255)
    institution = models.CharField(null=True, blank=True, max_length=255)
    inst_acrnm = models.CharField(null=True, blank=True, max_length=255)
    research_sector = models.CharField(null=True, blank=True, max_length=255)
    cntr_type = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )

    '''
    {'_id': 1, 'RESEARCH_CENTRE_ID': 1, 'CENSUS_YEAR': 2011, 'CENSUS_SUBDIVISION_ID': 5915020, 'RESEARCH_CENTRE_NAME': 'The Centre for Advanced Wood Processing', 'RESEARCH_SPECIALTIES': 'Wood Products Processing, Advanced Wood Products Manufacturing', 'RESEARCH_CENTRE_AFFILIATION': 'University', 'INSTITUTION': 'University of British Columbia', 'INST_ACRNM': 'UBC', 'RESEARCH_CENTRE_ADDRESS': '2424 Main Mall', 'RESEARCH_CENTRE_MUNICIPALITY': 'Vancouver', 'RESEARCH_SECTOR': 'Forestry', 'RESEARCH_CENTRE_WEBSITE_URL': 'http://cawp.ubc.ca/', 'DATA_UPDATED_YEAR': 2014, 'POSTAL_CODE': '', 'SOURCE': '', 'NOTES': '', 'CNTR_TYPE': '', 'LONGITUDE': -123.2499699, 'LATITUDE': 49.260633}
    '''


class Airport(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'AIRPORT_NAME'
    WEBSITE_FIELD = 'WEBSITE_URL'
    PHONE_FIELD = 'CONTACT_PHONE'

    description = models.CharField(null=True, blank=True, max_length=255)
    keywords = models.CharField(null=True, blank=True, max_length=255)
    aerodrome_status = models.CharField(null=True, blank=True, max_length=255)
    aircraft_access_ind = models.CharField(null=True, blank=True, max_length=255)
    data_source = models.CharField(null=True, blank=True, max_length=255)
    data_source_year = models.CharField(null=True, blank=True, max_length=255)
    elevation = models.CharField(null=True, blank=True, max_length=255)
    fuel_availability_ind = models.CharField(null=True, blank=True, max_length=255)
    helicopter_access_ind = models.CharField(null=True, blank=True, max_length=255)
    iata_code = models.CharField(null=True, blank=True, max_length=255)
    max_runway_length = models.CharField(null=True, blank=True, max_length=255)
    number_of_runways = models.CharField(null=True, blank=True, max_length=255)
    runway_surface = models.CharField(null=True, blank=True, max_length=255)
    oil_availability_ind = models.CharField(null=True, blank=True, max_length=255)
    seaplane_access_ind = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )

    '''
    OrderedDict([('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '), ('BUS_CAT_CL', 'airTransportation'), ('BUS_CAT_DS', 'Air Transportation'), ('OCCPNT_TYP', 'BC Airports'), ('SRCDATA_ID', '455'), ('SRC_ID_IND', 'N'), ('NAME', 'Terrace (Northwest Regional) Airport'), ('DESCRIPTION', 'airport'), ('ADDRESS', '4401 Bristol Rd, Terrace, BC'), ('ALIAS_ADDR', '4401 Bristol Rd, Terrace, BC'), ('ST_ADDRESS', '4401 Bristol Rd'), ('POSTAL_CD', ''), ('LOCALITY', 'Terrace'), ('CONT_PHONE', '250-635-2659'), ('CONT_EMAIL', ''), ('CONT_FAX', ''), ('WEBSITE', ''), ('IMAGE_URL', ''), ('LATITUDE', '54.4686111'), ('LONGITUDE', '-128.5783333'), ('KEYWORDS', 'aerodrome; airport; airstrip; runway'), ('DT_UPDATE', '20200205073805'), ('GEOCD_IND', ''), ('AER_STATUS', 'Certified'), ('AIRCR_ACS', 'Y'), ('DATA_SRCE', 'Canadian Flight Supplement'), ('DATASRC_YR', '2014'), ('ELEVATION', '217.32'), ('FUEL_AVAIL', 'Y'), ('HELI_ACS', 'N'), ('IATA', ''), ('ICAO', 'CYXT'), ('MX_RWAY_LN', '2285.39'), ('NUM_RWAY', '2'), ('OIL_AVAIL', 'Y'), ('RWAY_SURF', 'asphalt'), ('SEAPLN_ACC', 'N'), ('TC_LID', ''), ('SHAPE', ''), ('SEQ_ID', '578'), ('X', '833323.8826999993'), ('Y', '1054949.9463999951')])
    '''


class PortAndTerminal(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'FACILITY_NAME'
    WEBSITE_FIELD = 'WEBSITE_URL'
    PHONE_FIELD = 'CONTACT_PHONE'

    description = models.CharField(null=True, blank=True, max_length=255)
    keywords = models.CharField(null=True, blank=True, max_length=255)
    custodian_org_description = models.CharField(null=True, blank=True, max_length=255)
    occupant_type_description = models.CharField(null=True, blank=True, max_length=255)
    data_source = models.CharField(null=True, blank=True, max_length=255)
    authority = models.CharField(null=True, blank=True, max_length=255)
    commodities_handled = models.CharField(null=True, blank=True, max_length=255)
    physical_address = models.CharField(null=True, blank=True, max_length=255)
    other_address = models.CharField(null=True, blank=True, max_length=255)
    street_address = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )


class LaboratoryService(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'SERVICE_NAME'
    WEBSITE_FIELD = 'WEBSITE_URL'
    PHONE_FIELD = 'CONTACT_PHONE'
    EMAIL_FIELD = 'CONTACT_EMAIL'

    description = models.CharField(null=True, blank=True, max_length=255)
    type = models.CharField(null=True, blank=True, max_length=255)
    sub_type = models.CharField(null=True, blank=True, max_length=255)
    street_address = models.CharField(null=True, blank=True, max_length=255)
    keywords = models.CharField(null=True, blank=True, max_length=255)
    organization_name = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )


class LocalGovernmentOffice(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'FACILITY_NAME'
    WEBSITE_FIELD = 'WEBSITE_URL'

    street_address = models.CharField(null=True, blank=True, max_length=255)
    keywords = models.CharField(null=True, blank=True, max_length=255)
    custodian_org_description = models.CharField(null=True, blank=True, max_length=255)
    occupant_type_description = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )


class EmergencySocialServiceFacility(Location):
    LATITUDE_FIELD = None
    LONGITUDE_FIELD = None
    NAME_FIELD = 'FACILITY_NAME'

    address = models.CharField(null=True, blank=True, max_length=255)
    facility_type_code = models.CharField(null=True, blank=True, max_length=255)
    status = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )


class CustomsPortOfEntry(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'CUSTOMS_PORT_NAME'

    customs_port_street_address = models.CharField(null=True, blank=True, max_length=255)
    customs_port_type = models.CharField(null=True, blank=True, max_length=255)
    customs_port_municipality = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )


class Pharmacy(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'SERVICE_NAME'
    WEBSITE_FIELD = 'WEBSITE_URL'
    PHONE_FIELD = 'CONTACT_PHONE'
    EMAIL_FIELD = 'CONTACT_EMAIL'

    wheelchair_accessible_ind = models.CharField(null=True, blank=True, max_length=4)
    description = models.CharField(null=True, blank=True, max_length=255)
    postal_code = models.CharField(null=True, blank=True, max_length=255)
    street_address = models.CharField(null=True, blank=True, max_length=255)
    keywords = models.CharField(null=True, blank=True, max_length=255)
    organization_name = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )


class PublicLibrary(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'SERVICE_POINT_NAME'
    WEBSITE_FIELD = 'WEBSITE_URL'

    service_point_id = models.CharField(null=True, blank=True, max_length=255)
    library_system_name = models.CharField(null=True, blank=True, max_length=255)
    locality = models.CharField(null=True, blank=True, max_length=255)
    wifi_ind = models.CharField(null=True, blank=True, max_length=4)
    outreach_ind = models.CharField(null=True, blank=True, max_length=4)
    accessibility_ind = models.CharField(null=True, blank=True, max_length=4)
    custodian_org_description = models.CharField(null=True, blank=True, max_length=255)
    postal_code = models.CharField(null=True, blank=True, max_length=255)
    street_address = models.CharField(null=True, blank=True, max_length=255)

    class Meta:
        ordering = ("id", )



