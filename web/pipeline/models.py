from django.contrib.gis.db import models
from django.contrib.gis.db.models import PointField
from django.contrib.gis.geos import Point

from pipeline.utils import (
    serialize_census_subdivision_groups, serialize_community_detail_fields, get_community_type_display_name,
    get_quarterly_date_str_as_date)


# class Cacheable(models.Model):

#     @staticmethod
#     def get_cached(kls, **kwargs):
#         key = json.dumps(kwargs)
#         kls.objects.get(**kwargs)


class Area(models.Model):
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)
    location_type = models.CharField(null=True, blank=True, max_length=255)


class Hex(models.Model):
    # "PHH_ID","Avail_5_1_Dispo","Avail_10_2_Dispo","Avail_25_5_Dispo","Avail_50_10_Dispo","Avail_LTE_Mobile_Dispo"
    id = models.CharField(primary_key=True, max_length=12)
    geom = models.PolygonField()
    avail_5_1 = models.BooleanField(default=False)
    avail_10_2 = models.BooleanField(default=False)
    avail_25_5 = models.BooleanField(default=False)
    avail_50_10 = models.BooleanField(default=False)


class ISP(models.Model):
    name = models.CharField(max_length=127, unique=True)


class Service(models.Model):
    isp = models.ForeignKey(ISP, on_delete=models.CASCADE)
    hex = models.ForeignKey(Hex, on_delete=models.DO_NOTHING)
    technology = models.CharField(max_length=63)

    class Meta:
        unique_together = ('isp', 'hex', 'technology')


class Road(models.Model):
    geom = models.MultiLineStringField(srid=4326, null=True)
    best_broadband = models.CharField(max_length=5)


class Municipality(Area):
    ID_FIELD = 'AA_ID'
    NAME_FIELD = 'ABRVN'
    oc_m_yr = models.CharField(
        max_length=4,
        help_text="The four-digit year that the most recent Order-In-Council or Ministerial Order was approved, "
        " e.g., 2014.",
    )

    """
    AA_ID 3
    * AA_NAME The Corporation of the Village of Burns Lake
    * ABRVN Burns Lake
    BDY_TYPE Legal
    AA_PARENT Regional District of Bulkley-Nechako
    CHNG_ORG MCSCD
    UPT_TYPE E
    UPT_DATE 20130429
    MAP_STATUS Not Appended
    OC_M_NMBR 1576
    * OC_M_YR 1994
    OC_M_TYPE OIC
    * WBST_RL
    IMAGE_URL
    AFCTD_AREA
    AREA_SQM 8986418.5648
    LENGTH_M 58666.4092
    * SHAPE 0
    OBEJCTID 1442
    """


class WildfireZone(Area):
    NAME_FIELD = 'FIRE_ZONE'
    risk_class = models.CharField(
        max_length=1,
        help_text="A class value signifying the communities WUI Risk Class rating between 1 (low) and 5 " "(extreme).",
    )  # 1-5


class TsunamiZone(Area):
    NAME_FIELD = 'TNZ_ID'
    zone_class = models.CharField(
        max_length=1,
        help_text="See https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery/"
        "preparedbc/know-your-hazards/tsunamis - A-C:moderate D,E:low",
    )
    # "Tsunamis are rare but serious events. Many areas of coastal B.C. may be threatened in the event
    # of a tsunami. However, it is generally accepted by scientific and technical experts that Victoria,
    # eastern Vancouver Island, Vancouver and the lower mainland are low-risk areas."
    # --
    # Intretation for labelling purpose:
    # A-C moderate
    # D,E, low
    # otherwise, none.


