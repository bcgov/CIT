import bisect

from pipeline.constants import CENSUS_LANGUAGE_MAP


def import_census_population_data(stats, subdiv):
    # "1.1.2", "Population, 2016"
    subdiv.population = _fetch_statscan_value(stats, "1.1.2")
    # "1.1.3", "Population percentage change, 2011 to 2016"
    subdiv.popluation_percentage_change = _fetch_statscan_value(stats, "1.1.3")

    if subdiv.population and subdiv.popluation_percentage_change:
        subdiv.population_count_change = (subdiv.popluation_percentage_change / 100) * subdiv.population

    # "1.2.3", "Average age of the population"
    subdiv.population_avg_age = _fetch_statscan_value(stats, "1.2.3")

    # "1.1.6", 0, "Population density per square kilometre",
    subdiv.population_density_per_sq_km = _fetch_statscan_value(stats, "1.1.6")

    # "1.1.4", "Total private dwellings"
    subdiv.priv_dwel = _fetch_statscan_value(stats, "1.1.4")
    # "1.1.7",0,"Land area in square kilometres"
    subdiv.area = _fetch_statscan_value(stats, "1.1.7")

    # "1.2.2.1", "  0 to 14 years"
    subdiv.pop_pct_0_14 = _fetch_statscan_value(stats, "1.2.2.1")
    # 2029, "1.2.2.2", 1, "  15 to 64 years"
    subdiv.pop_pct_14_65 = _fetch_statscan_value(stats, "1.2.2.2")
    # 2030, "1.2.2.3", 1, "  65 years and over"
    subdiv.pop_pct_65 = _fetch_statscan_value(stats, "1.2.2.3")

    subdiv.pop_count_total = _fetch_statscan_value(stats, "1.2.1")
    if subdiv.pop_pct_0_14:
        subdiv.pop_count_0_14 = (subdiv.pop_pct_0_14 / 100) * subdiv.pop_count_total
    if subdiv.pop_pct_14_65:
        subdiv.pop_count_14_65 = (subdiv.pop_pct_14_65 / 100) * subdiv.pop_count_total
    if subdiv.pop_pct_65:
        subdiv.pop_count_65 = (subdiv.pop_pct_65 / 100) * subdiv.pop_count_total

    # "1.2.2.1", "  0 to 14 years" male
    subdiv.pop_pct_0_14_m = _fetch_statscan_value(stats, "1.2.2.1", gender="male")
    # 2029, "1.2.2.2", 1, "  15 to 64 years" male
    subdiv.pop_pct_14_65_m = _fetch_statscan_value(stats, "1.2.2.2", gender="male")
    # 2030, "1.2.2.3", 1, "  65 years and over" male
    subdiv.pop_pct_65_m = _fetch_statscan_value(stats, "1.2.2.3", gender="male")

    subdiv.pop_count_total_m = _fetch_statscan_value(stats, "1.2.1", gender="male")
    if subdiv.pop_pct_0_14:
        subdiv.pop_count_0_14_m = (subdiv.pop_pct_0_14_m / 100) * subdiv.pop_count_total_m
    if subdiv.pop_pct_14_65:
        subdiv.pop_count_14_65_m = (subdiv.pop_pct_14_65_m / 100) * subdiv.pop_count_total_m
    if subdiv.pop_pct_65:
        subdiv.pop_count_65_m = (subdiv.pop_pct_65_m / 100) * subdiv.pop_count_total_m

    # "1.2.2.1", "  0 to 14 years" female
    subdiv.pop_pct_0_14_f = _fetch_statscan_value(stats, "1.2.2.1", gender="female")
    # 2029, "1.2.2.2", 1, "  15 to 64 years" female
    subdiv.pop_pct_14_65_f = _fetch_statscan_value(stats, "1.2.2.2", gender="female")
    # 2030, "1.2.2.3", 1, "  65 years and over" female
    subdiv.pop_pct_65_f = _fetch_statscan_value(stats, "1.2.2.3", gender="female")

    subdiv.pop_count_total_f = _fetch_statscan_value(stats, "1.2.1", gender="female")
    if subdiv.pop_pct_0_14:
        subdiv.pop_count_0_14_f = (subdiv.pop_pct_0_14_f / 100) * subdiv.pop_count_total_f
    if subdiv.pop_pct_14_65:
        subdiv.pop_count_14_65_f = (subdiv.pop_pct_14_65_f / 100) * subdiv.pop_count_total_f
    if subdiv.pop_pct_65:
        subdiv.pop_count_65_f = (subdiv.pop_pct_65_f / 100) * subdiv.pop_count_total_f

    # "1.2.1.1.1", "    0 to 4 years"
    subdiv.pop_0_4 = _fetch_statscan_value(stats, "1.2.1.1.1")
    # "1.2.1.1.2", "    5 to 9 years"
    subdiv.pop_5_9 = _fetch_statscan_value(stats, "1.2.1.1.2")
    # "1.2.1.1.3", "    10 to 14 years"
    subdiv.pop_10_14 = _fetch_statscan_value(stats, "1.2.1.1.3")
    # "1.2.1.2.1", "    15 to 19 years"
    subdiv.pop_15_19 = _fetch_statscan_value(stats, "1.2.1.2.1")
    # "1.2.1.2.2", "    20 to 24 years"
    subdiv.pop_20_24 = _fetch_statscan_value(stats, "1.2.1.2.2")
    # "1.2.1.2.3", "    25 to 29 years"
    subdiv.pop_25_29 = _fetch_statscan_value(stats, "1.2.1.2.3")
    # "1.2.1.2.4", "    30 to 34 years"
    subdiv.pop_30_34 = _fetch_statscan_value(stats, "1.2.1.2.4")
    # "1.2.1.2.5", "    35 to 39 years"
    subdiv.pop_35_39 = _fetch_statscan_value(stats, "1.2.1.2.5")
    # "1.2.1.2.6", "    40 to 44 years"
    subdiv.pop_40_44 = _fetch_statscan_value(stats, "1.2.1.2.6")
    # "1.2.1.2.7", "    45 to 49 years"
    subdiv.pop_45_49 = _fetch_statscan_value(stats, "1.2.1.2.7")
    # "1.2.1.2.8", "    50 to 54 years"
    subdiv.pop_50_54 = _fetch_statscan_value(stats, "1.2.1.2.8")
    # "1.2.1.2.9", "    55 to 59 years"
    subdiv.pop_55_59 = _fetch_statscan_value(stats, "1.2.1.2.9")
    # "1.2.1.2.10", "    60 to 64 years"
    subdiv.pop_60_64 = _fetch_statscan_value(stats, "1.2.1.2.10")
    # "1.2.1.3.1", "    65 to 69 years"
    subdiv.pop_65_69 = _fetch_statscan_value(stats, "1.2.1.3.1")
    # "1.2.1.3.2", "    70 to 74 years"
    subdiv.pop_70_74 = _fetch_statscan_value(stats, "1.2.1.3.2")
    # "1.2.1.3.3", "    75 to 79 years"
    subdiv.pop_75_79 = _fetch_statscan_value(stats, "1.2.1.3.3")
    # "1.2.1.3.4", "    80 to 84 years"
    subdiv.pop_80_84 = _fetch_statscan_value(stats, "1.2.1.3.4")
    # "1.2.1.3.5.1", "      85 to 89 years"
    subdiv.pop_85_89 = _fetch_statscan_value(stats, "1.2.1.3.5.1")
    # "1.2.1.3.5.2", "      90 to 94 years"
    subdiv.pop_90_94 = _fetch_statscan_value(stats, "1.2.1.3.5.2")
    # "1.2.1.3.5.3", "      95 to 99 years"
    subdiv.pop_95_99 = _fetch_statscan_value(stats, "1.2.1.3.5.3")
    # "1.2.1.3.5.4", "      100 years and over"
    subdiv.pop_100 = _fetch_statscan_value(stats, "1.2.1.3.5.4")

    # "1.2.1.1.1", "    0 to 4 years" male
    subdiv.pop_0_4_m = _fetch_statscan_value(stats, "1.2.1.1.1", gender="male")
    # "1.2.1.1.2", "    5 to 9 years" male
    subdiv.pop_5_9_m = _fetch_statscan_value(stats, "1.2.1.1.2", gender="male")
    # "1.2.1.1.3", "    10 to 14 years" male
    subdiv.pop_10_14_m = _fetch_statscan_value(stats, "1.2.1.1.3", gender="male")
    # "1.2.1.2.1", "    15 to 19 years" male
    subdiv.pop_15_19_m = _fetch_statscan_value(stats, "1.2.1.2.1", gender="male")
    # "1.2.1.2.2", "    20 to 24 years" male
    subdiv.pop_20_24_m = _fetch_statscan_value(stats, "1.2.1.2.2", gender="male")
    # "1.2.1.2.3", "    25 to 29 years" male
    subdiv.pop_25_29_m = _fetch_statscan_value(stats, "1.2.1.2.3", gender="male")
    # "1.2.1.2.4", "    30 to 34 years" male
    subdiv.pop_30_34_m = _fetch_statscan_value(stats, "1.2.1.2.4", gender="male")
    # "1.2.1.2.5", "    35 to 39 years" male
    subdiv.pop_35_39_m = _fetch_statscan_value(stats, "1.2.1.2.5", gender="male")
    # "1.2.1.2.6", "    40 to 44 years" male
    subdiv.pop_40_44_m = _fetch_statscan_value(stats, "1.2.1.2.6", gender="male")
    # "1.2.1.2.7", "    45 to 49 years" male
    subdiv.pop_45_49_m = _fetch_statscan_value(stats, "1.2.1.2.7", gender="male")
    # "1.2.1.2.8", "    50 to 54 years" male
    subdiv.pop_50_54_m = _fetch_statscan_value(stats, "1.2.1.2.8", gender="male")
    # "1.2.1.2.9", "    55 to 59 years" male
    subdiv.pop_55_59_m = _fetch_statscan_value(stats, "1.2.1.2.9", gender="male")
    # "1.2.1.2.10", "    60 to 64 years" male
    subdiv.pop_60_64_m = _fetch_statscan_value(stats, "1.2.1.2.10", gender="male")
    # "1.2.1.3.1", "    65 to 69 years" male
    subdiv.pop_65_69_m = _fetch_statscan_value(stats, "1.2.1.3.1", gender="male")
    # "1.2.1.3.2", "    70 to 74 years" male
    subdiv.pop_70_74_m = _fetch_statscan_value(stats, "1.2.1.3.2", gender="male")
    # "1.2.1.3.3", "    75 to 79 years" male
    subdiv.pop_75_79_m = _fetch_statscan_value(stats, "1.2.1.3.3", gender="male")
    # "1.2.1.3.4", "    80 to 84 years" male
    subdiv.pop_80_84_m = _fetch_statscan_value(stats, "1.2.1.3.4", gender="male")
    # "1.2.1.3.5.1", "      85 to 89 years" male
    subdiv.pop_85_89_m = _fetch_statscan_value(stats, "1.2.1.3.5.1", gender="male")
    # "1.2.1.3.5.2", "      90 to 94 years" male
    subdiv.pop_90_94_m = _fetch_statscan_value(stats, "1.2.1.3.5.2", gender="male")
    # "1.2.1.3.5.3", "      95 to 99 years" male
    subdiv.pop_95_99_m = _fetch_statscan_value(stats, "1.2.1.3.5.3", gender="male")
    # "1.2.1.3.5.4", "      100 years and over" male
    subdiv.pop_100_m = _fetch_statscan_value(stats, "1.2.1.3.5.4", gender="male")

    # "1.2.1.1.1", "    0 to 4 years" female
    subdiv.pop_0_4_f = _fetch_statscan_value(stats, "1.2.1.1.1", gender="female")
    # "1.2.1.1.2", "    5 to 9 years" female
    subdiv.pop_5_9_f = _fetch_statscan_value(stats, "1.2.1.1.2", gender="female")
    # "1.2.1.1.3", "    10 to 14 years" female
    subdiv.pop_10_14_f = _fetch_statscan_value(stats, "1.2.1.1.3", gender="female")
    # "1.2.1.2.1", "    15 to 19 years" female
    subdiv.pop_15_19_f = _fetch_statscan_value(stats, "1.2.1.2.1", gender="female")
    # "1.2.1.2.2", "    20 to 24 years" female
    subdiv.pop_20_24_f = _fetch_statscan_value(stats, "1.2.1.2.2", gender="female")
    # "1.2.1.2.3", "    25 to 29 years" female
    subdiv.pop_25_29_f = _fetch_statscan_value(stats, "1.2.1.2.3", gender="female")
    # "1.2.1.2.4", "    30 to 34 years" female
    subdiv.pop_30_34_f = _fetch_statscan_value(stats, "1.2.1.2.4", gender="female")
    # "1.2.1.2.5", "    35 to 39 years" female
    subdiv.pop_35_39_f = _fetch_statscan_value(stats, "1.2.1.2.5", gender="female")
    # "1.2.1.2.6", "    40 to 44 years" female
    subdiv.pop_40_44_f = _fetch_statscan_value(stats, "1.2.1.2.6", gender="female")
    # "1.2.1.2.7", "    45 to 49 years" female
    subdiv.pop_45_49_f = _fetch_statscan_value(stats, "1.2.1.2.7", gender="female")
    # "1.2.1.2.8", "    50 to 54 years" female
    subdiv.pop_50_54_f = _fetch_statscan_value(stats, "1.2.1.2.8", gender="female")
    # "1.2.1.2.9", "    55 to 59 years" female
    subdiv.pop_55_59_f = _fetch_statscan_value(stats, "1.2.1.2.9", gender="female")
    # "1.2.1.2.10", "    60 to 64 years" female
    subdiv.pop_60_64_f = _fetch_statscan_value(stats, "1.2.1.2.10", gender="female")
    # "1.2.1.3.1", "    65 to 69 years" female
    subdiv.pop_65_69_f = _fetch_statscan_value(stats, "1.2.1.3.1", gender="female")
    # "1.2.1.3.2", "    70 to 74 years" female
    subdiv.pop_70_74_f = _fetch_statscan_value(stats, "1.2.1.3.2", gender="female")
    # "1.2.1.3.3", "    75 to 79 years" female
    subdiv.pop_75_79_f = _fetch_statscan_value(stats, "1.2.1.3.3", gender="female")
    # "1.2.1.3.4", "    80 to 84 years" female
    subdiv.pop_80_84_f = _fetch_statscan_value(stats, "1.2.1.3.4", gender="female")
    # "1.2.1.3.5.1", "      85 to 89 years" female
    subdiv.pop_85_89_f = _fetch_statscan_value(stats, "1.2.1.3.5.1", gender="female")
    # "1.2.1.3.5.2", "      90 to 94 years" female
    subdiv.pop_90_94_f = _fetch_statscan_value(stats, "1.2.1.3.5.2", gender="female")
    # "1.2.1.3.5.3", "      95 to 99 years" female
    subdiv.pop_95_99_f = _fetch_statscan_value(stats, "1.2.1.3.5.3", gender="female")
    # "1.2.1.3.5.4", "      100 years and over" female
    subdiv.pop_100_f = _fetch_statscan_value(stats, "1.2.1.3.5.4", gender="female")

    # "Immigration and citizenship", 18000, "5.2.1", 0, "Total - Immigrant status and period of immigration for the population in private households - 25% sample data",
    subdiv.immigration_population_total = _fetch_statscan_value(stats, "5.2.1")

    # "Immigration and citizenship", 18010, "5.2.1.3", 1, "  Non-permanent residents"
    subdiv.non_pr = _fetch_statscan_value(stats, "5.2.1.3")

    # "Visible minority", 25001, "7.1.1.1", 1, "  Total visible minority population"
    subdiv.visible_minority = _fetch_statscan_value(stats, "7.1.1.1")


