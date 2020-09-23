from pipeline.models.general import Municipality, WildfireZone, TsunamiZone, SchoolDistrict, RegionalDistrict
from pipeline.models.location_assets import (
    Court,
    Hospital,
    EconomicProject,
    NaturalResourceProject,
    ServiceBCLocation,
    School,
    Clinic,
    FirstResponder,
    DiagnosticFacility,
    TimberFacility,
    CivicFacility,
    PostSecondaryInstitution,
    ClosedMill,
    ResearchCentre,
    Airport,
)
from pipeline.models.community import Community

DATABC_PERMALINK_URL = 'https://catalogue.data.gov.bc.ca/dataset/{permalink_id}'
SOURCE_INTERNAL = 'internal'
SOURCE_DATABC = 'databc'

LOCATION_TYPES = {
    'first_responders': FirstResponder,
    'diagnostic_facilities': DiagnosticFacility,
    'timber_facilities': TimberFacility,
    'civic_facilities': CivicFacility,
    'hospitals': Hospital,
    'natural_resource_projects': NaturalResourceProject,
    'economic_projects': EconomicProject,
    'servicebc_locations': ServiceBCLocation,
    'schools': School,
    'clinics': Clinic,
    'courts': Court,
    'post_secondary_institutions': PostSecondaryInstitution,
    'closed_mills': ClosedMill,
    'resesarch_centres': ResearchCentre,
    'airports': Airport,
}

CSV_RESOURCES = {
    # Provided by NetworkBC Team
    'communities': {
        'source': SOURCE_INTERNAL,
        'csv_path': 'data/COMMUNITIES_V6.csv',
        'display_name': 'Communities',
        'model': Community
    },
    'first_responders': {
        'source': SOURCE_DATABC,
        'permalink_id': '652c49eb-7295-4ae2-8f26-39103f23b50d',
        'csv_path': 'data/FRST_RSPND.csv',
        'display_name': 'First Responders',
        'model': FirstResponder
    },
    'diagnostic_facilities': {
        'source': SOURCE_DATABC,
        'permalink_id': '4f75e9f6-1459-4ae2-990d-b53b1c389525',
        'csv_path': 'data/DIAG_FACLT.csv',
        'display_name': 'Diagnostic Facilities',
        'model': DiagnosticFacility
    },
    'timber_facilities': {
        'source': SOURCE_DATABC,
        'permalink_id': '67daf53d-e3bb-45ee-9121-8aa1193b7492',
        'csv_path': 'data/GSRTMBRPRC.csv',
        'display_name': 'Timber Facilities',
        'model': TimberFacility
    },
    'civic_facilities': {
        'source': SOURCE_DATABC,
        'permalink_id': 'ea7cd54f-1820-4f4a-8b2c-40c8a51f84bd',
        'csv_path': 'data/CIVIC_FAC.csv',
        'display_name': 'Civic Facilities',
        'model': CivicFacility
    },
    'closed_mills': {
        'source': SOURCE_INTERNAL,
        'csv_path': 'data/closed_mills.csv',
        'display_name': 'Closed Mills',
        'model': ClosedMill
    },
    'airports': {
        'source': SOURCE_DATABC,
        'permalink_id': '76b1b7a3-2112-4444-857a-afccf7b20da8',
        'csv_path': 'data/ARPRTS.csv',
        'display_name': 'Airports',
        'model': Airport
    },
}


