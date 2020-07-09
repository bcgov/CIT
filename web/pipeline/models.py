from django.contrib.gis.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.gis.geos import Point


class CensusSubdivision(models.Model):
    # CSUID is used as primary key, just 'id' in Django.
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)


class Community(models.Model):
    #place_id = models.CharField(null=True, blank=True, max_length=255)
    place_name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    # TODO SY - make this into a choice field tuple
    community_type = models.CharField(null=True, blank=True, max_length=255)
    census_subdivision = models.ForeignKey(CensusSubdivision, on_delete=models.CASCADE)
    hexuid = models.CharField(
        max_length=15,
        help_text="ID of spatial hex used to color province by connectivity quality.")

    def __str__(self):
        return self.place_name

    class Meta:
        verbose_name_plural = "Communities"

    def latitude(self):
        return self.point[1]

    def longitude(self):
        return self.point[0]


class Location(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    location_type = models.CharField(null=True, blank=True, max_length=255)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    # We don't need the following at this time, since we're focused on community access.
    # census_subdivision = models.ForeignKey(CensusSubdivision, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def latitude(self):
        return self.point[1]

    def longitude(self):
        return self.point[0]

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
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'PROJECT_NAME'
    '''
    {'_id': 1, 'PROJECT_NAME': 'Ajax Copper Mine', 'PROJECT_DESCRIPTION': 'Copper and gold open pit mine', 'LATITUDE': 50.61233, 'LONGITUDE': -120.412388, 'FLNRO_AREA_NAME': 'South', 'FLNRO_REGION_NAME': 'Thompson / Okanagan', 'PROJECT_LOCATION': 'Kamloops', 'FLNRO_PROJECT_STATUS': 'Permitting: Pre-Application', 'PROJECT_TYPE': 'Major Mines', 'PROJECT_CATEGORY': 'Copper, gold', 'PROPONENT': 'KGHM Ajax Mining Inc.', 'EAO_PROJECT_STATUS': 'EAO Process Suspended', 'PROJECT_COMMENTS': '87027 (FCBC ATS); 10399-20 87027AJAX', 'NRS_MAJOR_PROJECT_ID': 1, 'ORGANIZATION_ WEBSITE': 'http://www2.gov.bc.ca/gov/content/industry/mineral-exploration-mining/permitting/major-mine-permitting-office'}
    '''


class NaturalResourceProject(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'PROJECT_NAME'
    '''
    {'_id': 1, 'PROJECT_ID': 4023, 'PROJECT_NAME': 'RW Bruhn Bridge Replacement', 'PROJECT_DESCRIPTION': 'Proposed construction of a 5-lane bridge to replace existing bridge. Project will include intersection improvements and a multi-use path. Federal government providing $91.082 million funding.', 'ESTIMATED_COST': 225, 'UPDATE_ACTIVITY': 'New proposed project', 'ENVIRONMENTAL_ASSESSMENT_STAGE': '', 'CONSTRUCTION_TYPE': 'Infrastructure', 'CONSTRUCTION_SUBTYPE': 'Roads & Highways', 'PROJECT_TYPE': 'Transportation', 'REGION': '3. Thompson-Okanagan', 'MUNICIPALITY': 'Sicamous', 'DEVELOPER': 'BC Ministry of Transportation and Infrastructure', 'ARCHITECT': '', 'PROJECT_STATUS': 'Proposed', 'PROJECT_STAGE': 'Preliminary/Feasibility', 'PROJECT_CATEGORY_NAME': 'Transportation & Warehousing', 'PUBLIC_FUNDING_IND': 'TRUE', 'PROVINVIAL_FUNDING': 'TRUE', 'FEDERAL_FUNDING': 'TRUE', 'MUNICIPAL_FUNDING': 'FALSE', 'OTHER_PUBLIC_FUNDING': 'FALSE', 'GREEN_BUILDING_IND': 'FALSE', 'GREEN_BUILDING_DESC': '', 'CLEAN_ENERGY_IND': 'FALSE', 'INDIGENOUS_IND': 'FALSE', 'INDIGENOUS_NAMES': '', 'INDIGENOUS_AGREEMENT': '', 'CONSTRUCTION_JOBS': None, 'OPERATING_JOBS': None, 'STANDARDIZED_START_DATE': '2020-Q4', 'STANDARDIZED_COMPLETION_DATE': '2023-Q4', 'LATITUDE': None, 'LONGITUDE': None, 'LATITUDE_DMS': '', 'LONGITUDE_DMS': '', 'TELEPHONE': '(250) 356-1861', 'PROJECT_WEBSITE': '', 'FIRST_ENTRY_DATE': '2018-12-01T00:00:00', 'LAST_UPDATE': '2018-12-01T00:00:00', 'UPDATED_FIELDS': 'Update all available, project added this quarter'}
    '''


class ServiceBCLocation(Location):
    NAME_FIELD = 'External Site'
    LATITUDE_FIELD = 'Latitude'
    LONGITUDE_FIELD = 'Longitude'
    '''
    {'_id': 1, 'External Site': 'Service BC - 100 Mile House', 'Address': '300 South Hwy 97', 'Locality': '100 Mile House', 'Site_Phone_No': '250 395-7832', 'Site_Fax_no': '250 395-7837', 'Website_URL': 'http://gov.bc.ca/servicebc/100milehouse', 'Site_Email': '', 'Latitude': 51.644455, 'Longitude': -121.297478, 'Office Code': 61, 'Item Type': 'Item', 'Path': 'sites/SBC/SD/HD/ROSites/Lists/GA Site Locations', 'Site': ''}
    '''


class School(Location):
    NAME_FIELD = 'SCHOOL_NAME'
    LATITUDE_FIELD = 'SCHOOL_LATITUDE'
    LONGITUDE_FIELD = 'SCHOOL_LONGITUDE'
    '''
    {'_id': 1, 'SCHOOL_YEAR': '2018/2019', 'SCHOOL_NUMBER': 8297024, 'SCHOOL_NAME': "Na Aksa Gyilak'yoo", 'DISTRICT_NUMBER': 82, 'DISTRICT_NAME': 'Coast Mountains', 'PUBLIC_OR_INDEPENDENT': 'Independent School', 'STREET_ADDRESS': '3529 WEST KALUM RD', 'PHYSICAL_ADDRESS_CITY': 'TERRACE', 'FACILITY_TYPE': 'Standard School ', 'SCHOOL_EDUCATION_LEVEL': 'ELEMENTARY SECONDARY', 'HAS_CORE_FRENCH': 'NO', 'HAS_EARLY_FRENCH_IMMERSION': 'NO', 'HAS_LATE_FRENCH_IMMERSION': 'NO', 'HAS_PROG_FRANCOPHONE': 'NO', 'SCHOOL_LATITUDE': 54.52410823, 'SCHOOL_LONGITUDE': -128.6683472}
    '''


class Clinic(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'RG_NAME'
    '''
    {'_id': 1, 'SV_TAXONOMY': 'LN-9300', 'TAXONOMY_NAME': 'Walk In Medical Clinics', 'RG_REFERENCE': 17636590, 'RG_NAME': 'Sunwood Medical Clinic', 'SV_REFERENCE': 17636591, 'SV_NAME': 'Walk-in Clinic', 'SV_DESCRIPTION': 'Provides non-emergency health care services on a walk-in basis. Open Saturdays and some evenings.', 'SL_REFERENCE': 17636593, 'LC_REFERENCE': 17636592, 'PHONE_NUMBER': 6044640345, 'WEBSITE': '', 'EMAIL_ADDRESS': '', 'WHEELCHAIR_ACCESSIBLE': 'Y', 'LANGUAGE': '', 'HOURS': 'Mon 09:00 - 20:00; Tue 09:00 - 15:00; Wed 09:00 - 15:00; Fri 09:00 - 14:00; Sat 08:00 - 12:00; Note that hours are subject to physician availability and patient volume. Clinic may stop accepting patients before the listed closing time. Closed on statutory holidays and for lunch 12:00 - 14:00 on Mondays.', 'STREET_NUMBER': '3000 Lougheed Highway', 'STREET_NAME': '', 'STREET_TYPE': '', 'STREET_DIRECTION': '', 'CITY': 'Coquitlam', 'PROVINCE': 'BC', 'POSTAL_CODE': 'V3B 1C5', 'LATITUDE': 49.274338, 'LONGITUDE': -122.793127, '811_LINK': 'http://www.healthlinkbc.ca/find/resource.asp?First=1&org=53965&agencynum=17636591&SiteResourceAgencyNum=17636592'}
    '''


class FirstResponder(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'FCLTY_NM'
    '''
    OrderedDict([('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '), ('BUS_CAT_CL', 'provincialProtectiveServices'), ('BUS_CAT_DS', 'Provincial protective services'), ('OCCPNT_TYP', 'BC First Responders'), ('SRCDATA_ID', '1965'), ('SRC_ID_IND', 'N'), ('FCLTY_NM', 'Prince George Community Policing'), ('DESCRIPTN', ''), ('ADDRESS', '1156 4th Ave, Prince George, BC'), ('MAIL_ADD', '1156 4th Ave, Prince George, BC'), ('ST_ADDRESS', '1156 4th Ave'), ('POSTAL_CD', ''), ('LOCALITY', 'Prince George'), ('CONT_PHONE', ''), ('CONT_EMAIL', ''), ('CONT_FAX', ''), ('WEBSITE', ''), ('IMAGE_URL', ''), ('LATITUDE', '53.9157474'), ('LONGITUDE', '-122.7442107'), ('KEYWORDS', 'police; community policing station'), ('DT_UPDATE', '20200131230118'), ('GEOCD_IND', ''), ('RESP_TYPE', 'COMMUNITYSTN'), ('RESP_GRP', 'POLICE'), ('SHAPE', ''), ('SEQ_ID', '2998'), ('X', '1213279.4932'), ('Y', '995112.8456000024')])
    '''


class DiagnosticFacility(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'FCTY_NAME'
    '''
    OrderedDict([('DIA_FAC_ID', '909'), ('FCTY_NAME', 'NORTHERN HAIDA GWAII HOSPITAL AND HEALTH CENTRE'), ('OWNER_CODE', 'Public'), ('OWNER_NAME', 'NORTHERN HEALTH AUTHORITY'), ('ADDRESS', '2520 HARRISON AVE'), ('CITY', 'MASSET'), ('SER_CD_DSC', 'Diagnostic Ultrasound'), ('FAC_EST_DT', ''), ('LATITUDE', '54.020105'), ('LONGITUDE', '-132.157854'), ('GEOMETRY', ''), ('OBJECTID', '25743'), ('X', '597991.0027000001'), ('Y', '1019349.9949000068')])
    '''


class TimberFacility(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'COMPANY_NM'
    '''
    OrderedDict([('COMPANY_NM', 'Bear Lumber Ltd.'), ('STRTADDRSS', 'P.O. Box 211'), ('LOCALITY', 'Cranbrook'), ('POSTAL_CD', 'V1C 4H7'), ('LATITUDE', '49.450483'), ('LONGITUDE', '-115.87103'), ('MILL_ID', '643'), ('OPRTN_SZE', 'Conventional'), ('OPRTN_RNK', 'Primary'), ('STATUS', 'DNR'), ('PRODUCT_CD', 'LBR'), ('MLN_BD_FT', '3.84'), ('THSND_BDU', ''), ('THSND_TNNE', ''), ('MLN_SQ_FT', ''), ('THSND_SQ', ''), ('MLN_CB_FT', ''), ('THSND_PC6', ''), ('THSND_PC40', ''), ('THSND_PC42', ''), ('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '), ('BUS_CAT_CL', 'manufacturing'), ('BUS_CAT_DS', 'Manufacturing'), ('OCCPNT_TYP', 'Timber Processing Facilites'), ('UPDATED', '20200318151711'), ('SHAPE', ''), ('OBJECTID', '719'), ('X', '1732441.1482000006'), ('Y', '545173.8356000008')])
    '''


class CivicFacility(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'FCLTY_NM'
    '''
    OrderedDict([('FCLTY_NM', 'Alberni Valley Multiplex'), ('KEYWORDS', 'recreation; rec centre'), ('ST_ADDRESS', '3737 Roger St'), ('LOCALITY', 'Port Alberni'), ('MAIL_ADD', '3737 Roger St, Port Alberni, BC'), ('WEBSITE', ''), ('IMAGE_URL', ''), ('LATITUDE', '49.2557929'), ('LONGITUDE', '-124.7906785'), ('CIV_FAC_TY', 'RECCENTRE'), ('ADDRESS', '3737 Roger St, Port Alberni, BC'), ('DT_UPDATE', '20200131225059'), ('GEOCD_IND', ''), ('SRCDATA_ID', '992'), ('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '), ('BUS_CAT_CL', 'artsEntertainmentAndRecreation'), ('BUS_CAT_DS', 'Arts, entertainment and recreation'), ('OCCPNT_TYP', 'Civic Facilities'), ('SHAPE', ''), ('SEQ_ID', '1918'), ('X', '-124.79067845384972'), ('Y', '49.25579290744079')])
    '''
