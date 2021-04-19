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
    'first_responders', 'diagnostic_facilities', 'timber_facilities', 'civic_facilities',
    'hospitals', 'projects', 'servicebc_locations', 'schools', 'clinics', 'courts',
    'post_secondary_institutions', 'closed_mills', 'research_centres', 'airports'
]

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
    POWERBI_DET_DEMOGRAPHICS_DET, POWERBI_DET_DEMOGRAPHICS_CMP, POWERBI_DET_EDUCATION_CMP,
    POWERBI_DET_INCOME_DET, POWERBI_DET_INCOME_CMP, POWERBI_DET_HOUSING_DET, POWERBI_DET_HOUSING_CMP
]

POWERBI_HIDDEN_EXPLORE_PAGES = [POWERBI_AGG_DOMESTIC, POWERBI_AGG_EDUCATION, POWERBI_AGG_INCOME]

BC_ALBERS_SRID = 3005
WGS84_SRID = 4326
