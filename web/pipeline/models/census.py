from django.contrib.gis.db import models

from pipeline.utils import serialize_census_subdivision_groups


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
    # broad categories
    # "1.2.2.1", "  0 to 14 years"
    pop_pct_0_14 = models.FloatField(null=True)
    # "1.2.2.2", 1, "  15 to 64 years"
    pop_pct_14_65 = models.FloatField(null=True)
    # "1.2.2.3", 1, "  65 years and over"
    pop_pct_65 = models.FloatField(null=True)

    # fine grained categories
    # "1.2.1.1.1", "    0 to 4 years"
    pop_0_4 = models.IntegerField(null=True)
    # "1.2.1.1.2", "    5 to 9 years"
    pop_5_9 = models.IntegerField(null=True)
    # "1.2.1.1.3", "    10 to 14 years"
    pop_10_14 = models.IntegerField(null=True)
    # "1.2.1.2.1", "    15 to 19 years"
    pop_15_19 = models.IntegerField(null=True)
    # "1.2.1.2.2", "    20 to 24 years"
    pop_20_24 = models.IntegerField(null=True)
    # "1.2.1.2.3", "    25 to 29 years"
    pop_25_29 = models.IntegerField(null=True)
    # "1.2.1.2.4", "    30 to 34 years"
    pop_30_34 = models.IntegerField(null=True)
    # "1.2.1.2.5", "    35 to 39 years"
    pop_35_39 = models.IntegerField(null=True)
    # "1.2.1.2.6", "    40 to 44 years"
    pop_40_44 = models.IntegerField(null=True)
    # "1.2.1.2.7", "    45 to 49 years"
    pop_45_49 = models.IntegerField(null=True)
    # "1.2.1.2.8", "    50 to 54 years"
    pop_50_54 = models.IntegerField(null=True)
    # "1.2.1.2.9", "    55 to 59 years"
    pop_55_59 = models.IntegerField(null=True)
    # "1.2.1.2.10", "    60 to 64 years"
    pop_60_64 = models.IntegerField(null=True)
    # "1.2.1.3.1", "    65 to 69 years"
    pop_65_69 = models.IntegerField(null=True)
    # "1.2.1.3.2", "    70 to 74 years"
    pop_70_74 = models.IntegerField(null=True)
    # "1.2.1.3.3", "    75 to 79 years"
    pop_75_79 = models.IntegerField(null=True)
    # "1.2.1.3.4", "    80 to 84 years"
    pop_80_84 = models.IntegerField(null=True)
    # "1.2.1.3.5.1", "      85 to 89 years"
    pop_85_89 = models.IntegerField(null=True)
    # "1.2.1.3.5.2", "      90 to 94 years"
    pop_90_94 = models.IntegerField(null=True)
    # "1.2.1.3.5.3", "      95 to 99 years"
    pop_95_99 = models.IntegerField(null=True)
    # "1.2.1.3.5.4", "      100 years and over"
    pop_100 = models.IntegerField(null=True)

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
    # Total - Marital status for the population aged 15 years and over - 100% data
    # "2.2.1.1", 1, "  Married or living common law"
    married_or_common_law = models.IntegerField(null=True)
    # "2.3.4.2", 1, "  Couples with children"
    couples_with_children = models.IntegerField(null=True)
    # "2.3.5", 0, "Total - Lone-parent census families in private households - 100% data"
    single_parents = models.IntegerField(null=True)

    # 3.6.1 Total - Knowledge of languages for the population in private households - 25% sample data
    # "3.6.1.1.1", 2, "    English"
    eng_known = models.IntegerField(null=True)
    # "3.6.1.2", 1, "  Non-official languages"
    other_lang = models.IntegerField(null=True)
    # "3.6.1.2.1", 2, "    Aboriginal languages"
    aboriginal_lang = models.IntegerField(null=True)

    # 3.1.1 Total - Knowledge of official languages for the total population excluding institutional
    # residents - 100% data
    # "3.1.1.4", 1, "  Neither English nor French"
    eng_fr_not_known = models.IntegerField(null=True)

    # 3.4.1.1 Total - Language spoken most often at home for the total population excluding institutional
    # residents - 100% data, Single responses
    # three most common languages for census subdivision, ordered by frequency
    lang_1_name = models.CharField(null=True, max_length=255)
    lang_1_count = models.IntegerField(null=True)
    lang_2_name = models.CharField(null=True, max_length=255)
    lang_2_count = models.IntegerField(null=True)
    lang_3_name = models.CharField(null=True, max_length=255)
    lang_3_count = models.IntegerField(null=True)

    # Total - Income statistics in 2015 for the population aged 15 years and over in
    # private households - 100% dataCensus data footnote
    # "Income", 12002, "4.1.1.1.1", 2, "    Median total income in 2015 among recipients ($)"
    median_total_income = models.FloatField(null=True)

    # Total - Income statistics in 2015 for private households by household size - 100% data
    # "Income", 13001, "4.2.1.1", 1, "  Median total income of households in 2015 ($)",
    median_total_household_income = models.FloatField(null=True)
    # "Income", 13004, "4.2.1.2.1.1", 3, "      Median total income of one-person households in 2015 ($)",
    median_total_household_income_one_person = models.FloatField(null=True)
    # "Income", 13007, "4.2.1.2.2.1", 3, "      Median total income of two-or-more-person households in 2015 ($)",
    median_total_household_income_two_or_more_person = models.FloatField(null=True)

    # Total - Total income groups in 2015 for the population aged 15 years and over in private households - 100% data
    #  "Income", 12034, "4.1.5.3.1", 2, "    Under $10,000 (including loss)"
    total_income_under_10000 = models.IntegerField(null=True)
    #  "Income", 12035, "4.1.5.3.2", 2, "    $10,000 to $19,999"
    total_income_10000_to_19999 = models.IntegerField(null=True)
    #  "Income", 12036, "4.1.5.3.3", 2, "    $20,000 to $29,999"
    total_income_20000_to_29999 = models.IntegerField(null=True)
    #  "Income", 12037, "4.1.5.3.4", 2, "    $30,000 to $39,999"
    total_income_30000_to_39999 = models.IntegerField(null=True)
    #  "Income", 12038, "4.1.5.3.5", 2, "    $40,000 to $49,999"
    total_income_40000_to_49999 = models.IntegerField(null=True)
    #  "Income", 12039, "4.1.5.3.6", 2, "    $50,000 to $59,999"
    total_income_50000_to_59999 = models.IntegerField(null=True)
    #  "Income", 12040, "4.1.5.3.7", 2, "    $60,000 to $69,999"
    total_income_60000_to_69999 = models.IntegerField(null=True)
    #  "Income", 12041, "4.1.5.3.8", 2, "    $70,000 to $79,999"
    total_income_70000_to_79999 = models.IntegerField(null=True)
    #  "Income", 12042, "4.1.5.3.9", 2, "    $80,000 to $89,999"
    total_income_80000_to_89999 = models.IntegerField(null=True)
    #  "Income", 12043, "4.1.5.3.10", 2, "    $90,000 to $99,999"
    total_income_90000_to_99999 = models.IntegerField(null=True)
    #  "Income", 12045, "4.1.5.3.11.1", 3, "      $100,000 to $149,999"
    total_income_100000_to_149999 = models.IntegerField(null=True)
    #  "Income", 12046, "4.1.5.3.11.2", 3, "      $150,000 and over"
    total_income_150000_and_over = models.IntegerField(null=True)

    # "Income", 15000, "4.4.1", 0, "Total - Low-income status in 2015 for the population in private
    # households to whom low-income concepts are applicable - 100% data"
    # "Income", 15001, "4.4.1.1", 1, "  0 to 17 years"
    low_income_status_0_to_17 = models.IntegerField(null=True)
    # "Income", 15003, "4.4.1.2", 1, "  18 to 64 years"
    low_income_status_18_to_64 = models.IntegerField(null=True)
    # "Income", 15004, "4.4.1.3", 1, "  65 years and over"
    low_income_status_65_and_over = models.IntegerField(null=True)

    # "Immigration and citizenship", 18010, "5.2.1.3", 1, "  Non-permanent residents", 52, null, 30.0, null, 15.0, null, 15.0, null],
    non_pr = models.IntegerField(null=True)

    # "Visible minority", 25001, "7.1.1.1", 1, "  Total visible minority population", 96, null, 380.0, null, 205.0, null, 175.0, null],
    visible_minority = models.IntegerField(null=True)

    # Total - Private households by tenure - 25% sample data
    # "Housing", 27001, "9.1.1.1", 1, "  Owner"
    housing_owner = models.IntegerField(null=True)
    # "Housing", 27002, "9.1.1.2", 1, "  Renter"
    housing_renter = models.IntegerField(null=True)
    # "Housing", 27003, "9.1.1.3", 1, "  Band housing",
    housing_band_housing = models.IntegerField(null=True)

    # dwelling condition
    # "Housing", 27035, "9.1.9.1", 1, "  Only regular maintenance or minor repairs needed",
    housing_cond_regular_maintenance = models.IntegerField(null=True)
    # "Housing", 27036, "9.1.9.2", 1, "  Major repairs needed"
    housing_cond_major_repairs = models.IntegerField(null=True)

    # Total - Owner and tenant households with household total income greater than zero, in non-farm,
    # non-reserve private dwellings by shelter-cost-to-income ratio - 25% sample data
    # "Housing", 27051, "9.1.12.1", 1, "  Spending less than 30% of income on shelter costs",
    housing_cost_less_30_pct_income = models.IntegerField(null=True)
    # "Housing", 27052, "9.1.12.2", 1, "  Spending 30% or more of income on shelter costs"
    housing_cost_30_pct_more_income = models.IntegerField(null=True)

    # Total - Owner households in non-farm, non-reserve private dwellings - 25% sample data
    # "Housing", 27055, "9.1.13.1", 1, "  % of owner households with a mortgage", 142, null, 37.6
    households_owner_pct_mortgage = models.FloatField(null=True)
    # "Housing", 27056, "9.1.13.2", 1, "  % of owner households spending 30% or more of its income on shelter costs",
    households_owner_spending_30_pct_income = models.FloatField(null=True)
    # "Housing", 27057, "9.1.13.3", 1, "  Median monthly shelter costs for owned dwellings ($)",
    households_owner_median_monthly_shelter_costs = models.FloatField(null=True)
    # "Housing", 27058, "9.1.13.4", 1, "  Average monthly shelter costs for owned dwellings ($)",
    households_owner_avg_monthly_shelter_costs = models.FloatField(null=True)
    # "Housing", 27059, "9.1.13.5", 1, "  Median value of dwellings ($)",
    households_owner_median_dwelling_value = models.FloatField(null=True)
    # "Housing", 27060, "9.1.13.6", 1, "  Average value of dwellings ($)"
    households_owner_avg_dwelling_value = models.FloatField(null=True)

    # Total - Tenant households in non-farm, non-reserve private dwellings - 25% sample data
    # "Housing", 27062, "9.1.14.1", 1, "  % of tenant households in subsidized housing",
    households_tenant_pct_subsidized_housing = models.FloatField(null=True)
    # "Housing", 27063, "9.1.14.2", 1, "  % of tenant households spending 30% or more of its income on shelter costs",
    households_tenant_spending_30_pct_income = models.FloatField(null=True)
    # "Housing", 27064, "9.1.14.3", 1, "  Median monthly shelter costs for rented dwellings ($)",
    households_tenant_median_shelter_cost = models.FloatField(null=True)
    # "Housing", 27065, "9.1.14.4", 1, "  Average monthly shelter costs for rented dwellings ($)",
    households_tenant_avg_shelter_cost = models.FloatField(null=True)

    # "Families, households and marital status", 3017, "2.1.4", 0, "Average household size",
    avg_household_size = models.FloatField(null=True)

    # "Families, households and marital status", 3011, "2.1.2.1", 1, "  1 person",
    household_size_1 = models.IntegerField(null=True)
    # "Families, households and marital status", 3012, "2.1.2.2", 1, "  2 persons",
    household_size_2 = models.IntegerField(null=True)
    # "Families, households and marital status", 3013, "2.1.2.3", 1, "  3 persons",
    household_size_3 = models.IntegerField(null=True)
    # "Families, households and marital status", 3014, "2.1.2.4", 1, "  4 persons",
    household_size_4 = models.IntegerField(null=True)
    # "Families, households and marital status", 3015, "2.1.2.5", 1, "  5 or more persons",
    household_size_5_more = models.IntegerField(null=True)

    # "Education", 28002, "10.1.1.2", 1, "  Secondary (high) school diploma or equivalency certificate", 147, null, 1325.0, null, 595.0, null, 730.0, null],
    edu_1 = models.IntegerField(null=True)
    # "Education", 28003, "10.1.1.3", 1, "  Postsecondary certificate, diploma or degree"
    edu_2 = models.IntegerField(null=True)
    # "Education", 28004, "10.1.1.3.1", 2, "    Apprenticeship or trades certificate or diploma"
    edu_3 = models.IntegerField(null=True)
    # "Education", 28009, "10.1.1.3.4", 2, "    University certificate, diploma or degree at bachelor level or above"
    edu_4 = models.IntegerField(null=True)

    # field of study
    # "Education", 29001, "10.2.1.1", 1, "  No postsecondary certificate, diploma or degree",
    edu_field_no_post_secondary = models.IntegerField(null=True)
    # "Education", 29002, "10.2.1.2", 1, "  Education"
    edu_field_education = models.IntegerField(null=True)
    # "Education", 29004, "10.2.1.3", 1, "  Visual and performing arts, and communications technologies"
    edu_field_visual_arts_comms = models.IntegerField(null=True)
    # "Education", 29007, "10.2.1.4", 1, "  Humanities"
    edu_field_humanities = models.IntegerField(null=True)
    # "Education", 29016, "10.2.1.5", 1, "  Social and behavioural sciences and law"
    edu_field_social_sciences_law = models.IntegerField(null=True)
    # "Education", 29024, "10.2.1.6", 1, "  Business, management and public administration"
    edu_field_business = models.IntegerField(null=True)
    # "Education", 29028, "10.2.1.7", 1, "  Physical and life sciences and technologies"
    edu_field_physical_life_sciences = models.IntegerField(null=True)
    # "Education", 29034, "10.2.1.8", 1, "  Mathematics, computer and information sciences"
    edu_field_math_cs = models.IntegerField(null=True)
    # "Education", 29039, "10.2.1.9", 1, "  Architecture, engineering, and related technologies"
    edu_field_architecture_eng = models.IntegerField(null=True)
    # "Education", 29047, "10.2.1.10", 1, "  Agriculture, natural resources and conservation"
    edu_field_agriculture = models.IntegerField(null=True)
    # "Education", 29050, "10.2.1.11", 1, "  Health and related fields"
    edu_field_health = models.IntegerField(null=True)
    # "Education", 29054, "10.2.1.12", 1, "  Personal, protective and transportation services"
    edu_field_personal_protective_transportation = models.IntegerField(null=True)

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