def import_census_languages_data(stats, subdiv):
    # "3.6.1.1.1", 2, "    English"
    subdiv.eng_known = _fetch_statscan_value(stats, "3.6.1.1.1")
    # "3.6.1.1.2", 2, "    French"
    subdiv.fr_known = _fetch_statscan_value(stats, "3.6.1.1.2")
    # "3.6.1.2", 1, "  Non-official languages"
    subdiv.other_lang = _fetch_statscan_value(stats, "3.6.1.2")
    # "3.6.1.2.1", 2, "    Aboriginal languages"
    subdiv.aboriginal_lang = _fetch_statscan_value(stats, "3.6.1.2.1")

    # "3.1.1.1", 1, "  English only"
    subdiv.official_lang_eng = _fetch_statscan_value(stats, "3.1.1.1")
    # "3.1.1.2", 1, "  French only"
    subdiv.official_lang_fr = _fetch_statscan_value(stats, "3.1.1.2")
    # "3.1.1.3", 1, "  English and French"
    subdiv.official_lang_both_eng_fr = _fetch_statscan_value(stats, "3.1.1.3")
    # "3.1.1.4", 1, "  Neither English nor French"
    subdiv.official_lang_neither_eng_fr = _fetch_statscan_value(stats, "3.1.1.4")

    _import_three_most_common_languages(stats, subdiv)


