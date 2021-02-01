DATABC_PERMALINK_URL = 'https://catalogue.data.gov.bc.ca/dataset/{permalink_id}'
DATABC_METADATA_API_URL = "https://catalogue.data.gov.bc.ca/api/3/action/resource_show?id={dataset_resource_id}"
OPENCA_METADATA_API_URL = 'https://open.canada.ca/data/api/action/package_show?id={dataset_resource_id}'
SOURCE_INTERNAL = 'internal'
SOURCE_DATABC = 'databc'
SOURCE_STATSCAN = 'statscan'
SOURCE_OPENCA = 'openca'
SOURCE_OTHER = 'other'

DATA_SOURCE_TYPE_CHOICES = (
    ("csv", "CSV"),
    ("api", "DATABC API"),
    ("shp", "SHP"),
)

DATA_SOURCE_CHOICES = (
    (SOURCE_INTERNAL, "Provided by Network BC team"),
    (SOURCE_DATABC, "BC Data Catalogue"),
    (SOURCE_STATSCAN, "Statistics Canada"),
    (SOURCE_OPENCA, "Open Government (Canada)"),
    (SOURCE_OTHER, "Other"),
)

CIVIC_LEADER_CHOICES = (
    ("mayor", "Mayor"),
    ("councillor", "Councillor"),
)