DATABC_RESOURCES = {
    'hospitals': {
        'source': SOURCE_DATABC,
        'permalink_id': '383eaf98-afd7-436a-9556-67ecf14f64a7',
        'resource_id': '5ff82cf4-0448-4063-804a-7321f0f2b4c6',
        'display_name': 'Hospitals',
        'model': Hospital
    },
    'natural_resource_projects': {
        'source': SOURCE_DATABC,
        'permalink_id': '5ee75843-06b3-4767-b6c2-3248289f5e8d',
        'resource_id': '2b69cc4b-4076-4272-a5a0-1c731455e063',
        'display_name': 'Natural Resource Projects',
        'model': NaturalResourceProject,
    },
    'economic_projects': {
        'source': SOURCE_DATABC,
        'permalink_id': 'ea4c0bdb-a63f-49a4-b14a-09c1560aad0b',
        'resource_id': 'b12cd4cc-b58b-4079-b630-a20b6df58e8d',
        'display_name': 'Economic Projects',
        'model': EconomicProject
    },
    'servicebc_locations': {
        'source': SOURCE_DATABC,
        'permalink_id': '2b44d212-5438-47a9-ad23-20eb8ada9709',
        'resource_id': 'c7cc9297-220c-4d6c-a9a7-72d0680b2f74',
        'display_name': 'Service BC Office Locations',
        'model': ServiceBCLocation
    },
    'schools': {
        'source': SOURCE_DATABC,
        'permalink_id': '95da1091-7e8c-4aa6-9c1b-5ab159ea7b42',
        'resource_id': '5832eff2-3380-435e-911b-5ada41c1d30b',
        'display_name': 'Schools (K-12)',
        'model': School
    },
    'clinics': {
        'source': SOURCE_DATABC,
        'permalink_id': '5e2707c3-0aa4-4d2d-aedc-4dd0914b686a',
        'resource_id': '3ca6b086-c92b-4654-ae82-ff5723d00611',
        'display_name': 'Walk-in Clinics',
        'model': Clinic
    },
    'courts': {
        'source': SOURCE_DATABC,
        'permalink_id': 'c95a2ad5-f62a-43d6-8678-80a617b6200e',
        'resource_id': '23aa0b75-2715-4ccb-9a36-9a608450dc2d',
        'display_name': 'Courts',
        'model': Court
    },
    'post_secondary_institutions': {
        'source': SOURCE_DATABC,
        'permalink_id': '81558d54-1f96-46c2-94fe-56d26f69c4f5',
        'resource_id': '8e4e2a87-2d1d-4931-828e-6327b49f310e',
        'display_name': 'Post-Secondary Institutions',
        'model': PostSecondaryInstitution
    },
    'research_centres': {
        'source': SOURCE_DATABC,
        'permalink_id': '7859ae46-2aa1-47ee-a05b-7d0daa472678',
        'resource_id': 'b930d0c7-31e5-4816-a06d-3ea23dbc7635',
        'display_name': 'Research Centres',
        'model': ResearchCentre
    },
}

SHP_RESOURCES = {
    'wildfires_zones': {
        'source': SOURCE_DATABC,
        'permalink_id': '3c71551e-c1aa-4272-9c89-64fbd22a910d',
        'path': 'data/wildfire_zones.zip',
        'display_name': 'Wildfire Wildland Urban Interface Risk Class',
        'model': WildfireZone
    },
    'tsunami_zones': {
        'source': SOURCE_DATABC,
        'permalink_id': 'd9bafe48-5bf7-461b-a8d6-ba6d1e2245f0',
        'path': 'data/tsunami_zones.zip',
        'display_name': 'Tsunami Notification Zones',
        'model': TsunamiZone
    },
    'municipalities': {
        'source': SOURCE_DATABC,
        'permalink_id': 'e3c3c580-996a-4668-8bc5-6aa7c7dc4932',
        'path': 'data/municipalities.zip',
        'display_name': 'Municipalities',
        'model': Municipality
    },
    'school_districts': {
        'source': SOURCE_DATABC,
        'permalink_id': '78ec5279-4534-49a1-97e8-9d315936f08b',
        'path': 'data/school_districts.zip',
        'display_name': 'School Districts',
        'model': SchoolDistrict
    },
    'regional_districts': {
        'source': SOURCE_DATABC,
        'permalink_id': 'd1aff64e-dbfe-45a6-af97-582b7f6418b9',
        'path': 'data/regional_districts.zip',
        'display_name': 'Regional Districts',
        'model': RegionalDistrict
    },
    # Note: census divisions are only used to monkey-patch the Northern Rockies "regional district"
    # which is missing (actually a municipality)
    'northern_rockies_census_division': {
        'source': SOURCE_DATABC,
        'permalink_id': 'ef17918a-597a-4012-8534-f8e71d8735b3',
        'path': 'data/census_divisions.zip',
        'display_name': 'Northern Rockies Census Division (included as Regional District)',
        'model': RegionalDistrict
    },
}