def import_census_income_data(stats, subdiv):
    # "4.1.1.1.1", 2, "    Median total income in 2015 among recipients ($)"
    subdiv.median_total_income = _fetch_statscan_value(stats, "4.1.1.1.1")
    subdiv.median_total_income_m = _fetch_statscan_value(stats, "4.1.1.1.1", gender="male")
    subdiv.median_total_income_f = _fetch_statscan_value(stats, "4.1.1.1.1", gender="female")

    # Total - Income statistics in 2015 for private households by household size - 100% data
    # "Income", 13001, "4.2.1.1", 1, "  Median total income of households in 2015 ($)",
    subdiv.median_total_household_income = _fetch_statscan_value(stats, "4.2.1.1")
    # "Income", 13004, "4.2.1.2.1.1", 3, "      Median total income of one-person households in 2015 ($)",
    subdiv.median_total_household_income_one_person = _fetch_statscan_value(stats, "4.2.1.2.1.1")
    # "Income", 13007, "4.2.1.2.2.1", 3, "      Median total income of two-or-more-person households in 2015 ($)",
    subdiv.median_total_household_income_two_or_more_person = _fetch_statscan_value(stats, "4.2.1.2.2.1")

    # Total - Total income groups in 2015 for the population aged 15 years and over in private households - 100% data
    #  "Income", 12034, "4.1.5.3.1", 2, "    Under $10,000 (including loss)"
    subdiv.total_income_under_10000 = _fetch_statscan_value(stats, "4.1.5.3.1")
    #  "Income", 12035, "4.1.5.3.2", 2, "    $10,000 to $19,999"
    subdiv.total_income_10000_to_19999 = _fetch_statscan_value(stats, "4.1.5.3.2")
    #  "Income", 12036, "4.1.5.3.3", 2, "    $20,000 to $29,999"
    subdiv.total_income_20000_to_29999 = _fetch_statscan_value(stats, "4.1.5.3.3")
    #  "Income", 12037, "4.1.5.3.4", 2, "    $30,000 to $39,999"
    subdiv.total_income_30000_to_39999 = _fetch_statscan_value(stats, "4.1.5.3.4")
    #  "Income", 12038, "4.1.5.3.5", 2, "    $40,000 to $49,999"
    subdiv.total_income_40000_to_49999 = _fetch_statscan_value(stats, "4.1.5.3.5")
    #  "Income", 12039, "4.1.5.3.6", 2, "    $50,000 to $59,999"
    subdiv.total_income_50000_to_59999 = _fetch_statscan_value(stats, "4.1.5.3.6")
    #  "Income", 12040, "4.1.5.3.7", 2, "    $60,000 to $69,999"
    subdiv.total_income_60000_to_69999 = _fetch_statscan_value(stats, "4.1.5.3.7")
    #  "Income", 12041, "4.1.5.3.8", 2, "    $70,000 to $79,999"
    subdiv.total_income_70000_to_79999 = _fetch_statscan_value(stats, "4.1.5.3.8")
    #  "Income", 12042, "4.1.5.3.9", 2, "    $80,000 to $89,999"
    subdiv.total_income_80000_to_89999 = _fetch_statscan_value(stats, "4.1.5.3.9")
    #  "Income", 12043, "4.1.5.3.10", 2, "    $90,000 to $99,999"
    subdiv.total_income_90000_to_99999 = _fetch_statscan_value(stats, "4.1.5.3.10")
    #  "Income", 12045, "4.1.5.3.11.1", 3, "      $100,000 to $149,999"
    subdiv.total_income_100000_to_149999 = _fetch_statscan_value(stats, "4.1.5.3.11.1")
    #  "Income", 12046, "4.1.5.3.11.2", 3, "      $150,000 and over"
    subdiv.total_income_150000_and_over = _fetch_statscan_value(stats, "4.1.5.3.11.2")

    #  "Income", 12034, "4.1.5.3.1", 2, "    Under $10,000 (including loss)" male
    subdiv.total_income_under_10000_m = _fetch_statscan_value(stats, "4.1.5.3.1", gender="male")
    #  "Income", 12035, "4.1.5.3.2", 2, "    $10,000 to $19,999" male
    subdiv.total_income_10000_to_19999_m = _fetch_statscan_value(stats, "4.1.5.3.2", gender="male")
    #  "Income", 12036, "4.1.5.3.3", 2, "    $20,000 to $29,999" male
    subdiv.total_income_20000_to_29999_m = _fetch_statscan_value(stats, "4.1.5.3.3", gender="male")
    #  "Income", 12037, "4.1.5.3.4", 2, "    $30,000 to $39,999" male
    subdiv.total_income_30000_to_39999_m = _fetch_statscan_value(stats, "4.1.5.3.4", gender="male")
    #  "Income", 12038, "4.1.5.3.5", 2, "    $40,000 to $49,999" male
    subdiv.total_income_40000_to_49999_m = _fetch_statscan_value(stats, "4.1.5.3.5", gender="male")
    #  "Income", 12039, "4.1.5.3.6", 2, "    $50,000 to $59,999" male
    subdiv.total_income_50000_to_59999_m = _fetch_statscan_value(stats, "4.1.5.3.6", gender="male")
    #  "Income", 12040, "4.1.5.3.7", 2, "    $60,000 to $69,999" male
    subdiv.total_income_60000_to_69999_m = _fetch_statscan_value(stats, "4.1.5.3.7", gender="male")
    #  "Income", 12041, "4.1.5.3.8", 2, "    $70,000 to $79,999" male
    subdiv.total_income_70000_to_79999_m = _fetch_statscan_value(stats, "4.1.5.3.8", gender="male")
    #  "Income", 12042, "4.1.5.3.9", 2, "    $80,000 to $89,999" male
    subdiv.total_income_80000_to_89999_m = _fetch_statscan_value(stats, "4.1.5.3.9", gender="male")
    #  "Income", 12043, "4.1.5.3.10", 2, "    $90,000 to $99,999" male
    subdiv.total_income_90000_to_99999_m = _fetch_statscan_value(stats, "4.1.5.3.10", gender="male")
    #  "Income", 12045, "4.1.5.3.11.1", 3, "      $100,000 to $149,999" male
    subdiv.total_income_100000_to_149999_m = _fetch_statscan_value(stats, "4.1.5.3.11.1", gender=" male")
    #  "Income", 12046, "4.1.5.3.11.2", 3, "      $150,000 and over" male
    subdiv.total_income_150000_and_over_m = _fetch_statscan_value(stats, "4.1.5.3.11.2", gender=" male")

    #  "Income", 12034, "4.1.5.3.1", 2, "    Under $10,000 (including loss)" female
    subdiv.total_income_under_10000_f = _fetch_statscan_value(stats, "4.1.5.3.1", gender="female")
    #  "Income", 12035, "4.1.5.3.2", 2, "    $10,000 to $19,999" female
    subdiv.total_income_10000_to_19999_f = _fetch_statscan_value(stats, "4.1.5.3.2", gender="female")
    #  "Income", 12036, "4.1.5.3.3", 2, "    $20,000 to $29,999" female
    subdiv.total_income_20000_to_29999_f = _fetch_statscan_value(stats, "4.1.5.3.3", gender="female")
    #  "Income", 12037, "4.1.5.3.4", 2, "    $30,000 to $39,999" female
    subdiv.total_income_30000_to_39999_f = _fetch_statscan_value(stats, "4.1.5.3.4", gender="female")
    #  "Income", 12038, "4.1.5.3.5", 2, "    $40,000 to $49,999" female
    subdiv.total_income_40000_to_49999_f = _fetch_statscan_value(stats, "4.1.5.3.5", gender="female")
    #  "Income", 12039, "4.1.5.3.6", 2, "    $50,000 to $59,999" female
    subdiv.total_income_50000_to_59999_f = _fetch_statscan_value(stats, "4.1.5.3.6", gender="female")
    #  "Income", 12040, "4.1.5.3.7", 2, "    $60,000 to $69,999" female
    subdiv.total_income_60000_to_69999_f = _fetch_statscan_value(stats, "4.1.5.3.7", gender="female")
    #  "Income", 12041, "4.1.5.3.8", 2, "    $70,000 to $79,999" female
    subdiv.total_income_70000_to_79999_f = _fetch_statscan_value(stats, "4.1.5.3.8", gender="female")
    #  "Income", 12042, "4.1.5.3.9", 2, "    $80,000 to $89,999" female
    subdiv.total_income_80000_to_89999_f = _fetch_statscan_value(stats, "4.1.5.3.9", gender="female")
    #  "Income", 12043, "4.1.5.3.10", 2, "    $90,000 to $99,999" female
    subdiv.total_income_90000_to_99999_f = _fetch_statscan_value(stats, "4.1.5.3.10", gender="female")
    #  "Income", 12045, "4.1.5.3.11.1", 3, "      $100,000 to $149,999" female
    subdiv.total_income_100000_to_149999_f = _fetch_statscan_value(stats, "4.1.5.3.11.1", gender="female")
    #  "Income", 12046, "4.1.5.3.11.2", 3, "      $150,000 and over" female
    subdiv.total_income_150000_and_over_f = _fetch_statscan_value(stats, "4.1.5.3.11.2", gender="female")

    # "Income", 15000, "4.4.1", 0, "Total - Low-income status in 2015 for the population in private
    # households to whom low-income concepts are applicable - 100% data"
    # "Income", 15001, "4.4.1.1", 1, "  0 to 17 years"
    subdiv.low_income_status_0_to_17 = _fetch_statscan_value(stats, "4.4.1.1")
    # "Income", 15003, "4.4.1.2", 1, "  18 to 64 years"
    subdiv.low_income_status_18_to_64 = _fetch_statscan_value(stats, "4.4.1.2")
    # "Income", 15004, "4.4.1.3", 1, "  65 years and over"
    subdiv.low_income_status_65_and_over = _fetch_statscan_value(stats, "4.4.1.3")

    # "Income", 15001, "4.4.1.1", 1, "  0 to 17 years" male
    subdiv.low_income_status_0_to_17_m = _fetch_statscan_value(stats, "4.4.1.1", gender="male")
    # "Income", 15003, "4.4.1.2", 1, "  18 to 64 years" male
    subdiv.low_income_status_18_to_64_m = _fetch_statscan_value(stats, "4.4.1.2", gender="male")
    # "Income", 15004, "4.4.1.3", 1, "  65 years and over" male
    subdiv.low_income_status_65_and_over_m = _fetch_statscan_value(stats, "4.4.1.3", gender="male")

    # "Income", 15001, "4.4.1.1", 1, "  0 to 17 years" female
    subdiv.low_income_status_0_to_17_f = _fetch_statscan_value(stats, "4.4.1.1", gender="female")
    # "Income", 15003, "4.4.1.2", 1, "  18 to 64 years" female
    subdiv.low_income_status_18_to_64_f = _fetch_statscan_value(stats, "4.4.1.2", gender="female")
    # "Income", 15004, "4.4.1.3", 1, "  65 years and over" female
    subdiv.low_income_status_65_and_over_f = _fetch_statscan_value(stats, "4.4.1.3", gender="female")