class CensusSubdivision(models.Model):
    # CSUID is used as primary key, just 'id' in Django.
    name = models.CharField(max_length=127)
    geom = models.MultiPolygonField(srid=4326, null=True)
    geom_simplified = models.MultiPolygonField(srid=4326, null=True)

    # "1.1.2", "Population, 2016"
    population = models.IntegerField(null=True)
    # "1.1.3", "Population percentage change, 2011 to 2016"
    population_percentage_change = models.FloatField(null=True)
    # "1.1.4", "Total private dwellings"
    priv_dwel = models.IntegerField(null=True)
    # "1.1.7",0,"Land area in square kilometres"
    area = models.FloatField(null=True)

    # age of population

    # "1.2.2.1", "  0 to 14 years"
    pop_pct_0_14 = models.FloatField(null=True)
    # "1.2.2.2", 1, "  15 to 64 years"
    pop_pct_14_65 = models.FloatField(null=True)
    # "1.2.2.3", 1, "  65 years and over"
    pop_pct_65 = models.FloatField(null=True)

    # types of occupied dwellings
    # "2.1.1.1", 1, "  Single-detached house"
    detached_houses = models.IntegerField(null=True)
    # "2.1.1.2", 1, "  Apartment in a building that has five or more storeys"
    apartments = models.IntegerField(null=True)
    # 3003, "2.1.1.3", 1, "  Other attached dwelling", 6, null, 0.0
    other_attached_dwellings = models.IntegerField(null=True)
    # 3009, "2.1.1.4", 1, "  Movable dwelling", 7, null, 0.0
    movable_dwellings = models.IntegerField(null=True)

    # marital status
    # "2.2.1.1", 1, "  Married or living common law"
    married_or_common_law = models.IntegerField(null=True)
    # "2.3.4.2", 1, "  Couples with children"
    couples_with_children = models.IntegerField(null=True)
    # "2.3.5", 0, "Total - Lone-parent census families in private households - 100% data"
    single_parents = models.IntegerField(null=True)

    # "3.6.1.1.1", 2, "    English"
    eng_known = models.IntegerField(null=True)
    # "3.6.1.2", 1, "  Non-official languages"
    other_lang = models.IntegerField(null=True)
    # "3.6.1.2.1", 2, "    Aboriginal languages"
    aboriginal_lang = models.IntegerField(null=True)
    # "3.1.1.4", 1, "  Neither English nor French"
    eng_fr_not_known = models.IntegerField(null=True)

    # "Income", 12002, "4.1.1.1.1", 2, "    Median total income in 2015 among recipients ($)"
    median_total_income = models.FloatField(null=True)

    # "Income", 12008, "4.1.1.4.1", 2, "    Median government transfers in 2015 among recipients ($)"
    #  "Income", 12034, "4.1.5.3.1", 2, "    Under $10,000 (including loss)"
    #  "Income", 12035, "4.1.5.3.2", 2, "    $10,000 to $19,999"
    #  "Income", 12036, "4.1.5.3.3", 2, "    $20,000 to $29,999"
    #  "Income", 12037, "4.1.5.3.4", 2, "    $30,000 to $39,999"
    #  "Income", 12038, "4.1.5.3.5", 2, "    $40,000 to $49,999"
    #  "Income", 12039, "4.1.5.3.6", 2, "    $50,000 to $59,999"
    #  "Income", 12040, "4.1.5.3.7", 2, "    $60,000 to $69,999"
    #  "Income", 12041, "4.1.5.3.8", 2, "    $70,000 to $79,999"
    #  "Income", 12042, "4.1.5.3.9", 2, "    $80,000 to $89,999"
    #  "Income", 12043, "4.1.5.3.10", 2, "    $90,000 to $99,999"
    #  "Income", 12044, "4.1.5.3.11", 2, "    $100,000 and over"
    #  "Income", 12045, "4.1.5.3.11.1", 3, "      $100,000 to $149,999"
    #  "Income", 12046, "4.1.5.3.11.2", 3, "      $150,000 and over"

    # "Income", 13018, "4.2.3", 0, "Total - Household total income groups in 2015 for private households - 100% data", 36, null, 2475.0

    # "Income", 15000, "4.4.1", 0, "Total - Low-income status in 2015 for the population in private households to whom low-income concepts are applicable - 100% data", 43, null, 4860.0, null, 2300.0, null, 2560.0, null],
    # "Income", 15001, "4.4.1.1", 1, "  0 to 17 years"
    # "Income", 15002, "4.4.1.1.1", 2, "    0 to 5 years"
    # "Income", 15003, "4.4.1.2", 1, "  18 to 64 years"
    # "Income", 15004, "4.4.1.3", 1, "  65 years and over"

    # "Immigration and citizenship", 18010, "5.2.1.3", 1, "  Non-permanent residents", 52, null, 30.0, null, 15.0, null, 15.0, null],
    non_pr = models.IntegerField(null=True)

    # "Visible minority", 25001, "7.1.1.1", 1, "  Total visible minority population", 96, null, 380.0, null, 205.0, null, 175.0, null],
    visible_minority = models.IntegerField(null=True)

    # "Housing", 27001, "9.1.1.1", 1, "  Owner"
    # "Housing", 27002, "9.1.1.2", 1, "  Renter"

    # dwelling condition
    # "Housing", 27036, "9.1.9.2", 1, "  Major repairs needed"
    # "Housing", 27052, "9.1.12.2", 1, "  Spending 30% or more of income on shelter costs"

    # owner households
    # "Housing", 27055, "9.1.13.1", 1, "  % of owner households with a mortgage", 142, null, 37.6
    # "Housing", 27060, "9.1.13.6", 1, "  Average value of dwellings ($)", 144, null, 397139.0

    # "Education", 28002, "10.1.1.2", 1, "  Secondary (high) school diploma or equivalency certificate", 147, null, 1325.0, null, 595.0, null, 730.0, null],
    edu_1 = models.IntegerField(null=True)
    # "Education", 28003, "10.1.1.3", 1, "  Postsecondary certificate, diploma or degree"
    edu_2 = models.IntegerField(null=True)
    # "Education", 28004, "10.1.1.3.1", 2, "    Apprenticeship or trades certificate or diploma"
    edu_3 = models.IntegerField(null=True)
    # "Education", 28009, "10.1.1.3.4", 2, "    University certificate, diploma or degree at bachelor level or above"
    edu_4 = models.IntegerField(null=True)

    # field of study
    # "Education", 29002, "10.2.1.2", 1, "  Education"
    # "Education", 29004, "10.2.1.3", 1, "  Visual and performing arts, and communications technologies"
    # "Education", 29007, "10.2.1.4", 1, "  Humanities"
    # "Education", 29016, "10.2.1.5", 1, "  Social and behavioural sciences and law"
    # "Education", 29024, "10.2.1.6", 1, "  Business, management and public administration"
    # "Education", 29028, "10.2.1.7", 1, "  Physical and life sciences and technologies"
    # "Education", 29034, "10.2.1.8", 1, "  Mathematics, computer and information sciences"
    # "Education", 29039, "10.2.1.9", 1, "  Architecture, engineering, and related technologies"
    # "Education", 29047, "10.2.1.10", 1, "  Agriculture, natural resources and conservation"
    # "Education", 29050, "10.2.1.11", 1, "  Health and related fields"
    # "Education", 29054, "10.2.1.12", 1, "  Personal, protective and transportation services"

    # employment
    # "Labour", 31002, "11.1.1.1.1", 2, "    Employed"
    employed = models.IntegerField(null=True)
    # "Labour", 31003, "11.1.1.1.2", 2, "    Unemployed"
    unemployed = models.IntegerField(null=True)
    # "Labour", 33004, "11.3.1.2.2", 2, "    Self-employed", 171, null, 375.0, null, 210.0, null, 160.0, null],
    self_employed = models.IntegerField(null=True)

    # job types
    # "Labour", 34003, "11.4.1.2.1", 2, "    0 Management occupations"
    # "Labour", 34004, "11.4.1.2.2", 2, "    1 Business, finance and administration occupations"
    # "Labour", 34005, "11.4.1.2.3", 2, "    2 Natural and applied sciences and related occupations"
    # "Labour", 34006, "11.4.1.2.4", 2, "    3 Health occupations"
    # "Labour", 34007, "11.4.1.2.5", 2, "    4 Occupations in education, law and social, community and government services"
    # "Labour", 34008, "11.4.1.2.6", 2, "    5 Occupations in art, culture, recreation and sport"
    # "Labour", 34009, "11.4.1.2.7", 2, "    6 Sales and service occupations"
    # "Labour", 34010, "11.4.1.2.8", 2, "    7 Trades, transport and equipment operators and related occupations"
    # "Labour", 34011, "11.4.1.2.9", 2, "    8 Natural resources, agriculture and related production occupations"
    # "Labour", 34012, "11.4.1.2.10", 2, "    9 Occupations in manufacturing and utilities"

    # place of work
    # "Labour", 36001, "11.6.1.1", 1, "  Worked at home"
    # "Labour", 36003, "11.6.1.3", 1, "  No fixed workplace address"
    # "Labour", 36004, "11.6.1.4", 1, "  Worked at usual place"

    # "Journey to work", 37001, "12.1.1.1", 1, "  Commute within census subdivision (CSD) of residence"
    # "Journey to work", 37002, "12.1.1.2", 1, "  Commute to a different census subdivision (CSD) within census division (CD) of residence"

    # "Journey to work", 38001, "12.2.1.1", 1, "  Car, truck, van - as a driver"
    # "Journey to work", 38002, "12.2.1.2", 1, "  Car, truck, van - as a passenger"
    # "Journey to work", 38003, "12.2.1.3", 1, "  Public transit"
    # "Journey to work", 38004, "12.2.1.4", 1, "  Walked"
    # "Journey to work", 38005, "12.2.1.5", 1, "  Bicycle"
    # "Journey to work", 38006, "12.2.1.6", 1, "  Other method"

    # "Journey to work", 39001, "12.3.1.1", 1, "  Less than 15 minutes"
    # "Journey to work", 39002, "12.3.1.2", 1, "  15 to 29 minutes"
    # "Journey to work", 39003, "12.3.1.3", 1, "  30 to 44 minutes"
    # "Journey to work", 39004, "12.3.1.4", 1, "  45 to 59 minutes"
    # "Journey to work", 39005, "12.3.1.5", 1, "  60 minutes and over"

    # 1Y mobility

    # "Mobility", 43001, "14.1.1.1", 1, "  Non-movers"
    # "Mobility", 43002, "14.1.1.2", 1, "  Movers"

    # 5Y mobility

    # "Mobility", 44001, "14.2.1.1", 1, "  Non-movers"
    # "Mobility", 44002, "14.2.1.2", 1, "  Movers"

    def api_field_groups(self):
        return serialize_census_subdivision_groups(self)

    def get_population_percentage_change_as_decimal(self):
        return self.population_percentage_change / 100 if self.population_percentage_change else 0

    def get_pop_pct_0_14_as_decimal(self):
        return self.pop_pct_0_14 / 100 if self.pop_pct_0_14 else 0

    def get_pop_pct_14_65_as_decimal(self):
        return self.pop_pct_14_65 / 100 if self.pop_pct_14_65 else 0

    def get_pop_pct_65_as_decimal(self):
        return self.pop_pct_65 / 100 if self.pop_pct_65 else 0