LOCATION_TYPES = [
    'first_responders', 'diagnostic_facilities', 'timber_facilities', 'civic_facilities', 'hospitals',
    'projects', 'servicebc_locations', 'schools', 'clinics', 'courts',
    'post_secondary_institutions', 'closed_mills', 'research_centres', 'airports']

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
    "3.6.1.1.1": "English",
    "3.6.1.1.2": "French",
    "3.6.1.2.1.1.1": "Blackfoot",
    "3.6.1.2.1.1.2.1": "Atikamekw",
    "3.6.1.2.1.1.2.2": "Montagnais (Innu)",
    "3.6.1.2.1.1.2.3": "Moose Cree",
    "3.6.1.2.1.1.2.4": "Naskapi",
    "3.6.1.2.1.1.2.5": "Northern East Cree",
    "3.6.1.2.1.1.2.6": "Plains Cree",
    "3.6.1.2.1.1.2.7": "Southern East Cree",
    "3.6.1.2.1.1.2.8": "Swampy Cree",
    "3.6.1.2.1.1.2.9": "Woods Cree",
    "3.6.1.2.1.1.2.10": "Cree, n.o.s.",
    "3.6.1.2.1.1.3.1": "Malecite",
    "3.6.1.2.1.1.3.2": "Mi'kmaq",
    "3.6.1.2.1.1.4.1": "Algonquin",
    "3.6.1.2.1.1.4.2": "Ojibway",
    "3.6.1.2.1.1.4.3": "Oji-Cree",
    "3.6.1.2.1.1.4.4": "Ottawa (Odawa)",
    "3.6.1.2.1.1.5": "Algonquian languages, n.i.e.",
    "3.6.1.2.1.2.1.1": "Babine (Wetsuwet'en)",
    "3.6.1.2.1.2.1.2": "Beaver",
    "3.6.1.2.1.2.1.3": "Carrier",
    "3.6.1.2.1.2.1.4": "Chilcotin",
    "3.6.1.2.1.2.1.5": "Dene",
    "3.6.1.2.1.2.1.6": "Dogrib (Tlicho)",
    "3.6.1.2.1.2.1.7": "Gwich'in",
    "3.6.1.2.1.2.1.8": "Sarsi (Sarcee)",
    "3.6.1.2.1.2.1.9": "Sekani",
    "3.6.1.2.1.2.1.10.1": "North Slavey (Hare)",
    "3.6.1.2.1.2.1.10.2": "South Slavey",
    "3.6.1.2.1.2.1.10.3": "Slavey, n.o.s.",
    "3.6.1.2.1.2.1.11.1": "Kaska (Nahani)",
    "3.6.1.2.1.2.1.11.2": "Tahltan",
    "3.6.1.2.1.2.1.12.1": "Northern Tutchone",
    "3.6.1.2.1.2.1.12.2": "Southern Tutchone",
    "3.6.1.2.1.2.2": "Athabaskan languages, n.i.e.",
    "3.6.1.2.1.3": "Haida",
    "3.6.1.2.1.4.1": "Inuinnaqtun (Inuvialuktun)",
    "3.6.1.2.1.4.2": "Inuktitut",
    "3.6.1.2.1.4.3": "Inuit languages, n.i.e.",
    "3.6.1.2.1.5.1": "Cayuga",
    "3.6.1.2.1.5.2": "Mohawk",
    "3.6.1.2.1.5.3": "Oneida",
    "3.6.1.2.1.5.4": "Iroquoian languages, n.i.e.",
    "3.6.1.2.1.6": "Kutenai",
    "3.6.1.2.1.7": "Michif",
    "3.6.1.2.1.8.1": "Comox",
    "3.6.1.2.1.8.2": "Halkomelem",
    "3.6.1.2.1.8.3": "Lillooet",
    "3.6.1.2.1.8.4": "Okanagan",
    "3.6.1.2.1.8.5": "Shuswap (Secwepemctsin)",
    "3.6.1.2.1.8.6": "Squamish",
    "3.6.1.2.1.8.7": "Straits",
    "3.6.1.2.1.8.8": "Thompson (Ntlakapamux)",
    "3.6.1.2.1.8.9": "Salish languages, n.i.e.",
    "3.6.1.2.1.9.1": "Dakota",
    "3.6.1.2.1.9.2": "Stoney",
    "3.6.1.2.1.9.3": "Siouan languages, n.i.e.",
    "3.6.1.2.1.10": "Tlingit",
    "3.6.1.2.1.11.1": "Gitxsan (Gitksan)",
    "3.6.1.2.1.11.2": "Nisga'a",
    "3.6.1.2.1.11.3": "Tsimshian",
    "3.6.1.2.1.12.1": "Haisla",
    "3.6.1.2.1.12.2": "Heiltsuk",
    "3.6.1.2.1.12.3": "Kwakiutl (Kwak'wala)",
    "3.6.1.2.1.12.4": "Nuu-chah-nulth (Nootka)",
    "3.6.1.2.1.12.5": "Wakashan languages, n.i.e.",
    "3.6.1.2.1.13": "Aboriginal languages, n.o.s.",
    "3.6.1.2.2.1.1.1": "Kabyle",
    "3.6.1.2.2.1.1.2": "Berber languages, n.i.e.",
    "3.6.1.2.2.1.2.1": "Bilen",
    "3.6.1.2.2.1.2.2": "Oromo",
    "3.6.1.2.2.1.2.3": "Somali",
    "3.6.1.2.2.1.2.4": "Cushitic languages, n.i.e.",
    "3.6.1.2.2.1.3.1": "Amharic",
    "3.6.1.2.2.1.3.2": "Arabic",
    "3.6.1.2.2.1.3.3": "Assyrian Neo-Aramaic",
    "3.6.1.2.2.1.3.4": "Chaldean Neo-Aramaic",
    "3.6.1.2.2.1.3.5": "Harari",
    "3.6.1.2.2.1.3.6": "Hebrew",
    "3.6.1.2.2.1.3.7": "Maltese",
    "3.6.1.2.2.1.3.8": "Tigrigna",
    "3.6.1.2.2.1.3.9": "Semitic languages, n.i.e.",
    "3.6.1.2.2.1.4": "Afro-Asiatic languages, n.i.e.",
    "3.6.1.2.2.2.1": "Khmer (Cambodian)",
    "3.6.1.2.2.2.2": "Vietnamese",
    "3.6.1.2.2.2.3": "Austro-Asiatic languages, n.i.e",
    "3.6.1.2.2.3.1": "Bikol",
    "3.6.1.2.2.3.2": "Cebuano",
    "3.6.1.2.2.3.3": "Fijian",
    "3.6.1.2.2.3.4": "Hiligaynon",
    "3.6.1.2.2.3.5": "Ilocano",
    "3.6.1.2.2.3.6": "Malagasy",
    "3.6.1.2.2.3.7": "Malay",
    "3.6.1.2.2.3.8": "Pampangan (Kapampangan, Pampango)",
    "3.6.1.2.2.3.9": "Pangasinan",
    "3.6.1.2.2.3.10": "Tagalog (Pilipino, Filipino)",
    "3.6.1.2.2.3.11": "Waray-Waray",
    "3.6.1.2.2.3.12": "Austronesian languages, n.i.e.",
    "3.6.1.2.2.4.1": "Haitian Creole",
    "3.6.1.2.2.4.2": "Creole, n.o.s.",
    "3.6.1.2.2.4.3": "Creole languages, n.i.e.",
    "3.6.1.2.2.5.1": "Kannada",
    "3.6.1.2.2.5.2": "Malayalam",
    "3.6.1.2.2.5.3": "Tamil",
    "3.6.1.2.2.5.4": "Telugu",
    "3.6.1.2.2.5.5": "Dravidian languages, n.i.e.",
    "3.6.1.2.2.6": "Hmong-Mien languages",
    "3.6.1.2.2.7.1": "Albanian",
    "3.6.1.2.2.7.2": "Armenian",
    "3.6.1.2.2.7.3.1.1": "Latvian",
    "3.6.1.2.2.7.3.1.2": "Lithuanian",
    "3.6.1.2.2.7.3.2.1": "Belarusan",
    "3.6.1.2.2.7.3.2.2": "Bosnian",
    "3.6.1.2.2.7.3.2.3": "Bulgarian",
    "3.6.1.2.2.7.3.2.4": "Croatian",
    "3.6.1.2.2.7.3.2.5": "Czech",
    "3.6.1.2.2.7.3.2.6": "Macedonian",
    "3.6.1.2.2.7.3.2.7": "Polish",
    "3.6.1.2.2.7.3.2.8": "Russian",
    "3.6.1.2.2.7.3.2.9": "Serbian",
    "3.6.1.2.2.7.3.2.10": "Serbo-Croatian",
    "3.6.1.2.2.7.3.2.11": "Slovak",
    "3.6.1.2.2.7.3.2.12": "Slovene (Slovenian)",
    "3.6.1.2.2.7.3.2.13": "Ukrainian",
    "3.6.1.2.2.7.3.2.14": "Slavic languages, n.i.e.",
    "3.6.1.2.2.7.4.1": "Scottish Gaelic",
    "3.6.1.2.2.7.4.2": "Welsh",
    "3.6.1.2.2.7.4.3": "Celtic languages, n.i.e.",
    "3.6.1.2.2.7.5.1": "Afrikaans",
    "3.6.1.2.2.7.5.2": "Danish",
    "3.6.1.2.2.7.5.3": "Dutch",
    "3.6.1.2.2.7.5.4": "Frisian",
    "3.6.1.2.2.7.5.5": "German",
    "3.6.1.2.2.7.5.6": "Icelandic",
    "3.6.1.2.2.7.5.7": "Norwegian",
    "3.6.1.2.2.7.5.8": "Swedish",
    "3.6.1.2.2.7.5.9": "Vlaams (Flemish)",
    "3.6.1.2.2.7.5.10": "Yiddish",
    "3.6.1.2.2.7.5.11": "Germanic languages, n.i.e.",
    "3.6.1.2.2.7.6": "Greek",
    "3.6.1.2.2.7.7.1.1": "Bengali",
    "3.6.1.2.2.7.7.1.2": "Gujarati",
    "3.6.1.2.2.7.7.1.3": "Hindi",
    "3.6.1.2.2.7.7.1.4": "Kashmiri",
    "3.6.1.2.2.7.7.1.5": "Konkani",
    "3.6.1.2.2.7.7.1.6": "Marathi",
    "3.6.1.2.2.7.7.1.7": "Nepali",
    "3.6.1.2.2.7.7.1.8": "Oriya (Odia)",
    "3.6.1.2.2.7.7.1.9": "Punjabi (Panjabi)",
    "3.6.1.2.2.7.7.1.10": "Sindhi",
    "3.6.1.2.2.7.7.1.11": "Sinhala (Sinhalese)",
    "3.6.1.2.2.7.7.1.12": "Urdu",
    "3.6.1.2.2.7.7.2.1": "Kurdish",
    "3.6.1.2.2.7.7.2.2": "Pashto",
    "3.6.1.2.2.7.7.2.3": "Persian (Farsi)",
    "3.6.1.2.2.7.7.3": "Indo-Iranian languages, n.i.e.",
    "3.6.1.2.2.7.8.1": "Catalan",
    "3.6.1.2.2.7.8.2": "Italian",
    "3.6.1.2.2.7.8.3": "Portuguese",
    "3.6.1.2.2.7.8.4": "Romanian",
    "3.6.1.2.2.7.8.5": "Spanish",
    "3.6.1.2.2.7.8.6": "Italic (Romance) languages, n.i.e.",
    "3.6.1.2.2.8": "Japanese",
    "3.6.1.2.2.9.1": "Georgian",
    "3.6.1.2.2.10": "Korean",
    "3.6.1.2.2.11.1": "Mongolian",
    "3.6.1.2.2.12.1": "Akan (Twi)",
    "3.6.1.2.2.12.2": "Bamanankan",
    "3.6.1.2.2.12.3": "Edo",
    "3.6.1.2.2.12.4": "Ewe",
    "3.6.1.2.2.12.5": "Fulah (Pular, Pulaar, Fulfulde)",
    "3.6.1.2.2.12.6": "Ga",
    "3.6.1.2.2.12.7": "Ganda",
    "3.6.1.2.2.12.8": "Igbo",
    "3.6.1.2.2.12.9": "Lingala",
    "3.6.1.2.2.12.10": "Rundi (Kirundi)",
    "3.6.1.2.2.12.11": "Kinyarwanda (Rwanda)",
    "3.6.1.2.2.12.12": "Shona",
    "3.6.1.2.2.12.13": "Swahili",
    "3.6.1.2.2.12.14": "Wolof",
    "3.6.1.2.2.12.15": "Yoruba",
    "3.6.1.2.2.12.16": "Niger-Congo languages, n.i.e.",
    "3.6.1.2.2.13.1": "Dinka",
    "3.6.1.2.2.13.2": "Nilo-Saharan languages, n.i.e.",
    "3.6.1.2.2.14.1": "American Sign Language",
    "3.6.1.2.2.14.2": "Quebec Sign Language",
    "3.6.1.2.2.14.3": "Sign languages, n.i.e",
    "3.6.1.2.2.15.1.1": "Cantonese",
    "3.6.1.2.2.15.1.2": "Hakka",
    "3.6.1.2.2.15.1.3": "Mandarin",
    "3.6.1.2.2.15.1.4": "Min Dong",
    "3.6.1.2.2.15.1.5": "Min Nan (Chaochow, Teochow, Fukien, Taiwanese)",
    "3.6.1.2.2.15.1.6": "Wu (Shanghainese)",
    "3.6.1.2.2.15.1.7": "Chinese, n.o.s.",
    "3.6.1.2.2.15.1.8": "Chinese languages, n.i.e.",
    "3.6.1.2.2.15.2.1": "Burmese",
    "3.6.1.2.2.15.2.2": "Karenic languages",
    "3.6.1.2.2.15.2.3": "Tibetan",
    "3.6.1.2.2.15.2.4": "Tibeto-Burman languages, n.i.e.",
    "3.6.1.2.2.16.1": "Lao",
    "3.6.1.2.2.16.2": "Thai",
    "3.6.1.2.2.16.3": "Tai-Kadai languages, n.i.e",
    "3.6.1.2.2.17.1": "Azerbaijani",
    "3.6.1.2.2.17.2": "Turkish",
    "3.6.1.2.2.17.3": "Uyghur",
    "3.6.1.2.2.17.4": "Uzbek",
    "3.6.1.2.2.17.5": "Turkic languages, n.i.e.",
    "3.6.1.2.2.18.1": "Estonian",
    "3.6.1.2.2.18.2": "Finnish",
    "3.6.1.2.2.18.3": "Hungarian",
    "3.6.1.2.2.18.4": "Uralic languages, n.i.e.",
    "3.6.1.2.2.19": "Other languages, n.i.e.",
}

BC_ALBERS_SRID = 3005
WGS84_SRID = 4326