def import_census_housing_data(stats, subdiv):
    # types of occupied dwellings
    # "2.1.1.1", 1, "  Single-detached house"
    subdiv.detached_houses = _fetch_statscan_value(stats, "2.1.1.1")
    # "2.1.1.2", 1, "  Apartment in a building that has five or more storeys"
    subdiv.apartments = _fetch_statscan_value(stats, "2.1.1.2")
    # "2.1.1.3", 1, "  Other attached dwelling", 6, null, 0.0
    subdiv.other_attached_dwellings = _fetch_statscan_value(stats, "2.1.1.3")
    # "2.1.1.4", 1, "  Movable dwelling", 7, null, 0.0
    subdiv.movable_dwellings = _fetch_statscan_value(stats, "2.1.1.4")

    # "Housing", 27001, "9.1.1.1", 1, "  Owner"
    subdiv.housing_owner = _fetch_statscan_value(stats, "9.1.1.1")
    # "Housing", 27002, "9.1.1.2", 1, "  Renter"
    subdiv.housing_renter = _fetch_statscan_value(stats, "9.1.1.2")
    # "Housing", 27003, "9.1.1.3", 1, "  Band housing",
    subdiv.housing_band_housing = _fetch_statscan_value(stats, "9.1.1.3")

    # dwelling condition
    # "Housing", 27034, "9.1.9", 0, "Total - Occupied private dwellings by dwelling condition - 25% sample data",
    subdiv.housing_cond_total_private_dwellings = _fetch_statscan_value(stats, "9.1.9")
    # "Housing", 27035, "9.1.9.1", 1, "  Only regular maintenance or minor repairs needed",
    subdiv.housing_cond_regular_maintenance = _fetch_statscan_value(stats, "9.1.9.1")
    # "Housing", 27036, "9.1.9.2", 1, "  Major repairs needed"
    subdiv.housing_cond_major_repairs = _fetch_statscan_value(stats, "9.1.9.2")

    # Total - Owner and tenant households with household total income greater than zero, in non-farm,
    # non-reserve private dwellings by shelter-cost-to-income ratio - 25% sample data
    # "Housing", 27051, "9.1.12.1", 1, "  Spending less than 30% of income on shelter costs",
    subdiv.housing_cost_less_30_pct_income = _fetch_statscan_value(stats, "9.1.12.1")
    # "Housing", 27052, "9.1.12.2", 1, "  Spending 30% or more of income on shelter costs"
    subdiv.housing_cost_30_pct_more_income = _fetch_statscan_value(stats, "9.1.12.2")

    # Total - Owner households in non-farm, non-reserve private dwellings - 25% sample data
    # "Housing", 27055, "9.1.13.1", 1, "  % of owner households with a mortgage", 142, null, 37.6
    subdiv.households_owner_pct_mortgage = _fetch_statscan_value(stats, "9.1.13.1")
    # "Housing", 27056, "9.1.13.2", 1, "  % of owner households spending 30% or more of its income on shelter costs",
    subdiv.households_owner_pct_spending_30_pct_income = _fetch_statscan_value(stats, "9.1.13.2")

    subdiv.households_owner_count_total = _fetch_statscan_value(stats, "9.1.13")
    if subdiv.households_owner_pct_mortgage:
        subdiv.households_owner_count_mortgage = (
            subdiv.households_owner_pct_mortgage / 100) * subdiv.households_owner_count_total
    if subdiv.households_owner_pct_spending_30_pct_income:
        subdiv.households_owner_count_spending_30_pct_income = (
            subdiv.households_owner_pct_spending_30_pct_income / 100) * subdiv.households_owner_count_total

    # "Housing", 27057, "9.1.13.3", 1, "  Median monthly shelter costs for owned dwellings ($)",
    subdiv.households_owner_median_monthly_shelter_costs = _fetch_statscan_value(stats, "9.1.13.3")
    # "Housing", 27058, "9.1.13.4", 1, "  Average monthly shelter costs for owned dwellings ($)",
    subdiv.households_owner_avg_monthly_shelter_costs = _fetch_statscan_value(stats, "9.1.13.4")
    # "Housing", 27059, "9.1.13.5", 1, "  Median value of dwellings ($)",
    subdiv.households_owner_median_dwelling_value = _fetch_statscan_value(stats, "9.1.13.5")
    # "Housing", 27060, "9.1.13.6", 1, "  Average value of dwellings ($)"
    subdiv.households_owner_avg_dwelling_value = _fetch_statscan_value(stats, "9.1.13.6")

    # Total - Tenant households in non-farm, non-reserve private dwellings - 25% sample data
    # "Housing", 27062, "9.1.14.1", 1, "  % of tenant households in subsidized housing",
    subdiv.households_tenant_pct_subsidized_housing = _fetch_statscan_value(stats, "9.1.14.1")
    # "Housing", 27063, "9.1.14.2", 1, "  % of tenant households spending 30% or more of its income on shelter costs",
    subdiv.households_tenant_pct_spending_30_pct_income = _fetch_statscan_value(stats, "9.1.14.2")

    subdiv.households_tenant_count_total = _fetch_statscan_value(stats, "9.1.14")
    if subdiv.households_tenant_pct_subsidized_housing:
        subdiv.households_tenant_count_subsidized_housing = (
            subdiv.households_tenant_pct_subsidized_housing / 100) * subdiv.households_tenant_count_total
    if subdiv.households_tenant_pct_spending_30_pct_income:
        subdiv.households_tenant_count_spending_30_pct_income = (
            subdiv.households_tenant_pct_spending_30_pct_income / 100) * subdiv.households_tenant_count_total

    # "Housing", 27064, "9.1.14.3", 1, "  Median monthly shelter costs for rented dwellings ($)",
    subdiv.households_tenant_median_shelter_cost = _fetch_statscan_value(stats, "9.1.14.3")
    # "Housing", 27065, "9.1.14.4", 1, "  Average monthly shelter costs for rented dwellings ($)",
    subdiv.households_tenant_avg_shelter_cost = _fetch_statscan_value(stats, "9.1.14.4")