class Community(models.Model):
    place_id = models.CharField(null=True, blank=True, max_length=255, unique=True)
    place_name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    # TODO SY - make this into a choice field tuple
    # Community Type,
    community_type = models.CharField(null=True, blank=True, max_length=255)
    census_subdivision = models.ForeignKey(CensusSubdivision, on_delete=models.CASCADE)

    wildfire_zone = models.ForeignKey(WildfireZone, null=True, on_delete=models.SET_NULL)
    tsunami_zone = models.ForeignKey(TsunamiZone, null=True, on_delete=models.SET_NULL)

    percent_50_10 = models.FloatField(null=True, blank=True, help_text='portion (0-1) of area with 50/10 speeds (calc. by road length)')
    percent_25_5 = models.FloatField(null=True, blank=True, help_text='portion (0-1) of area with 25/5 speeds (calc. by road length)')

    hexuid = models.ForeignKey(
        Hex,
        db_column='hexuid',
        on_delete=models.SET_NULL,
        null=True,
        related_name='community',
        help_text="ID of spatial hex used to color province by connectivity quality.",
    )

    # FN_Community_Name
    fn_community_name = models.CharField(max_length=127, default='')
    # Nation
    nation = models.CharField(max_length=127, default='')
    # Band_Number
    band_number = models.IntegerField(null=True)

    incorporated = models.NullBooleanField()

    # Municapility URL Code
    # municipality_id = models.IntegerField(null=True)
    municipality = models.ForeignKey(Municipality, null=True, on_delete=models.SET_NULL)

    # Last-Mile Status (June2020)
    last_mile_status = models.CharField(max_length=255, null=True, blank=True)

    # Transport Status (June2020)
    transport_mile_status = models.CharField(max_length=255, null=True, blank=True)

    # CBC Phase
    cbc_phase = models.CharField(max_length=255, null=True, blank=True)

    # Calculated fields (cached in the model for performance reasons)
    num_courts = models.IntegerField(null=True)
    num_schools = models.IntegerField(null=True)
    num_hospitals = models.IntegerField(null=True)
    num_timber_facilities = models.IntegerField(null=True)

    def __str__(self):
        return self.place_name

    class Meta:
        verbose_name_plural = "Communities"

    def latitude(self):
        if self.point:
            return self.point[1]
        else:
            # debugging; remove later
            print("Community {} has no location".format(self.place_name))
            return None

    def longitude(self):
        if self.point:
            return self.point[0]
        else:
            # debugging; remove later
            print("Community {} has no location".format(self.place_name))
            return None

    def get_display_fields(self):
        return serialize_community_detail_fields(self)

    def get_display_community_type(self):
        return get_community_type_display_name(self.community_type)