POWERBI_AGG_DOMESTIC = "ReportSection6249eac6d911d2930de3"
POWERBI_AGG_EDUCATION = "ReportSection39f3a30707d51e04d585"
POWERBI_AGG_CULTURE = "ReportSectionc275f231ed2c4af16a7d"
POWERBI_AGG_INCOME = "ReportSection65f0df6512cfb580c7a2"
POWERBI_AGG_ECONOMICS = "ReportSection88694206176b52607b4d"
POWERBI_AGG_HEALTH = "ReportSectionde977e8425990a550597"
POWERBI_AGG_NATURAL_RESOURCES = "ReportSectiond15790722d8872fdd447"
POWERBI_AGG_CONNECTIVITY = "ReportSection498ce34a9e89c7c66ddd"
POWERBI_DET_HOUSING_DET = "ReportSection40208eb2bd583e69022a"
POWERBI_DET_HOUSING_CMP = "ReportSection33f0d75c8f1e581816d6"
POWERBI_DET_DEMOGRAPHICS_DET = "ReportSectioned265c9a280b2bf7a925"
POWERBI_DET_DEMOGRAPHICS_CMP = "ReportSectionce86ffd870642ae4e7b8"
POWERBI_DET_EDUCATION_DET = "ReportSection2e89dc5afd87ef0ae354"
POWERBI_DET_EDUCATION_CMP = "ReportSectione465e2e7c11425d1ec71"
POWERBI_DET_INCOME_DET = "ReportSectionf2b8f5bb464e6d79a9ed"
POWERBI_DET_INCOME_CMP = "ReportSection067effabf93ddf06a487"
POWERBI_DET_ECONOMICS_DET = "ReportSection8f523b520a86970e96d4"
POWERBI_DET_ECONOMICS_CMP = "ReportSection9102d6de04d96ccc6b39"
POWERBI_DET_HEALTH_DET = "ReportSection9225d60e07de606ad6e0"
POWERBI_DET_HEALTH_CMP = "ReportSection0685d299f800b594fcda"
POWERBI_DET_SERVICES_DET = "ReportSectionb573e08eb7a7e160fd80"
POWERBI_DET_SERVICES_CMP = "ReportSection44b16367429b095d47ef"
POWERBI_DET_CONNECTIVITY_DET = "ReportSectionbc899e8fac8c2b494765"
POWERBI_DET_CONNECTIVITY_CMP = "ReportSectione62c63148a89f566c083"

POWERBI_HIDDEN_DETAIL_PAGES = [
    POWERBI_DET_DEMOGRAPHICS_DET, POWERBI_DET_DEMOGRAPHICS_CMP,
    POWERBI_DET_EDUCATION_CMP,
    POWERBI_DET_INCOME_DET, POWERBI_DET_INCOME_CMP,
    POWERBI_DET_HOUSING_DET, POWERBI_DET_HOUSING_CMP]

POWERBI_HIDDEN_EXPLORE_PAGES = [
    POWERBI_AGG_DOMESTIC, POWERBI_AGG_EDUCATION, POWERBI_AGG_INCOME]