def import_census_education_employment_data(stats, subdiv):
    # "Education", 28002, "10.1.1.2", 1, "  Secondary (high) school diploma or equivalency certificate"
    subdiv.edu_1 = _fetch_statscan_value(stats, "10.1.1.2")
    # "Education", 28003, "10.1.1.3", 1, "  Postsecondary certificate, diploma or degree"
    subdiv.edu_2 = _fetch_statscan_value(stats, "10.1.1.3")
    # "Education", 28004, "10.1.1.3.1", 2, "    Apprenticeship or trades certificate or diploma"
    subdiv.edu_3 = _fetch_statscan_value(stats, "10.1.1.3.1")
    # "Education", 28009, "10.1.1.3.4", 2, "    University certificate, diploma or degree at bachelor level or above"
    subdiv.edu_4 = _fetch_statscan_value(stats, "10.1.1.3.4")

    # "Education", 29000, "10.2.1", 0, "Total - Major field of study - Classification of Instructional Programs (CIP) 2016 for the population aged 15 years and over in private households - 25% sample data",
    subdiv.edu_field_total = _fetch_statscan_value(stats, "10.2.1")
    # "Education", 29001, "10.2.1.1", 1, "  No postsecondary certificate, diploma or degree",
    subdiv.edu_field_no_post_secondary = _fetch_statscan_value(stats, "10.2.1.1")
    # "Education", 29002, "10.2.1.2", 1, "  Education"
    subdiv.edu_field_education = _fetch_statscan_value(stats, "10.2.1.2")
    # "Education", 29004, "10.2.1.3", 1, "  Visual and performing arts, and communications technologies"
    subdiv.edu_field_visual_arts_comms = _fetch_statscan_value(stats, "10.2.1.3")
    # "Education", 29007, "10.2.1.4", 1, "  Humanities"
    subdiv.edu_field_humanities = _fetch_statscan_value(stats, "10.2.1.4")
    # "Education", 29016, "10.2.1.5", 1, "  Social and behavioural sciences and law"
    subdiv.edu_field_social_sciences_law = _fetch_statscan_value(stats, "10.2.1.5")
    # "Education", 29024, "10.2.1.6", 1, "  Business, management and public administration"
    subdiv.edu_field_business = _fetch_statscan_value(stats, "10.2.1.6")
    # "Education", 29028, "10.2.1.7", 1, "  Physical and life sciences and technologies"
    subdiv.edu_field_physical_life_sciences = _fetch_statscan_value(stats, "10.2.1.7")
    # "Education", 29034, "10.2.1.8", 1, "  Mathematics, computer and information sciences"
    subdiv.edu_field_math_cs = _fetch_statscan_value(stats, "10.2.1.8")
    # "Education", 29039, "10.2.1.9", 1, "  Architecture, engineering, and related technologies"
    subdiv.edu_field_architecture_eng = _fetch_statscan_value(stats, "10.2.1.9")
    # "Education", 29047, "10.2.1.10", 1, "  Agriculture, natural resources and conservation"
    subdiv.edu_field_agriculture = _fetch_statscan_value(stats, "10.2.1.10")
    # "Education", 29050, "10.2.1.11", 1, "  Health and related fields"
    subdiv.edu_field_health = _fetch_statscan_value(stats, "10.2.1.11")
    # "Education", 29054, "10.2.1.12", 1, "  Personal, protective and transportation services"
    subdiv.edu_field_personal_protective_transportation = _fetch_statscan_value(stats, "10.2.1.12")

    # "Labour", 31002, "11.1.1.1.1", 2, "    Employed"
    subdiv.employed = _fetch_statscan_value(stats, "11.1.1.1.1")
    # "Labour", 31003, "11.1.1.1.2", 2, "    Unemployed"
    subdiv.unemployed = _fetch_statscan_value(stats, "11.1.1.1.2")
    # "Labour", 33004, "11.3.1.2.2", 2, "    Self-employed"
    subdiv.self_employed = _fetch_statscan_value(stats, "11.3.1.2.2")

    # Occupation - National Occupational Classification (NOC) 2016
    # "Labour", 34003, "11.4.1.2.1", 2, "    0 Management occupations"
    subdiv.noc_0_management = _fetch_statscan_value(stats, "11.4.1.2.1")
    # "Labour", 34004, "11.4.1.2.2", 2, "    1 Business, finance and administration occupations"
    subdiv.noc_1_business_finance_admin = _fetch_statscan_value(stats, "11.4.1.2.2")
    # "Labour", 34005, "11.4.1.2.3", 2, "    2 Natural and applied sciences and related occupations"
    subdiv.noc_2_natural_applied_sciences = _fetch_statscan_value(stats, "11.4.1.2.3")
    # "Labour", 34006, "11.4.1.2.4", 2, "    3 Health occupations"
    subdiv.noc_3_health = _fetch_statscan_value(stats, "11.4.1.2.4")
    # "Labour", 34007, "11.4.1.2.5", 2, "    4 Occupations in education, law and social, community and government services"
    subdiv.noc_4_education_law_social = _fetch_statscan_value(stats, "11.4.1.2.5")
    # "Labour", 34008, "11.4.1.2.6", 2, "    5 Occupations in art, culture, recreation and sport"
    subdiv.noc_5_art_culture_sport = _fetch_statscan_value(stats, "11.4.1.2.6")
    # "Labour", 34009, "11.4.1.2.7", 2, "    6 Sales and service occupations"
    subdiv.noc_6_sales = _fetch_statscan_value(stats, "11.4.1.2.7")
    # "Labour", 34010, "11.4.1.2.8", 2, "    7 Trades, transport and equipment operators and related occupations"
    subdiv.noc_7_trades_transport = _fetch_statscan_value(stats, "11.4.1.2.8")
    # "Labour", 34011, "11.4.1.2.9", 2, "    8 Natural resources, agriculture and related production occupations"
    subdiv.noc_8_natural_resources_agriculture = _fetch_statscan_value(stats, "11.4.1.2.9")
    # "Labour", 34012, "11.4.1.2.10", 2, "    9 Occupations in manufacturing and utilities"
    subdiv.noc_9_manufacturing = _fetch_statscan_value(stats, "11.4.1.2.10")

    # "Total labour force population aged 15 years and over by Industry - North American Industry Classification System (NAICS) 2012 - 25% sample data",
    # "Labour", 35001, "11.5.1.1", 1, "  Industry - NAICS2012 - not applicable",
    subdiv.naics_not_applicable = _fetch_statscan_value(stats, "11.5.1.1")
    # "Labour", 35003, "11.5.1.2.1", 2, "    11 Agriculture, forestry, fishing and hunting",
    subdiv.naics_agriculture = _fetch_statscan_value(stats, "11.5.1.2.1")
    # "Labour", 35004, "11.5.1.2.2", 2, "    21 Mining, quarrying, and oil and gas extraction",
    subdiv.naics_mining = _fetch_statscan_value(stats, "11.5.1.2.2")
    # "Labour", 35005, "11.5.1.2.3", 2, "    22 Utilities",
    subdiv.naics_utilities = _fetch_statscan_value(stats, "11.5.1.2.3")
    # "Labour", 35006, "11.5.1.2.4", 2, "    23 Construction",
    subdiv.naics_construction = _fetch_statscan_value(stats, "11.5.1.2.4")
    # "Labour", 35007, "11.5.1.2.5", 2, "    31-33 Manufacturing",
    subdiv.naics_manufacturing = _fetch_statscan_value(stats, "11.5.1.2.5")
    # "Labour", 35008, "11.5.1.2.6", 2, "    41 Wholesale trade",
    subdiv.naics_wholesale = _fetch_statscan_value(stats, "11.5.1.2.6")
    # "Labour", 35009, "11.5.1.2.7", 2, "    44-45 Retail trade",
    subdiv.naics_retail = _fetch_statscan_value(stats, "11.5.1.2.7")
    # "Labour", 35010, "11.5.1.2.8", 2, "    48-49 Transportation and warehousing",
    subdiv.naics_transportation = _fetch_statscan_value(stats, "11.5.1.2.8")
    # "Labour", 35011, "11.5.1.2.9", 2, "    51 Information and cultural industries",
    subdiv.naics_information = _fetch_statscan_value(stats, "11.5.1.2.9")
    # "Labour", 35012, "11.5.1.2.10", 2, "    52 Finance and insurance",
    subdiv.naics_finance = _fetch_statscan_value(stats, "11.5.1.2.10")
    # "Labour", 35013, "11.5.1.2.11", 2, "    53 Real estate and rental and leasing",
    subdiv.naics_real_estate = _fetch_statscan_value(stats, "11.5.1.2.11")
    # "Labour", 35014, "11.5.1.2.12", 2, "    54 Professional, scientific and technical services"
    subdiv.naics_tech = _fetch_statscan_value(stats, "11.5.1.2.12")
    # "Labour", 35015, "11.5.1.2.13", 2, "    55 Management of companies and enterprises",
    subdiv.naics_management = _fetch_statscan_value(stats, "11.5.1.2.13")
    # "Labour", 35016, "11.5.1.2.14", 2, "    56 Administrative and support, waste management and remediation services",
    subdiv.naics_admin = _fetch_statscan_value(stats, "11.5.1.2.14")
    # "Labour", 35017, "11.5.1.2.15", 2, "    61 Educational services",
    subdiv.naics_education = _fetch_statscan_value(stats, "11.5.1.2.15")
    # "Labour", 35018, "11.5.1.2.16", 2, "    62 Health care and social assistance",
    subdiv.naics_healthcare = _fetch_statscan_value(stats, "11.5.1.2.16")
    # "Labour", 35019, "11.5.1.2.17", 2, "    71 Arts, entertainment and recreation",
    subdiv.naics_arts = _fetch_statscan_value(stats, "11.5.1.2.17")
    # "Labour", 35020, "11.5.1.2.18", 2, "    72 Accommodation and food services",
    subdiv.naics_accomodation = _fetch_statscan_value(stats, "11.5.1.2.18")
    # "Labour", 35021, "11.5.1.2.19", 2, "    81 Other services (except public administration)",
    subdiv.naics_other = _fetch_statscan_value(stats, "11.5.1.2.19")
    # "Labour", 35022, "11.5.1.2.20", 2, "    91 Public administration",
    subdiv.naics_public_admin = _fetch_statscan_value(stats, "11.5.1.2.20")