class Location(models.Model):
    name = models.CharField(null=True, blank=True, max_length=255)
    point = PointField(null=True, blank=True)
    location_fuzzy = models.BooleanField(
        default=False,
        help_text="This field should be set to True if the `point` field was not present in the original dataset "
        "and is inferred or approximated by other fields.",
    )

    location_type = models.CharField(null=True, blank=True, max_length=255)

    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    # We don't need the following at this time, since we're focused on community access.
    # census_subdivision = models.ForeignKey(CensusSubdivision, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def latitude(self):
        if self.point:
            return self.point[1]
        else:
            # debugging; remove later
            print("Location {} has no location".format(self.name))
            return None

    def longitude(self):
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


class Hospital(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'SV_NAME'

    rg_name = models.CharField(null=True, blank=True, max_length=255)
    sv_description = models.TextField(null=True, blank=True)
    hours = models.TextField(null=True, blank=True)

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

    hours_of_operation = models.CharField(null=True, blank=True, max_length=255)
    court_level = models.CharField(null=True, blank=True, max_length=255)

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

    flnro_project_status = models.CharField(null=True, blank=True, max_length=255)
    project_type = models.CharField(null=True, blank=True, max_length=255)
    project_category = models.CharField(null=True, blank=True, max_length=255)
    proponent = models.CharField(null=True, blank=True, max_length=255)
    eao_project_status = models.CharField(null=True, blank=True, max_length=255)
    project_comments = models.CharField(null=True, blank=True, max_length=255)

    '''
    {
        '_id': 1,
        'PROJECT_NAME': 'Ajax Copper Mine',
        'PROJECT_DESCRIPTION': 'Copper and gold open pit mine',
        'LATITUDE': 50.61233,
        'LONGITUDE': -120.412388,
        'FLNRO_AREA_NAME': 'South',
        'FLNRO_REGION_NAME': 'Thompson / Okanagan',
        'PROJECT_LOCATION': 'Kamloops',
        *'FLNRO_PROJECT_STATUS': 'Permitting: Pre-Application',
        *'PROJECT_TYPE': 'Major Mines',
        *'PROJECT_CATEGORY': 'Copper, gold',
        *'PROPONENT': 'KGHM Ajax Mining Inc.',
        *'EAO_PROJECT_STATUS': 'EAO Process Suspended',
        *'PROJECT_COMMENTS': '87027 (FCBC ATS); 10399-20 87027AJAX',
        'NRS_MAJOR_PROJECT_ID': 1,
        'ORGANIZATION_ WEBSITE': 'http://www2.gov.bc.ca/gov/content/industry/mineral-exploration-mining/permitting/major-mine-permitting-office'
}
    '''


class NaturalResourceProject(Location):
    LATITUDE_FIELD = 'LATITUDE'
    LONGITUDE_FIELD = 'LONGITUDE'
    NAME_FIELD = 'PROJECT_NAME'

    project_comments = models.TextField(null=True, blank=True)
    project_description = models.CharField(null=True, blank=True, max_length=255)
    estimated_cost = models.CharField(null=True, blank=True, max_length=255)
    update_activity = models.CharField(null=True, blank=True, max_length=255)
    construction_type = models.CharField(null=True, blank=True, max_length=255)
    construction_subtype = models.CharField(null=True, blank=True, max_length=255)
    project_type = models.CharField(null=True, blank=True, max_length=255)
    developer = models.CharField(null=True, blank=True, max_length=255)
    architect = models.CharField(null=True, blank=True, max_length=255)
    project_status = models.CharField(null=True, blank=True, max_length=255)
    project_stage = models.CharField(null=True, blank=True, max_length=255)
    project_category_name = models.CharField(null=True, blank=True, max_length=255)
    provinvial_funding = models.CharField(null=True, blank=True, max_length=255)
    federal_funding = models.CharField(null=True, blank=True, max_length=255)
    municipal_funding = models.CharField(null=True, blank=True, max_length=255)
    green_building_ind = models.CharField(null=True, blank=True, max_length=255)
    green_building_desc = models.CharField(null=True, blank=True, max_length=255)
    clean_energy_ind = models.CharField(null=True, blank=True, max_length=255)
    construction_jobs = models.CharField(null=True, blank=True, max_length=255)
    operating_jobs = models.CharField(null=True, blank=True, max_length=255)
    standardized_start_date = models.CharField(null=True, blank=True, max_length=255)
    standardized_completion_date = models.CharField(null=True, blank=True, max_length=255)

    def get_standardized_start_date_as_date(self):
        if not self.standardized_start_date:
            return None

        return get_quarterly_date_str_as_date(self.standardized_start_date)

    def get_standardized_completion_date_as_date(self):
        if not self.standardized_completion_date:
            return None

        return get_quarterly_date_str_as_date(self.standardized_completion_date)

    '''
    {
        '_id': 1,
        'PROJECT_ID': 4023,
        'PROJECT_NAME': 'RW Bruhn Bridge Replacement',
        *'PROJECT_DESCRIPTION': 'Proposed construction of a 5-lane bridge to replace existing bridge. Project will include intersection improvements and a multi-use path. Federal government providing $91.082 million funding.',
        *'ESTIMATED_COST': 225,
        *'UPDATE_ACTIVITY': 'New proposed project',
        'ENVIRONMENTAL_ASSESSMENT_STAGE': '',
        *'CONSTRUCTION_TYPE': 'Infrastructure',
        *'CONSTRUCTION_SUBTYPE': 'Roads & Highways',
        *'PROJECT_TYPE': 'Transportation',
        'REGION': '3. Thompson-Okanagan',
        'MUNICIPALITY': 'Sicamous',
        *'DEVELOPER': 'BC Ministry of Transportation and Infrastructure',
        *'ARCHITECT': '',
        *'PROJECT_STATUS': 'Proposed',
        *'PROJECT_STAGE': 'Preliminary/Feasibility',
        *'PROJECT_CATEGORY_NAME': 'Transportation & Warehousing',
        'PUBLIC_FUNDING_IND': 'TRUE',
        *'PROVINVIAL_FUNDING': 'TRUE',
        *'FEDERAL_FUNDING': 'TRUE',
        *'MUNICIPAL_FUNDING': 'FALSE',
        'OTHER_PUBLIC_FUNDING': 'FALSE',
        *'GREEN_BUILDING_IND': 'FALSE',
        *'GREEN_BUILDING_DESC': '',
        *'CLEAN_ENERGY_IND': 'FALSE',
        'INDIGENOUS_IND': 'FALSE',
        'INDIGENOUS_NAMES': '',
        'INDIGENOUS_AGREEMENT': '',
        *'CONSTRUCTION_JOBS': None,
        *'OPERATING_JOBS': None,
        *'STANDARDIZED_START_DATE': '2020-Q4',
        *'STANDARDIZED_COMPLETION_DATE': '2023-Q4',
        'LATITUDE': None,
        'LONGITUDE': None,
        'LATITUDE_DMS': '',
        'LONGITUDE_DMS': '',
        'TELEPHONE': '(250) 356-1861',
        'PROJECT_WEBSITE': '',
        'FIRST_ENTRY_DATE': '2018-12-01T00:00:00',
        'LAST_UPDATE': '2018-12-01T00:00:00',
        'UPDATED_FIELDS': 'Update all available, project added this quarter'
    }
    '''


class ServiceBCLocation(Location):
    NAME_FIELD = 'External Site'
    LATITUDE_FIELD = 'Latitude'
    LONGITUDE_FIELD = 'Longitude'
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

    sv_description = models.CharField(null=True, blank=True, max_length=255)
    hours = models.TextField(null=True, blank=True)

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
    NAME_FIELD = 'FCLTY_NM'

    keywords = models.CharField(null=True, blank=True, max_length=255)

    '''
    OrderedDict([
        ('CUST_ORG', 'Ministry of Forest, Lands and Natural Resource Operations and Rural Development - GeoBC '),
        ('BUS_CAT_CL', 'provincialProtectiveServices'),
        ('BUS_CAT_DS', 'Provincial protective services'),
        ('OCCPNT_TYP', 'BC First Responders'),
        ('SRCDATA_ID', '1965'),
        ('SRC_ID_IND', 'N'),
        ('FCLTY_NM', 'Prince George Community Policing'),
        ('DESCRIPTN', ''),
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
    NAME_FIELD = 'FCTY_NAME'

    ser_cd_dsc = models.CharField(null=True, blank=True, max_length=255)
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
    NAME_FIELD = 'COMPANY_NM'

    bus_cat_ds = models.CharField(null=True, blank=True, max_length=255)
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
    NAME_FIELD = 'FCLTY_NM'

    keywords = models.CharField(null=True, blank=True, max_length=255)
    bus_cat_cl = models.CharField(null=True, blank=True, max_length=255)
    bus_cat_ds = models.CharField(null=True, blank=True, max_length=255)
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


# class Library(Location):
#     '''
#     {"_id":5,"LIBRARY_SYSTEM":"Burnaby Public Library","LOCATION":"Cameron Library & Recreation Centre","BRANCH_UNIQUE_ID":"BB002","SCHOOL_DISTRICT_SERVED":"41","PHONE":"(604) 421-5454","PHYSICAL_ADDRESS":"9523 Cameron Street","CITY":"Burnaby","PROVINCE":"BC","POSTAL_CODE":"V3J 1L6","LATITUDE":49.25381414,"LONGITUDE":-122.898601,"MTLS_OUTLET":59958,"MTLS_CIRC_B":454254,"CIRC_CHILD_MTLS_B":227553,"REF_TRANS_B":20436,"VISITS_B":247701,"AD_INLIB_PGMS_B":50,"AD_OUT_PGMS_B":8,"ADULT_ATTEND_B":1067,"CH_INLIB_PGMS_B":221,"CH_OUT_PGMS_B":18,"CHILD_ATTEND_B":11112,"YA_INLIB_PGMS_B":4,"YA_OUT_PGMS_B":0,"YA_ATTEND_B":38,"ESL_INLIB_PGMS_B":11,"ESL_OUT_PGMS_B":0,"ESL_ATTEND_B":78,"LIBRARIAN_HRS_B":6834,"LIB_TECH_HRS_B":null,"COMM_LIB_HRS_B":null,"OTH_HRS_B":16311,"branch_copiers":1,"LEED_CERT_B":"No","SHRD_FAC":"Yes","FLOORSPACE":465,"HRS_OPEN":2901,"DAYS_OPEN":341}
#     '''


class LocationDistance(models.Model):
    community = models.ForeignKey(Community, on_delete=models.DO_NOTHING, related_name='distances')
    location = models.ForeignKey(Location, on_delete=models.DO_NOTHING, related_name='distances')
    distance = models.DecimalField(
        null=True, blank=True, max_digits=24, decimal_places=4, help_text="Driving distance from community to Location (km)"
    )
    travel_time = models.IntegerField(
        null=True, blank=True, help_text="Travel time (in minutes) corresponding to driving distance"
    )
    travel_time_display = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text="Travel time, in human-readable units (e.g. 15 minutes 22 seconds)",
    )
    driving_route_available = models.BooleanField(null=True, blank=True)

    class Meta:
        unique_together = ('community', 'location')
        verbose_name = "Location Distance"
        verbose_name_plural = "Location Distances"

    def __str__(self):
        return '{} to {}: {} km'.format(self.community.place_name, self.location.name, self.distance)