CENSUS_LANGUAGE_MAP = {
    "3.4.1.1.1.1": "English",
    "3.4.1.1.1.2": "French",
    "3.4.1.1.2.1.1.1": "Blackfoot",
    "3.4.1.1.2.1.1.2.1": "Atikamekw",
    "3.4.1.1.2.1.1.2.2": "Montagnais (Innu)",
    "3.4.1.1.2.1.1.2.3": "Moose Cree",
    "3.4.1.1.2.1.1.2.4": "Naskapi",
    "3.4.1.1.2.1.1.2.5": "Northern East Cree",
    "3.4.1.1.2.1.1.2.6": "Plains Cree",
    "3.4.1.1.2.1.1.2.7": "Southern East Cree",
    "3.4.1.1.2.1.1.2.8": "Swampy Cree",
    "3.4.1.1.2.1.1.2.9": "Woods Cree",
    "3.4.1.1.2.1.1.2.10": "Cree, n.o.s.",
    "3.4.1.1.2.1.1.3.1": "Malecite",
    "3.4.1.1.2.1.1.3.2": "Mi'kmaq",
    "3.4.1.1.2.1.1.4.1": "Algonquin",
    "3.4.1.1.2.1.1.4.2": "Ojibway",
    "3.4.1.1.2.1.1.4.3": "Oji-Cree",
    "3.4.1.1.2.1.1.4.4": "Ottawa (Odawa)",
    "3.4.1.1.2.1.1.5": "Algonquian languages, n.i.e.",
    "3.4.1.1.2.1.2.1.1": "Babine (Wetsuwet'en)",
    "3.4.1.1.2.1.2.1.2": "Beaver",
    "3.4.1.1.2.1.2.1.3": "Carrier",
    "3.4.1.1.2.1.2.1.4": "Chilcotin",
    "3.4.1.1.2.1.2.1.5": "Dene",
    "3.4.1.1.2.1.2.1.6": "Dogrib (Tlicho)",
    "3.4.1.1.2.1.2.1.7": "Gwich'in",
    "3.4.1.1.2.1.2.1.8": "Sarsi (Sarcee)",
    "3.4.1.1.2.1.2.1.9": "Sekani",
    "3.4.1.1.2.1.2.1.10.1": "North Slavey (Hare)",
    "3.4.1.1.2.1.2.1.10.2": "South Slavey",
    "3.4.1.1.2.1.2.1.10.3": "Slavey, n.o.s.",
    "3.4.1.1.2.1.2.1.11.1": "Kaska (Nahani)",
    "3.4.1.1.2.1.2.1.11.2": "Tahltan",
    "3.4.1.1.2.1.2.1.12.1": "Northern Tutchone",
    "3.4.1.1.2.1.2.1.12.2": "Southern Tutchone",
    "3.4.1.1.2.1.2.2": "Athabaskan languages, n.i.e.",
    "3.4.1.1.2.1.3": "Haida",
    "3.4.1.1.2.1.4.1": "Inuinnaqtun (Inuvialuktun)",
    "3.4.1.1.2.1.4.2": "Inuktitut",
    "3.4.1.1.2.1.4.3": "Inuit languages, n.i.e.",
    "3.4.1.1.2.1.5.1": "Cayuga",
    "3.4.1.1.2.1.5.2": "Mohawk",
    "3.4.1.1.2.1.5.3": "Oneida",
    "3.4.1.1.2.1.5.4": "Iroquoian languages, n.i.e.",
    "3.4.1.1.2.1.6": "Kutenai",
    "3.4.1.1.2.1.7": "Michif",
    "3.4.1.1.2.1.8.1": "Comox",
    "3.4.1.1.2.1.8.2": "Halkomelem",
    "3.4.1.1.2.1.8.3": "Lillooet",
    "3.4.1.1.2.1.8.4": "Okanagan",
    "3.4.1.1.2.1.8.5": "Shuswap (Secwepemctsin)",
    "3.4.1.1.2.1.8.6": "Squamish",
    "3.4.1.1.2.1.8.7": "Straits",
    "3.4.1.1.2.1.8.8": "Thompson (Ntlakapamux)",
    "3.4.1.1.2.1.8.9": "Salish languages, n.i.e.",
    "3.4.1.1.2.1.9.1": "Dakota",
    "3.4.1.1.2.1.9.2": "Stoney",
    "3.4.1.1.2.1.9.3": "Siouan languages, n.i.e.",
    "3.4.1.1.2.1.10": "Tlingit",
    "3.4.1.1.2.1.11.1": "Gitxsan (Gitksan)",
    "3.4.1.1.2.1.11.2": "Nisga'a",
    "3.4.1.1.2.1.11.3": "Tsimshian",
    "3.4.1.1.2.1.12.1": "Haisla",
    "3.4.1.1.2.1.12.2": "Heiltsuk",
    "3.4.1.1.2.1.12.3": "Kwakiutl (Kwak'wala)",
    "3.4.1.1.2.1.12.4": "Nuu-chah-nulth (Nootka)",
    "3.4.1.1.2.1.12.5": "Wakashan languages, n.i.e.",
    "3.4.1.1.2.1.13": "Aboriginal languages, n.o.s.",
    "3.4.1.1.2.2.1.1.1": "Kabyle",
    "3.4.1.1.2.2.1.1.2": "Berber languages, n.i.e.",
    "3.4.1.1.2.2.1.2.1": "Bilen",
    "3.4.1.1.2.2.1.2.3": "Somali",
    "3.4.1.1.2.2.1.2.4": "Cushitic languages, n.i.e.",
    "3.4.1.1.2.2.1.3.1": "Amharic",
    "3.4.1.1.2.2.1.3.2": "Arabic",
    "3.4.1.1.2.2.1.3.3": "Assyrian Neo-Aramaic",
    "3.4.1.1.2.2.1.3.4": "Chaldean Neo-Aramaic",
    "3.4.1.1.2.2.1.3.5": "Harari",
    "3.4.1.1.2.2.1.3.6": "Hebrew",
    "3.4.1.1.2.2.1.3.7": "Maltese",
    "3.4.1.1.2.2.1.3.8": "Tigrigna",
    "3.4.1.1.2.2.1.3.9": "Semitic languages, n.i.e.",
    "3.4.1.1.2.2.1.4": "Afro-Asiatic languages, n.i.e.",
    "3.4.1.1.2.2.2.1": "Khmer (Cambodian)",
    "3.4.1.1.2.2.2.2": "Vietnamese",
    "3.4.1.1.2.2.2.3": "Austro-Asiatic languages, n.i.e",
    "3.4.1.1.2.2.3.1": "Bikol",
    "3.4.1.1.2.2.3.2": "Cebuano",
    "3.4.1.1.2.2.3.3": "Fijian",
    "3.4.1.1.2.2.3.4": "Hiligaynon",
    "3.4.1.1.2.2.3.5": "Ilocano",
    "3.4.1.1.2.2.3.6": "Malagasy",
    "3.4.1.1.2.2.3.7": "Malay",
    "3.4.1.1.2.2.3.8": "Pampangan (Kapampangan, Pampango)",
    "3.4.1.1.2.2.3.9": "Pangasinan",
    "3.4.1.1.2.2.3.10": "Tagalog (Pilipino, Filipino)",
    "3.4.1.1.2.2.3.11": "Waray-Waray",
    "3.4.1.1.2.2.3.12": "Austronesian languages, n.i.e.",
    "3.4.1.1.2.2.4.1": "Haitian Creole",
    "3.4.1.1.2.2.4.2": "Creole, n.o.s.",
    "3.4.1.1.2.2.4.3": "Creole languages, n.i.e.",
    "3.4.1.1.2.2.5.1": "Kannada",
    "3.4.1.1.2.2.5.2": "Malayalam",
    "3.4.1.1.2.2.5.3": "Tamil",
    "3.4.1.1.2.2.5.4": "Telugu",
    "3.4.1.1.2.2.5.5": "Dravidian languages, n.i.e.",
    "3.4.1.1.2.2.6": "Hmong-Mien languages",
    "3.4.1.1.2.2.7.1": "Albanian",
    "3.4.1.1.2.2.7.2": "Armenian",
    "3.4.1.1.2.2.7.3.1.1": "Latvian",
    "3.4.1.1.2.2.7.3.1.2": "Lithuanian",
    "3.4.1.1.2.2.7.3.2.1": "Belarusan",
    "3.4.1.1.2.2.7.3.2.2": "Bosnian",
    "3.4.1.1.2.2.7.3.2.3": "Bulgarian",
    "3.4.1.1.2.2.7.3.2.4": "Croatian",
    "3.4.1.1.2.2.7.3.2.5": "Czech",
    "3.4.1.1.2.2.7.3.2.6": "Macedonian",
    "3.4.1.1.2.2.7.3.2.7": "Polish",
    "3.4.1.1.2.2.7.3.2.8": "Russian",
    "3.4.1.1.2.2.7.3.2.9": "Serbian",
    "3.4.1.1.2.2.7.3.2.10": "Serbo-Croatian",
    "3.4.1.1.2.2.7.3.2.11": "Slovak",
    "3.4.1.1.2.2.7.3.2.12": "Slovene (Slovenian)",
    "3.4.1.1.2.2.7.3.2.13": "Ukrainian",
    "3.4.1.1.2.2.7.3.2.14": "Slavic languages, n.i.e.",
    "3.4.1.1.2.2.7.4.1": "Scottish Gaelic",
    "3.4.1.1.2.2.7.4.2": "Welsh",
    "3.4.1.1.2.2.7.4.3": "Celtic languages, n.i.e.",
    "3.4.1.1.2.2.7.5.1": "Afrikaans",
    "3.4.1.1.2.2.7.5.2": "Danish",
    "3.4.1.1.2.2.7.5.3": "Dutch",
    "3.4.1.1.2.2.7.5.4": "Frisian",
    "3.4.1.1.2.2.7.5.5": "German",
    "3.4.1.1.2.2.7.5.6": "Icelandic",
    "3.4.1.1.2.2.7.5.7": "Norwegian",
    "3.4.1.1.2.2.7.5.8": "Swedish",
    "3.4.1.1.2.2.7.5.9": "Vlaams (Flemish)",
    "3.4.1.1.2.2.7.5.10": "Yiddish",
    "3.4.1.1.2.2.7.5.11": "Germanic languages, n.i.e.",
    "3.4.1.1.2.2.7.6": "Greek",
    "3.4.1.1.2.2.7.7.1.1": "Bengali",
    "3.4.1.1.2.2.7.7.1.2": "Gujarati",
    "3.4.1.1.2.2.7.7.1.3": "Hindi",
    "3.4.1.1.2.2.7.7.1.4": "Kashmiri",
    "3.4.1.1.2.2.7.7.1.5": "Konkani",
    "3.4.1.1.2.2.7.7.1.6": "Marathi",
    "3.4.1.1.2.2.7.7.1.7": "Nepali",
    "3.4.1.1.2.2.7.7.1.8": "Oriya (Odia)",
    "3.4.1.1.2.2.7.7.1.9": "Punjabi (Panjabi)",
    "3.4.1.1.2.2.7.7.1.10": "Sindhi",
    "3.4.1.1.2.2.7.7.1.11": "Sinhala (Sinhalese)",
    "3.4.1.1.2.2.7.7.1.12": "Urdu",
    "3.4.1.1.2.2.7.7.2.1": "Kurdish",
    "3.4.1.1.2.2.7.7.2.2": "Pashto",
    "3.4.1.1.2.2.7.7.2.3": "Persian (Farsi)",
    "3.4.1.1.2.2.7.7.3": "Indo-Iranian languages, n.i.e.",
    "3.4.1.1.2.2.7.8.1": "Catalan",
    "3.4.1.1.2.2.7.8.2": "Italian",
    "3.4.1.1.2.2.7.8.3": "Portuguese",
    "3.4.1.1.2.2.7.8.4": "Romanian",
    "3.4.1.1.2.2.7.8.5": "Spanish",
    "3.4.1.1.2.2.7.8.6": "Italic (Romance) languages, n.i.e.",
    "3.4.1.1.2.2.8": "Japanese",
    "3.4.1.1.2.2.9.1": "Georgian",
    "3.4.1.1.2.2.10": "Korean",
    "3.4.1.1.2.2.11.1": "Mongolian",
    "3.4.1.1.2.2.12.1": "Akan (Twi)",
    "3.4.1.1.2.2.12.2": "Bamanankan",
    "3.4.1.1.2.2.12.3": "Edo",
    "3.4.1.1.2.2.12.4": "Ewe",
    "3.4.1.1.2.2.12.5": "Fulah (Pular, Pulaar, Fulfulde)",
    "3.4.1.1.2.2.12.6": "Ga",
    "3.4.1.1.2.2.12.7": "Ganda",
    "3.4.1.1.2.2.12.8": "Igbo",
    "3.4.1.1.2.2.12.9": "Lingala",
    "3.4.1.1.2.2.12.10": "Rundi (Kirundi)",
    "3.4.1.1.2.2.12.11": "Kinyarwanda (Rwanda)",
    "3.4.1.1.2.2.12.12": "Shona",
    "3.4.1.1.2.2.12.13": "Swahili",
    "3.4.1.1.2.2.12.14": "Wolof",
    "3.4.1.1.2.2.12.15": "Yoruba",
    "3.4.1.1.2.2.12.16": "Niger-Congo languages, n.i.e.",
    "3.4.1.1.2.2.13.1": "Dinka",
    "3.4.1.1.2.2.13.2": "Nilo-Saharan languages, n.i.e.",
    "3.4.1.1.2.2.14.1": "American Sign Language",
    "3.4.1.1.2.2.14.2": "Quebec Sign Language",
    "3.4.1.1.2.2.14.3": "Sign languages, n.i.e",
    "3.4.1.1.2.2.15.1.1": "Cantonese",
    "3.4.1.1.2.2.15.1.2": "Hakka",
    "3.4.1.1.2.2.15.1.3": "Mandarin",
    "3.4.1.1.2.2.15.1.4": "Min Dong",
    "3.4.1.1.2.2.15.1.5": "Min Nan (Chaochow, Teochow, Fukien, Taiwanese)",
    "3.4.1.1.2.2.15.1.6": "Wu (Shanghainese)",
    "3.4.1.1.2.2.15.1.7": "Chinese, n.o.s.",
    "3.4.1.1.2.2.15.1.8": "Chinese languages, n.i.e.",
    "3.4.1.1.2.2.15.2.1": "Burmese",
    "3.4.1.1.2.2.15.2.2": "Karenic languages",
    "3.4.1.1.2.2.15.2.3": "Tibetan",
    "3.4.1.1.2.2.15.2.4": "Tibeto-Burman languages, n.i.e.",
    "3.4.1.1.2.2.16.1": "Lao",
    "3.4.1.1.2.2.16.2": "Thai",
    "3.4.1.1.2.2.16.3": "Tai-Kadai languages, n.i.e",
    "3.4.1.1.2.2.17.1": "Azerbaijani",
    "3.4.1.1.2.2.17.2": "Turkish",
    "3.4.1.1.2.2.17.3": "Uyghur",
    "3.4.1.1.2.2.17.4": "Uzbek",
    "3.4.1.1.2.2.17.5": "Turkic languages, n.i.e.",
    "3.4.1.1.2.2.18.1": "Estonian",
    "3.4.1.1.2.2.18.2": "Finnish",
    "3.4.1.1.2.2.18.3": "Hungarian",
    "3.4.1.1.2.2.18.4": "Uralic languages, n.i.e.",
    "3.4.1.1.2.2.19": "Other languages, n.i.e.",
}

BC_ALBERS_SRID = 3005
WGS84_SRID = 4326