def import_census_families_data(stats, subdiv):
    # "Families, households and marital status", 3017, "2.1.4", 0, "Average household size",
    subdiv.avg_household_size = _fetch_statscan_value(stats, "2.1.4")

    # "2.1.2", 0, "Total - Private households by household size - 100% data",
    subdiv.household_size_total = _fetch_statscan_value(stats, "2.1.2")
    # "Families, households and marital status", 3011, "2.1.2.1", 1, "  1 person",
    subdiv.household_size_1 = _fetch_statscan_value(stats, "2.1.2.1")
    # "Families, households and marital status", 3012, "2.1.2.2", 1, "  2 persons",
    subdiv.household_size_2 = _fetch_statscan_value(stats, "2.1.2.2")
    # "Families, households and marital status", 3013, "2.1.2.3", 1, "  3 persons",
    subdiv.household_size_3 = _fetch_statscan_value(stats, "2.1.2.3")
    # "Families, households and marital status", 3014, "2.1.2.4", 1, "  4 persons",
    subdiv.household_size_4 = _fetch_statscan_value(stats, "2.1.2.4")
    # "Families, households and marital status", 3015, "2.1.2.5", 1, "  5 or more persons",
    subdiv.household_size_5_more = _fetch_statscan_value(stats, "2.1.2.5")

    # "2.3.3", 0, "Total number of census families in private households - 100% data",
    subdiv.total_census_families = _fetch_statscan_value(stats, "2.3.3")

    # "2.3.3.1", 1, "  Total couple families",
    subdiv.married_common_law_couples = _fetch_statscan_value(stats, "2.3.3.1")
    # "2.3.4.2", 1, "  Couples with children"
    subdiv.couples_with_children = _fetch_statscan_value(stats, "2.3.4.2")
    # "2.3.5", 0, "Total - Lone-parent census families in private households - 100% data"
    subdiv.single_parents = _fetch_statscan_value(stats, "2.3.5")


def _fetch_statscan_value(stats, property_name, gender=None):
    # field references: https://www12.statcan.gc.ca/wds-sdw/cpr2016-eng.cfm
    HIER_ID = 8
    TEXT_NAME_NOM = 10
    T_DATA_DONNEE = 13
    M_DATA_DONNEE = 15
    F_DATA_DONNEE = 17

    for line in stats['DATA']:
        if line[HIER_ID] == property_name:
            total_value = line[T_DATA_DONNEE]
            male_value = line[M_DATA_DONNEE]
            female_value = line[F_DATA_DONNEE]
            print(line[TEXT_NAME_NOM], total_value, male_value, female_value)

            if gender == "male":
                return male_value
            elif gender == "female":
                return female_value

            return total_value

    raise Exception('stat not found: {}'.format(property_name))


def _import_three_most_common_languages(stats, subdiv):
    language_counts = []

    for field_name, language in CENSUS_LANGUAGE_MAP.items():
        lang_count = _fetch_statscan_value(stats, field_name)
        print("language", language, lang_count)

        if not lang_count:
            continue

        tuple_to_insert = (lang_count, language)
        index = bisect.bisect_left(language_counts, tuple_to_insert)
        language_counts.insert(index, tuple_to_insert)

    print("language_counts", language_counts)

    if len(language_counts) >= 1:
        lang_1_count, lang_1 = language_counts[-1]
        subdiv.lang_1_name = lang_1
        subdiv.lang_1_count = lang_1_count

    if len(language_counts) >= 2:
        lang_2_count, lang_2 = language_counts[-2]
        subdiv.lang_2_name = lang_2
        subdiv.lang_2_count = lang_2_count

    if len(language_counts) >= 3:
        lang_3_count, lang_3 = language_counts[-3]
        subdiv.lang_3_name = lang_3
        subdiv.lang_3_count = lang_3_count
