from rest_framework import serializers
from rest_framework_csv import renderers as csv_renderers

from pipeline.models.community import Community


class CommunitySerializer(serializers.ModelSerializer):
    queryset = Community.objects.all().select_related(
        'hexuid', 'hexuid__service__isp').prefetch_related('hexuid__service')
    wildfire_zone = serializers.SlugRelatedField(read_only=True, slug_field='risk_class')
    tsunami_zone = serializers.SlugRelatedField(read_only=True, slug_field='zone_class')
    community_type = serializers.CharField(source='get_display_community_type', read_only=True)
    percent_50_10 = serializers.SerializerMethodField()
    percent_25_5 = serializers.SerializerMethodField()
    percent_10_2 = serializers.SerializerMethodField()
    percent_5_1 = serializers.SerializerMethodField()
    pop_2km_capacity = serializers.SerializerMethodField()
    remaining_pop_capacity = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
            "description",
            "header_image",
            "child_communities",
            "latitude",
            "longitude",
            "census_subdivision",
            "regional_district",
            "community_type",
            "incorporated",
            "fn_community_name",
            "wildfire_zone",
            "tsunami_zone",
            "is_coastal",
            "last_mile_status",
            "transport_mile_status",
            "cbc_phase",
            "num_schools",
            "num_courts",
            "num_hospitals",
            "num_timber_facilities",
            "percent_50_10",
            "percent_25_5",
            "percent_10_2",
            "percent_5_1",
            "nearest_substation_name",
            "nearest_substation_distance",
            "nearest_transmission_distance",
            "transmission_lines_owner",
            "transmission_line_description",
            "transmission_line_voltage",
            "pop_2km_capacity",
            "remaining_pop_capacity",
        )

    def get_percent_50_10(self, obj):
        return obj.percent_50_10 if obj.percent_50_10 else 0

    def get_percent_25_5(self, obj):
        return obj.percent_25_5 if obj.percent_25_5 else 0

    def get_percent_10_2(self, obj):
        return obj.percent_10_2 if obj.percent_10_2 else 0

    def get_percent_5_1(self, obj):
        return obj.percent_5_1 if obj.percent_5_1 else 0

    def get_pop_2km_capacity(self, obj):
        return obj.pop_2km_capacity if obj.pop_2km_capacity else -1

    def get_remaining_pop_capacity(self, obj):
        return obj.remaining_pop_capacity if obj.remaining_pop_capacity else -1


class CommunityDetailSerializer(serializers.ModelSerializer):
    display_fields = serializers.SerializerMethodField()
    locations = serializers.SerializerMethodField()
    child_communities = serializers.SerializerMethodField()
    parent_community = serializers.SerializerMethodField()
    hidden_report_pages = serializers.SerializerMethodField()
    mayor = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            "id",
            "parent_community",
            "child_communities",
            "description",
            "header_image",
            "display_fields",
            "latitude",
            "longitude",
            "regional_district",
            "locations",
            "hidden_report_pages",
            "mayor",
        )

    def get_display_fields(self, obj):
        return obj.get_display_fields()

    def get_locations(self, obj):
        return obj.get_location_assets()

    def get_parent_community(self, obj):
        if not obj.parent_community:
            return None

        return {
            "id": obj.parent_community.id,
            "name": obj.parent_community.place_name,
        }

    def get_child_communities(self, obj):
        return [{
            "id": child_community.id,
            "place_name": child_community.place_name,
        } for child_community in obj.child_communities.all()]

    def get_hidden_report_pages(self, obj):
        return obj.census_subdivision.get_hidden_detail_report_pages()

    def get_mayor(self, obj):
        return obj.get_mayor()


class CommunitySearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = (
            "id",
            "place_name",
            "nation",
            "regional_district",
            "latitude",
            "longitude",
        )


class CommunityCSVRenderer(csv_renderers.CSVRenderer):
    header = [
        "place_id", "place_name", "parent_community", "latitude", "longitude", "regional_district", "community_type",
        "incorporated", "indigenous_name", "nation", "band_number", "wildfire_zone", "tsunami_zone", "is_coastal",
        "hexuid", "percent_50_10", "percent_25_5", "percent_10_2", "percent_5_1", "last_mile_status",
        "transport_mile_status", "cbc_phase", "nearest_substation_name",
        "nearest_substation_distance", "transmission_lines_owner", "transmission_line_description",
        "transmission_line_voltage", "pop_2km_capacity", "remaining_pop_capacity", "census_subdivision_name",
        "census_subdivision_population", "census_subdivision_population_percentage_change",
        "census_subdivision_population_count_change", "census_subdivision_population_avg_age",
        "census_subdivision_population_density_per_sq_km", "census_subdivision_priv_dwel", "census_subdivision_area",
        "census_subdivision_pop_pct_0_14", "census_subdivision_pop_pct_14_65", "census_subdivision_pop_pct_65",
        "census_subdivision_pop_count_total", "census_subdivision_pop_count_0_14",
        "census_subdivision_pop_count_14_65", "census_subdivision_pop_count_65", "census_subdivision_pop_pct_0_14_m",
        "census_subdivision_pop_pct_14_65_m", "census_subdivision_pop_pct_65_m",
        "census_subdivision_pop_count_total_m", "census_subdivision_pop_count_0_14_m",
        "census_subdivision_pop_count_14_65_m", "census_subdivision_pop_count_65_m",
        "census_subdivision_pop_pct_0_14_f", "census_subdivision_pop_pct_14_65_f", "census_subdivision_pop_pct_65_f",
        "census_subdivision_pop_count_total_f", "census_subdivision_pop_count_0_14_f",
        "census_subdivision_pop_count_14_65_f", "census_subdivision_pop_count_65_f", "census_subdivision_pop_0_4",
        "census_subdivision_pop_5_9", "census_subdivision_pop_10_14", "census_subdivision_pop_15_19",
        "census_subdivision_pop_20_24", "census_subdivision_pop_25_29", "census_subdivision_pop_30_34",
        "census_subdivision_pop_35_39", "census_subdivision_pop_40_44", "census_subdivision_pop_45_49",
        "census_subdivision_pop_50_54", "census_subdivision_pop_55_59", "census_subdivision_pop_60_64",
        "census_subdivision_pop_65_69", "census_subdivision_pop_70_74", "census_subdivision_pop_75_79",
        "census_subdivision_pop_80_84", "census_subdivision_pop_85_89", "census_subdivision_pop_90_94",
        "census_subdivision_pop_95_99", "census_subdivision_pop_100", "census_subdivision_pop_0_4_m",
        "census_subdivision_pop_5_9_m", "census_subdivision_pop_10_14_m", "census_subdivision_pop_15_19_m",
        "census_subdivision_pop_20_24_m", "census_subdivision_pop_25_29_m", "census_subdivision_pop_30_34_m",
        "census_subdivision_pop_35_39_m", "census_subdivision_pop_40_44_m", "census_subdivision_pop_45_49_m",
        "census_subdivision_pop_50_54_m", "census_subdivision_pop_55_59_m", "census_subdivision_pop_60_64_m",
        "census_subdivision_pop_65_69_m", "census_subdivision_pop_70_74_m", "census_subdivision_pop_75_79_m",
        "census_subdivision_pop_80_84_m", "census_subdivision_pop_85_89_m", "census_subdivision_pop_90_94_m",
        "census_subdivision_pop_95_99_m", "census_subdivision_pop_100_m", "census_subdivision_pop_0_4_f",
        "census_subdivision_pop_5_9_f", "census_subdivision_pop_10_14_f", "census_subdivision_pop_15_19_f",
        "census_subdivision_pop_20_24_f", "census_subdivision_pop_25_29_f", "census_subdivision_pop_30_34_f",
        "census_subdivision_pop_35_39_f", "census_subdivision_pop_40_44_f", "census_subdivision_pop_45_49_f",
        "census_subdivision_pop_50_54_f", "census_subdivision_pop_55_59_f", "census_subdivision_pop_60_64_f",
        "census_subdivision_pop_65_69_f", "census_subdivision_pop_70_74_f", "census_subdivision_pop_75_79_f",
        "census_subdivision_pop_80_84_f", "census_subdivision_pop_85_89_f", "census_subdivision_pop_90_94_f",
        "census_subdivision_pop_95_99_f", "census_subdivision_pop_100_f", "census_subdivision_indigenous_population",
        "census_subdivision_detached_houses", "census_subdivision_apartments",
        "census_subdivision_other_attached_dwellings",
        "census_subdivision_movable_dwellings", "census_subdivision_total_census_families",
        "census_subdivision_married_common_law_couples", "census_subdivision_couples_with_children",
        "census_subdivision_single_parents", "census_subdivision_total_lang", "census_subdivision_eng_known",
        "census_subdivision_fr_known", "census_subdivision_other_lang", "census_subdivision_aboriginal_lang",
        "census_subdivision_lang_1_name", "census_subdivision_lang_1_count", "census_subdivision_lang_2_name",
        "census_subdivision_lang_2_count", "census_subdivision_lang_3_name", "census_subdivision_lang_3_count",
        "census_subdivision_median_total_income", "census_subdivision_median_total_income_m",
        "census_subdivision_median_total_income_f", "census_subdivision_median_total_household_income",
        "census_subdivision_median_total_household_income_one_person",
        "census_subdivision_median_total_household_income_two_or_more_person",
        "census_subdivision_total_income_under_10000", "census_subdivision_total_income_10000_to_19999",
        "census_subdivision_total_income_20000_to_29999", "census_subdivision_total_income_30000_to_39999",
        "census_subdivision_total_income_40000_to_49999", "census_subdivision_total_income_50000_to_59999",
        "census_subdivision_total_income_60000_to_69999", "census_subdivision_total_income_70000_to_79999",
        "census_subdivision_total_income_80000_to_89999", "census_subdivision_total_income_90000_to_99999",
        "census_subdivision_total_income_100000_to_149999", "census_subdivision_total_income_150000_and_over",
        "census_subdivision_total_income_under_10000_m", "census_subdivision_total_income_10000_to_19999_m",
        "census_subdivision_total_income_20000_to_29999_m", "census_subdivision_total_income_30000_to_39999_m",
        "census_subdivision_total_income_40000_to_49999_m", "census_subdivision_total_income_50000_to_59999_m",
        "census_subdivision_total_income_60000_to_69999_m", "census_subdivision_total_income_70000_to_79999_m",
        "census_subdivision_total_income_80000_to_89999_m", "census_subdivision_total_income_90000_to_99999_m",
        "census_subdivision_total_income_100000_to_149999_m", "census_subdivision_total_income_150000_and_over_m",
        "census_subdivision_total_income_under_10000_f", "census_subdivision_total_income_10000_to_19999_f",
        "census_subdivision_total_income_20000_to_29999_f", "census_subdivision_total_income_30000_to_39999_f",
        "census_subdivision_total_income_40000_to_49999_f", "census_subdivision_total_income_50000_to_59999_f",
        "census_subdivision_total_income_60000_to_69999_f", "census_subdivision_total_income_70000_to_79999_f",
        "census_subdivision_total_income_80000_to_89999_f", "census_subdivision_total_income_90000_to_99999_f",
        "census_subdivision_total_income_100000_to_149999_f", "census_subdivision_total_income_150000_and_over_f",
        "census_subdivision_low_income_status_0_to_17", "census_subdivision_low_income_status_18_to_64",
        "census_subdivision_low_income_status_65_and_over", "census_subdivision_low_income_status_0_to_17_m",
        "census_subdivision_low_income_status_18_to_64_m", "census_subdivision_low_income_status_65_and_over_m",
        "census_subdivision_low_income_status_0_to_17_f", "census_subdivision_low_income_status_18_to_64_f",
        "census_subdivision_low_income_status_65_and_over_f", "census_subdivision_immigration_population_total",
        "census_subdivision_non_pr", "census_subdivision_visible_minority", "census_subdivision_housing_owner",
        "census_subdivision_housing_renter", "census_subdivision_housing_band_housing",
        "census_subdivision_housing_cond_total_private_dwellings",
        "census_subdivision_housing_cond_regular_maintenance", "census_subdivision_housing_cond_major_repairs",
        "census_subdivision_housing_cost_less_30_pct_income", "census_subdivision_housing_cost_30_pct_more_income",
        "census_subdivision_households_owner_pct_mortgage",
        "census_subdivision_households_owner_pct_spending_30_pct_income",
        "census_subdivision_households_owner_count_total", "census_subdivision_households_owner_count_mortgage",
        "census_subdivision_households_owner_count_spending_30_pct_income",
        "census_subdivision_households_owner_median_monthly_shelter_costs",
        "census_subdivision_households_owner_avg_monthly_shelter_costs",
        "census_subdivision_households_owner_median_dwelling_value",
        "census_subdivision_households_owner_avg_dwelling_value",
        "census_subdivision_households_tenant_pct_subsidized_housing",
        "census_subdivision_households_tenant_pct_spending_30_pct_income",
        "census_subdivision_households_tenant_count_total",
        "census_subdivision_households_tenant_count_subsidized_housing",
        "census_subdivision_households_tenant_count_spending_30_pct_income",
        "census_subdivision_households_tenant_median_shelter_cost",
        "census_subdivision_households_tenant_avg_shelter_cost", "census_subdivision_avg_household_size",
        "census_subdivision_household_size_total", "census_subdivision_household_size_1",
        "census_subdivision_household_size_2", "census_subdivision_household_size_3",
        "census_subdivision_household_size_4", "census_subdivision_household_size_5_more", "census_subdivision_edu_1",
        "census_subdivision_edu_2", "census_subdivision_edu_3", "census_subdivision_edu_4",
        "census_subdivision_edu_field_total", "census_subdivision_edu_field_no_post_secondary",
        "census_subdivision_edu_field_education", "census_subdivision_edu_field_visual_arts_comms",
        "census_subdivision_edu_field_humanities", "census_subdivision_edu_field_social_sciences_law",
        "census_subdivision_edu_field_business", "census_subdivision_edu_field_physical_life_sciences",
        "census_subdivision_edu_field_math_cs", "census_subdivision_edu_field_architecture_eng",
        "census_subdivision_edu_field_agriculture", "census_subdivision_edu_field_health",
        "census_subdivision_edu_field_personal_protective_transportation", "census_subdivision_employed",
        "census_subdivision_unemployed", "census_subdivision_self_employed", "census_subdivision_employment_rate",
        "census_subdivision_noc_0_management", "census_subdivision_noc_1_business_finance_admin",
        "census_subdivision_noc_2_natural_applied_sciences", "census_subdivision_noc_3_health",
        "census_subdivision_noc_4_education_law_social", "census_subdivision_noc_5_art_culture_sport",
        "census_subdivision_noc_6_sales", "census_subdivision_noc_7_trades_transport",
        "census_subdivision_noc_8_natural_resources_agriculture", "census_subdivision_noc_9_manufacturing",
        "census_subdivision_naics_not_applicable", "census_subdivision_naics_agriculture",
        "census_subdivision_naics_mining", "census_subdivision_naics_utilities",
        "census_subdivision_naics_construction", "census_subdivision_naics_manufacturing",
        "census_subdivision_naics_wholesale", "census_subdivision_naics_retail",
        "census_subdivision_naics_transportation", "census_subdivision_naics_information",
        "census_subdivision_naics_finance", "census_subdivision_naics_real_estate", "census_subdivision_naics_tech",
        "census_subdivision_naics_management", "census_subdivision_naics_admin", "census_subdivision_naics_education",
        "census_subdivision_naics_healthcare", "census_subdivision_naics_arts",
        "census_subdivision_naics_accomodation", "census_subdivision_naics_other",
        "census_subdivision_naics_public_admin"]


class CommunityCSVSerializer(serializers.ModelSerializer):
    queryset = Community.objects.all().select_related(
        'hexuid', 'hexuid__service__isp').prefetch_related('hexuid__service')
    wildfire_zone = serializers.SlugRelatedField(read_only=True, slug_field='risk_class')
    tsunami_zone = serializers.SlugRelatedField(read_only=True, slug_field='zone_class')
    community_type = serializers.CharField(source='get_display_community_type', read_only=True)
    indigenous_name = serializers.CharField(source='fn_community_name', read_only=True)
    census_subdivision_name = serializers.CharField(
        read_only=True, source='census_subdivision.name')
    census_subdivision_population = serializers.CharField(
        read_only=True, source='census_subdivision.population')
    census_subdivision_population_percentage_change = serializers.CharField(
        read_only=True, source='census_subdivision.population_percentage_change')
    census_subdivision_population_count_change = serializers.CharField(
        read_only=True, source='census_subdivision.population_count_change')
    census_subdivision_population_avg_age = serializers.CharField(
        read_only=True, source='census_subdivision.population_avg_age')
    census_subdivision_population_density_per_sq_km = serializers.CharField(
        read_only=True, source='census_subdivision.population_density_per_sq_km')
    census_subdivision_priv_dwel = serializers.CharField(
        read_only=True, source='census_subdivision.priv_dwel')
    census_subdivision_area = serializers.CharField(
        read_only=True, source='census_subdivision.area')
    census_subdivision_pop_pct_0_14 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_0_14')
    census_subdivision_pop_pct_14_65 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_14_65')
    census_subdivision_pop_pct_65 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_65')
    census_subdivision_pop_count_total = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_total')
    census_subdivision_pop_count_0_14 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_0_14')
    census_subdivision_pop_count_14_65 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_14_65')
    census_subdivision_pop_count_65 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_65')
    census_subdivision_pop_pct_0_14_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_0_14_m')
    census_subdivision_pop_pct_14_65_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_14_65_m')
    census_subdivision_pop_pct_65_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_65_m')
    census_subdivision_pop_count_total_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_total_m')
    census_subdivision_pop_count_0_14_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_0_14_m')
    census_subdivision_pop_count_14_65_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_14_65_m')
    census_subdivision_pop_count_65_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_65_m')
    census_subdivision_pop_pct_0_14_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_0_14_f')
    census_subdivision_pop_pct_14_65_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_14_65_f')
    census_subdivision_pop_pct_65_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_pct_65_f')
    census_subdivision_pop_count_total_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_total_f')
    census_subdivision_pop_count_0_14_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_0_14_f')
    census_subdivision_pop_count_14_65_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_14_65_f')
    census_subdivision_pop_count_65_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_count_65_f')
    census_subdivision_pop_0_4 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_0_4')
    census_subdivision_pop_5_9 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_5_9')
    census_subdivision_pop_10_14 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_10_14')
    census_subdivision_pop_15_19 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_15_19')
    census_subdivision_pop_20_24 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_20_24')
    census_subdivision_pop_25_29 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_25_29')
    census_subdivision_pop_30_34 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_30_34')
    census_subdivision_pop_35_39 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_35_39')
    census_subdivision_pop_40_44 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_40_44')
    census_subdivision_pop_45_49 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_45_49')
    census_subdivision_pop_50_54 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_50_54')
    census_subdivision_pop_55_59 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_55_59')
    census_subdivision_pop_60_64 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_60_64')
    census_subdivision_pop_65_69 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_65_69')
    census_subdivision_pop_70_74 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_70_74')
    census_subdivision_pop_75_79 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_75_79')
    census_subdivision_pop_80_84 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_80_84')
    census_subdivision_pop_85_89 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_85_89')
    census_subdivision_pop_90_94 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_90_94')
    census_subdivision_pop_95_99 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_95_99')
    census_subdivision_pop_100 = serializers.CharField(
        read_only=True, source='census_subdivision.pop_100')
    census_subdivision_pop_0_4_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_0_4_m')
    census_subdivision_pop_5_9_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_5_9_m')
    census_subdivision_pop_10_14_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_10_14_m')
    census_subdivision_pop_15_19_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_15_19_m')
    census_subdivision_pop_20_24_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_20_24_m')
    census_subdivision_pop_25_29_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_25_29_m')
    census_subdivision_pop_30_34_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_30_34_m')
    census_subdivision_pop_35_39_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_35_39_m')
    census_subdivision_pop_40_44_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_40_44_m')
    census_subdivision_pop_45_49_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_45_49_m')
    census_subdivision_pop_50_54_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_50_54_m')
    census_subdivision_pop_55_59_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_55_59_m')
    census_subdivision_pop_60_64_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_60_64_m')
    census_subdivision_pop_65_69_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_65_69_m')
    census_subdivision_pop_70_74_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_70_74_m')
    census_subdivision_pop_75_79_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_75_79_m')
    census_subdivision_pop_80_84_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_80_84_m')
    census_subdivision_pop_85_89_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_85_89_m')
    census_subdivision_pop_90_94_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_90_94_m')
    census_subdivision_pop_95_99_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_95_99_m')
    census_subdivision_pop_100_m = serializers.CharField(
        read_only=True, source='census_subdivision.pop_100_m')
    census_subdivision_pop_0_4_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_0_4_f')
    census_subdivision_pop_5_9_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_5_9_f')
    census_subdivision_pop_10_14_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_10_14_f')
    census_subdivision_pop_15_19_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_15_19_f')
    census_subdivision_pop_20_24_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_20_24_f')
    census_subdivision_pop_25_29_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_25_29_f')
    census_subdivision_pop_30_34_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_30_34_f')
    census_subdivision_pop_35_39_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_35_39_f')
    census_subdivision_pop_40_44_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_40_44_f')
    census_subdivision_pop_45_49_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_45_49_f')
    census_subdivision_pop_50_54_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_50_54_f')
    census_subdivision_pop_55_59_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_55_59_f')
    census_subdivision_pop_60_64_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_60_64_f')
    census_subdivision_pop_65_69_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_65_69_f')
    census_subdivision_pop_70_74_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_70_74_f')
    census_subdivision_pop_75_79_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_75_79_f')
    census_subdivision_pop_80_84_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_80_84_f')
    census_subdivision_pop_85_89_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_85_89_f')
    census_subdivision_pop_90_94_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_90_94_f')
    census_subdivision_pop_95_99_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_95_99_f')
    census_subdivision_pop_100_f = serializers.CharField(
        read_only=True, source='census_subdivision.pop_100_f')
    census_subdivision_indigenous_population = serializers.CharField(
        read_only=True, source='census_subdivision.indigenous_population')
    census_subdivision_detached_houses = serializers.CharField(
        read_only=True, source='census_subdivision.detached_houses')
    census_subdivision_apartments = serializers.CharField(
        read_only=True, source='census_subdivision.apartments')
    census_subdivision_other_attached_dwellings = serializers.CharField(
        read_only=True, source='census_subdivision.other_attached_dwellings')
    census_subdivision_movable_dwellings = serializers.CharField(
        read_only=True, source='census_subdivision.movable_dwellings')
    census_subdivision_total_census_families = serializers.CharField(
        read_only=True, source='census_subdivision.total_census_families')
    census_subdivision_married_common_law_couples = serializers.CharField(
        read_only=True, source='census_subdivision.married_common_law_couples')
    census_subdivision_couples_with_children = serializers.CharField(
        read_only=True, source='census_subdivision.couples_with_children')
    census_subdivision_single_parents = serializers.CharField(
        read_only=True, source='census_subdivision.single_parents')
    census_subdivision_total_lang = serializers.CharField(
        read_only=True, source='census_subdivision.total_lang')
    census_subdivision_eng_known = serializers.CharField(
        read_only=True, source='census_subdivision.eng_known')
    census_subdivision_fr_known = serializers.CharField(
        read_only=True, source='census_subdivision.fr_known')
    census_subdivision_other_lang = serializers.CharField(
        read_only=True, source='census_subdivision.other_lang')
    census_subdivision_aboriginal_lang = serializers.CharField(
        read_only=True, source='census_subdivision.aboriginal_lang')
    census_subdivision_lang_1_name = serializers.CharField(
        read_only=True, source='census_subdivision.lang_1_name')
    census_subdivision_lang_1_count = serializers.CharField(
        read_only=True, source='census_subdivision.lang_1_count')
    census_subdivision_lang_2_name = serializers.CharField(
        read_only=True, source='census_subdivision.lang_2_name')
    census_subdivision_lang_2_count = serializers.CharField(
        read_only=True, source='census_subdivision.lang_2_count')
    census_subdivision_lang_3_name = serializers.CharField(
        read_only=True, source='census_subdivision.lang_3_name')
    census_subdivision_lang_3_count = serializers.CharField(
        read_only=True, source='census_subdivision.lang_3_count')
    census_subdivision_median_total_income = serializers.CharField(
        read_only=True, source='census_subdivision.median_total_income')
    census_subdivision_median_total_income_m = serializers.CharField(
        read_only=True, source='census_subdivision.median_total_income_m')
    census_subdivision_median_total_income_f = serializers.CharField(
        read_only=True, source='census_subdivision.median_total_income_f')
    census_subdivision_median_total_household_income = serializers.CharField(
        read_only=True, source='census_subdivision.median_total_household_income')
    census_subdivision_median_total_household_income_one_person = serializers.CharField(
        read_only=True, source='census_subdivision.median_total_household_income_one_person')
    census_subdivision_median_total_household_income_two_or_more_person = serializers.CharField(
        read_only=True, source='census_subdivision.median_total_household_income_two_or_more_person')
    census_subdivision_total_income_under_10000 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_under_10000')
    census_subdivision_total_income_10000_to_19999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_10000_to_19999')
    census_subdivision_total_income_20000_to_29999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_20000_to_29999')
    census_subdivision_total_income_30000_to_39999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_30000_to_39999')
    census_subdivision_total_income_40000_to_49999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_40000_to_49999')
    census_subdivision_total_income_50000_to_59999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_50000_to_59999')
    census_subdivision_total_income_60000_to_69999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_60000_to_69999')
    census_subdivision_total_income_70000_to_79999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_70000_to_79999')
    census_subdivision_total_income_80000_to_89999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_80000_to_89999')
    census_subdivision_total_income_90000_to_99999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_90000_to_99999')
    census_subdivision_total_income_100000_to_149999 = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_100000_to_149999')
    census_subdivision_total_income_150000_and_over = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_150000_and_over')
    census_subdivision_total_income_under_10000_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_under_10000_m')
    census_subdivision_total_income_10000_to_19999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_10000_to_19999_m')
    census_subdivision_total_income_20000_to_29999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_20000_to_29999_m')
    census_subdivision_total_income_30000_to_39999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_30000_to_39999_m')
    census_subdivision_total_income_40000_to_49999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_40000_to_49999_m')
    census_subdivision_total_income_50000_to_59999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_50000_to_59999_m')
    census_subdivision_total_income_60000_to_69999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_60000_to_69999_m')
    census_subdivision_total_income_70000_to_79999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_70000_to_79999_m')
    census_subdivision_total_income_80000_to_89999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_80000_to_89999_m')
    census_subdivision_total_income_90000_to_99999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_90000_to_99999_m')
    census_subdivision_total_income_100000_to_149999_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_100000_to_149999_m')
    census_subdivision_total_income_150000_and_over_m = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_150000_and_over_m')
    census_subdivision_total_income_under_10000_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_under_10000_f')
    census_subdivision_total_income_10000_to_19999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_10000_to_19999_f')
    census_subdivision_total_income_20000_to_29999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_20000_to_29999_f')
    census_subdivision_total_income_30000_to_39999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_30000_to_39999_f')
    census_subdivision_total_income_40000_to_49999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_40000_to_49999_f')
    census_subdivision_total_income_50000_to_59999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_50000_to_59999_f')
    census_subdivision_total_income_60000_to_69999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_60000_to_69999_f')
    census_subdivision_total_income_70000_to_79999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_70000_to_79999_f')
    census_subdivision_total_income_80000_to_89999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_80000_to_89999_f')
    census_subdivision_total_income_90000_to_99999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_90000_to_99999_f')
    census_subdivision_total_income_100000_to_149999_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_100000_to_149999_f')
    census_subdivision_total_income_150000_and_over_f = serializers.CharField(
        read_only=True, source='census_subdivision.total_income_150000_and_over_f')
    census_subdivision_low_income_status_0_to_17 = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_0_to_17')
    census_subdivision_low_income_status_18_to_64 = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_18_to_64')
    census_subdivision_low_income_status_65_and_over = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_65_and_over')
    census_subdivision_low_income_status_0_to_17_m = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_0_to_17_m')
    census_subdivision_low_income_status_18_to_64_m = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_18_to_64_m')
    census_subdivision_low_income_status_65_and_over_m = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_65_and_over_m')
    census_subdivision_low_income_status_0_to_17_f = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_0_to_17_f')
    census_subdivision_low_income_status_18_to_64_f = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_18_to_64_f')
    census_subdivision_low_income_status_65_and_over_f = serializers.CharField(
        read_only=True, source='census_subdivision.low_income_status_65_and_over_f')
    census_subdivision_immigration_population_total = serializers.CharField(
        read_only=True, source='census_subdivision.immigration_population_total')
    census_subdivision_non_pr = serializers.CharField(
        read_only=True, source='census_subdivision.non_pr')
    census_subdivision_visible_minority = serializers.CharField(
        read_only=True, source='census_subdivision.visible_minority')
    census_subdivision_housing_owner = serializers.CharField(
        read_only=True, source='census_subdivision.housing_owner')
    census_subdivision_housing_renter = serializers.CharField(
        read_only=True, source='census_subdivision.housing_renter')
    census_subdivision_housing_band_housing = serializers.CharField(
        read_only=True, source='census_subdivision.housing_band_housing')
    census_subdivision_housing_cond_total_private_dwellings = serializers.CharField(
        read_only=True, source='census_subdivision.housing_cond_total_private_dwellings')
    census_subdivision_housing_cond_regular_maintenance = serializers.CharField(
        read_only=True, source='census_subdivision.housing_cond_regular_maintenance')
    census_subdivision_housing_cond_major_repairs = serializers.CharField(
        read_only=True, source='census_subdivision.housing_cond_major_repairs')
    census_subdivision_housing_cost_less_30_pct_income = serializers.CharField(
        read_only=True, source='census_subdivision.housing_cost_less_30_pct_income')
    census_subdivision_housing_cost_30_pct_more_income = serializers.CharField(
        read_only=True, source='census_subdivision.housing_cost_30_pct_more_income')
    census_subdivision_households_owner_pct_mortgage = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_pct_mortgage')
    census_subdivision_households_owner_pct_spending_30_pct_income = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_pct_spending_30_pct_income')
    census_subdivision_households_owner_count_total = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_count_total')
    census_subdivision_households_owner_count_mortgage = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_count_mortgage')
    census_subdivision_households_owner_count_spending_30_pct_income = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_count_spending_30_pct_income')
    census_subdivision_households_owner_median_monthly_shelter_costs = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_median_monthly_shelter_costs')
    census_subdivision_households_owner_avg_monthly_shelter_costs = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_avg_monthly_shelter_costs')
    census_subdivision_households_owner_median_dwelling_value = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_median_dwelling_value')
    census_subdivision_households_owner_avg_dwelling_value = serializers.CharField(
        read_only=True, source='census_subdivision.households_owner_avg_dwelling_value')
    census_subdivision_households_tenant_pct_subsidized_housing = serializers.CharField(
        read_only=True, source='census_subdivision.households_tenant_pct_subsidized_housing')
    census_subdivision_households_tenant_pct_spending_30_pct_income = serializers.CharField(
        read_only=True, source='census_subdivision.households_tenant_pct_spending_30_pct_income')
    census_subdivision_households_tenant_count_total = serializers.CharField(
        read_only=True, source='census_subdivision.households_tenant_count_total')
    census_subdivision_households_tenant_count_subsidized_housing = serializers.CharField(
        read_only=True, source='census_subdivision.households_tenant_count_subsidized_housing')
    census_subdivision_households_tenant_count_spending_30_pct_income = serializers.CharField(
        read_only=True, source='census_subdivision.households_tenant_count_spending_30_pct_income')
    census_subdivision_households_tenant_median_shelter_cost = serializers.CharField(
        read_only=True, source='census_subdivision.households_tenant_median_shelter_cost')
    census_subdivision_households_tenant_avg_shelter_cost = serializers.CharField(
        read_only=True, source='census_subdivision.households_tenant_avg_shelter_cost')
    census_subdivision_avg_household_size = serializers.CharField(
        read_only=True, source='census_subdivision.avg_household_size')
    census_subdivision_household_size_total = serializers.CharField(
        read_only=True, source='census_subdivision.household_size_total')
    census_subdivision_household_size_1 = serializers.CharField(
        read_only=True, source='census_subdivision.household_size_1')
    census_subdivision_household_size_2 = serializers.CharField(
        read_only=True, source='census_subdivision.household_size_2')
    census_subdivision_household_size_3 = serializers.CharField(
        read_only=True, source='census_subdivision.household_size_3')
    census_subdivision_household_size_4 = serializers.CharField(
        read_only=True, source='census_subdivision.household_size_4')
    census_subdivision_household_size_5_more = serializers.CharField(
        read_only=True, source='census_subdivision.household_size_5_more')
    census_subdivision_edu_1 = serializers.CharField(
        read_only=True, source='census_subdivision.edu_1')
    census_subdivision_edu_2 = serializers.CharField(
        read_only=True, source='census_subdivision.edu_2')
    census_subdivision_edu_3 = serializers.CharField(
        read_only=True, source='census_subdivision.edu_3')
    census_subdivision_edu_4 = serializers.CharField(
        read_only=True, source='census_subdivision.edu_4')
    census_subdivision_edu_field_total = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_total')
    census_subdivision_edu_field_no_post_secondary = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_no_post_secondary')
    census_subdivision_edu_field_education = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_education')
    census_subdivision_edu_field_visual_arts_comms = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_visual_arts_comms')
    census_subdivision_edu_field_humanities = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_humanities')
    census_subdivision_edu_field_social_sciences_law = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_social_sciences_law')
    census_subdivision_edu_field_business = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_business')
    census_subdivision_edu_field_physical_life_sciences = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_physical_life_sciences')
    census_subdivision_edu_field_math_cs = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_math_cs')
    census_subdivision_edu_field_architecture_eng = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_architecture_eng')
    census_subdivision_edu_field_agriculture = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_agriculture')
    census_subdivision_edu_field_health = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_health')
    census_subdivision_edu_field_personal_protective_transportation = serializers.CharField(
        read_only=True, source='census_subdivision.edu_field_personal_protective_transportation')
    census_subdivision_employed = serializers.CharField(
        read_only=True, source='census_subdivision.employed')
    census_subdivision_unemployed = serializers.CharField(
        read_only=True, source='census_subdivision.unemployed')
    census_subdivision_self_employed = serializers.CharField(
        read_only=True, source='census_subdivision.self_employed')
    census_subdivision_employment_rate = serializers.CharField(
        read_only=True, source='census_subdivision.employment_rate')
    census_subdivision_noc_0_management = serializers.CharField(
        read_only=True, source='census_subdivision.noc_0_management')
    census_subdivision_noc_1_business_finance_admin = serializers.CharField(
        read_only=True, source='census_subdivision.noc_1_business_finance_admin')
    census_subdivision_noc_2_natural_applied_sciences = serializers.CharField(
        read_only=True, source='census_subdivision.noc_2_natural_applied_sciences')
    census_subdivision_noc_3_health = serializers.CharField(
        read_only=True, source='census_subdivision.noc_3_health')
    census_subdivision_noc_4_education_law_social = serializers.CharField(
        read_only=True, source='census_subdivision.noc_4_education_law_social')
    census_subdivision_noc_5_art_culture_sport = serializers.CharField(
        read_only=True, source='census_subdivision.noc_5_art_culture_sport')
    census_subdivision_noc_6_sales = serializers.CharField(
        read_only=True, source='census_subdivision.noc_6_sales')
    census_subdivision_noc_7_trades_transport = serializers.CharField(
        read_only=True, source='census_subdivision.noc_7_trades_transport')
    census_subdivision_noc_8_natural_resources_agriculture = serializers.CharField(
        read_only=True, source='census_subdivision.noc_8_natural_resources_agriculture')
    census_subdivision_noc_9_manufacturing = serializers.CharField(
        read_only=True, source='census_subdivision.noc_9_manufacturing')
    census_subdivision_naics_not_applicable = serializers.CharField(
        read_only=True, source='census_subdivision.naics_not_applicable')
    census_subdivision_naics_agriculture = serializers.CharField(
        read_only=True, source='census_subdivision.naics_agriculture')
    census_subdivision_naics_mining = serializers.CharField(
        read_only=True, source='census_subdivision.naics_mining')
    census_subdivision_naics_utilities = serializers.CharField(
        read_only=True, source='census_subdivision.naics_utilities')
    census_subdivision_naics_construction = serializers.CharField(
        read_only=True, source='census_subdivision.naics_construction')
    census_subdivision_naics_manufacturing = serializers.CharField(
        read_only=True, source='census_subdivision.naics_manufacturing')
    census_subdivision_naics_wholesale = serializers.CharField(
        read_only=True, source='census_subdivision.naics_wholesale')
    census_subdivision_naics_retail = serializers.CharField(
        read_only=True, source='census_subdivision.naics_retail')
    census_subdivision_naics_transportation = serializers.CharField(
        read_only=True, source='census_subdivision.naics_transportation')
    census_subdivision_naics_information = serializers.CharField(
        read_only=True, source='census_subdivision.naics_information')
    census_subdivision_naics_finance = serializers.CharField(
        read_only=True, source='census_subdivision.naics_finance')
    census_subdivision_naics_real_estate = serializers.CharField(
        read_only=True, source='census_subdivision.naics_real_estate')
    census_subdivision_naics_tech = serializers.CharField(
        read_only=True, source='census_subdivision.naics_tech')
    census_subdivision_naics_management = serializers.CharField(
        read_only=True, source='census_subdivision.naics_management')
    census_subdivision_naics_admin = serializers.CharField(
        read_only=True, source='census_subdivision.naics_admin')
    census_subdivision_naics_education = serializers.CharField(
        read_only=True, source='census_subdivision.naics_education')
    census_subdivision_naics_healthcare = serializers.CharField(
        read_only=True, source='census_subdivision.naics_healthcare')
    census_subdivision_naics_arts = serializers.CharField(
        read_only=True, source='census_subdivision.naics_arts')
    census_subdivision_naics_accomodation = serializers.CharField(
        read_only=True, source='census_subdivision.naics_accomodation')
    census_subdivision_naics_other = serializers.CharField(
        read_only=True, source='census_subdivision.naics_other')
    census_subdivision_naics_public_admin = serializers.CharField(
        read_only=True, source='census_subdivision.naics_public_admin')

    class Meta:
        model = Community
        fields = (
            "place_id",
            "place_name",
            "parent_community",
            "latitude",
            "longitude",
            "regional_district",
            "community_type",
            "incorporated",
            "indigenous_name",
            "nation",
            "band_number",
            "wildfire_zone",
            "tsunami_zone",
            "is_coastal",
            "hexuid",
            "percent_50_10",
            "percent_25_5",
            "percent_10_2",
            "percent_5_1",
            "last_mile_status",
            "transport_mile_status",
            "cbc_phase",
            "nearest_substation_name",
            "nearest_substation_distance",
            "transmission_lines_owner",
            "transmission_line_description",
            "transmission_line_voltage",
            "pop_2km_capacity",
            "remaining_pop_capacity",
            "census_subdivision_name",
            "census_subdivision_population",
            "census_subdivision_population_percentage_change",
            "census_subdivision_population_count_change",
            "census_subdivision_population_avg_age",
            "census_subdivision_population_density_per_sq_km",
            "census_subdivision_priv_dwel",
            "census_subdivision_area",
            "census_subdivision_pop_pct_0_14",
            "census_subdivision_pop_pct_14_65",
            "census_subdivision_pop_pct_65",
            "census_subdivision_pop_count_total",
            "census_subdivision_pop_count_0_14",
            "census_subdivision_pop_count_14_65",
            "census_subdivision_pop_count_65",
            "census_subdivision_pop_pct_0_14_m",
            "census_subdivision_pop_pct_14_65_m",
            "census_subdivision_pop_pct_65_m",
            "census_subdivision_pop_count_total_m",
            "census_subdivision_pop_count_0_14_m",
            "census_subdivision_pop_count_14_65_m",
            "census_subdivision_pop_count_65_m",
            "census_subdivision_pop_pct_0_14_f",
            "census_subdivision_pop_pct_14_65_f",
            "census_subdivision_pop_pct_65_f",
            "census_subdivision_pop_count_total_f",
            "census_subdivision_pop_count_0_14_f",
            "census_subdivision_pop_count_14_65_f",
            "census_subdivision_pop_count_65_f",
            "census_subdivision_pop_0_4",
            "census_subdivision_pop_5_9",
            "census_subdivision_pop_10_14",
            "census_subdivision_pop_15_19",
            "census_subdivision_pop_20_24",
            "census_subdivision_pop_25_29",
            "census_subdivision_pop_30_34",
            "census_subdivision_pop_35_39",
            "census_subdivision_pop_40_44",
            "census_subdivision_pop_45_49",
            "census_subdivision_pop_50_54",
            "census_subdivision_pop_55_59",
            "census_subdivision_pop_60_64",
            "census_subdivision_pop_65_69",
            "census_subdivision_pop_70_74",
            "census_subdivision_pop_75_79",
            "census_subdivision_pop_80_84",
            "census_subdivision_pop_85_89",
            "census_subdivision_pop_90_94",
            "census_subdivision_pop_95_99",
            "census_subdivision_pop_100",
            "census_subdivision_pop_0_4_m",
            "census_subdivision_pop_5_9_m",
            "census_subdivision_pop_10_14_m",
            "census_subdivision_pop_15_19_m",
            "census_subdivision_pop_20_24_m",
            "census_subdivision_pop_25_29_m",
            "census_subdivision_pop_30_34_m",
            "census_subdivision_pop_35_39_m",
            "census_subdivision_pop_40_44_m",
            "census_subdivision_pop_45_49_m",
            "census_subdivision_pop_50_54_m",
            "census_subdivision_pop_55_59_m",
            "census_subdivision_pop_60_64_m",
            "census_subdivision_pop_65_69_m",
            "census_subdivision_pop_70_74_m",
            "census_subdivision_pop_75_79_m",
            "census_subdivision_pop_80_84_m",
            "census_subdivision_pop_85_89_m",
            "census_subdivision_pop_90_94_m",
            "census_subdivision_pop_95_99_m",
            "census_subdivision_pop_100_m",
            "census_subdivision_pop_0_4_f",
            "census_subdivision_pop_5_9_f",
            "census_subdivision_pop_10_14_f",
            "census_subdivision_pop_15_19_f",
            "census_subdivision_pop_20_24_f",
            "census_subdivision_pop_25_29_f",
            "census_subdivision_pop_30_34_f",
            "census_subdivision_pop_35_39_f",
            "census_subdivision_pop_40_44_f",
            "census_subdivision_pop_45_49_f",
            "census_subdivision_pop_50_54_f",
            "census_subdivision_pop_55_59_f",
            "census_subdivision_pop_60_64_f",
            "census_subdivision_pop_65_69_f",
            "census_subdivision_pop_70_74_f",
            "census_subdivision_pop_75_79_f",
            "census_subdivision_pop_80_84_f",
            "census_subdivision_pop_85_89_f",
            "census_subdivision_pop_90_94_f",
            "census_subdivision_pop_95_99_f",
            "census_subdivision_pop_100_f",
            "census_subdivision_indigenous_population",
            "census_subdivision_detached_houses",
            "census_subdivision_apartments",
            "census_subdivision_other_attached_dwellings",
            "census_subdivision_movable_dwellings",
            "census_subdivision_total_census_families",
            "census_subdivision_married_common_law_couples",
            "census_subdivision_couples_with_children",
            "census_subdivision_single_parents",
            "census_subdivision_total_lang",
            "census_subdivision_eng_known",
            "census_subdivision_fr_known",
            "census_subdivision_other_lang",
            "census_subdivision_aboriginal_lang",
            "census_subdivision_lang_1_name",
            "census_subdivision_lang_1_count",
            "census_subdivision_lang_2_name",
            "census_subdivision_lang_2_count",
            "census_subdivision_lang_3_name",
            "census_subdivision_lang_3_count",
            "census_subdivision_median_total_income",
            "census_subdivision_median_total_income_m",
            "census_subdivision_median_total_income_f",
            "census_subdivision_median_total_household_income",
            "census_subdivision_median_total_household_income_one_person",
            "census_subdivision_median_total_household_income_two_or_more_person",
            "census_subdivision_total_income_under_10000",
            "census_subdivision_total_income_10000_to_19999",
            "census_subdivision_total_income_20000_to_29999",
            "census_subdivision_total_income_30000_to_39999",
            "census_subdivision_total_income_40000_to_49999",
            "census_subdivision_total_income_50000_to_59999",
            "census_subdivision_total_income_60000_to_69999",
            "census_subdivision_total_income_70000_to_79999",
            "census_subdivision_total_income_80000_to_89999",
            "census_subdivision_total_income_90000_to_99999",
            "census_subdivision_total_income_100000_to_149999",
            "census_subdivision_total_income_150000_and_over",
            "census_subdivision_total_income_under_10000_m",
            "census_subdivision_total_income_10000_to_19999_m",
            "census_subdivision_total_income_20000_to_29999_m",
            "census_subdivision_total_income_30000_to_39999_m",
            "census_subdivision_total_income_40000_to_49999_m",
            "census_subdivision_total_income_50000_to_59999_m",
            "census_subdivision_total_income_60000_to_69999_m",
            "census_subdivision_total_income_70000_to_79999_m",
            "census_subdivision_total_income_80000_to_89999_m",
            "census_subdivision_total_income_90000_to_99999_m",
            "census_subdivision_total_income_100000_to_149999_m",
            "census_subdivision_total_income_150000_and_over_m",
            "census_subdivision_total_income_under_10000_f",
            "census_subdivision_total_income_10000_to_19999_f",
            "census_subdivision_total_income_20000_to_29999_f",
            "census_subdivision_total_income_30000_to_39999_f",
            "census_subdivision_total_income_40000_to_49999_f",
            "census_subdivision_total_income_50000_to_59999_f",
            "census_subdivision_total_income_60000_to_69999_f",
            "census_subdivision_total_income_70000_to_79999_f",
            "census_subdivision_total_income_80000_to_89999_f",
            "census_subdivision_total_income_90000_to_99999_f",
            "census_subdivision_total_income_100000_to_149999_f",
            "census_subdivision_total_income_150000_and_over_f",
            "census_subdivision_low_income_status_0_to_17",
            "census_subdivision_low_income_status_18_to_64",
            "census_subdivision_low_income_status_65_and_over",
            "census_subdivision_low_income_status_0_to_17_m",
            "census_subdivision_low_income_status_18_to_64_m",
            "census_subdivision_low_income_status_65_and_over_m",
            "census_subdivision_low_income_status_0_to_17_f",
            "census_subdivision_low_income_status_18_to_64_f",
            "census_subdivision_low_income_status_65_and_over_f",
            "census_subdivision_immigration_population_total",
            "census_subdivision_non_pr",
            "census_subdivision_visible_minority",
            "census_subdivision_housing_owner",
            "census_subdivision_housing_renter",
            "census_subdivision_housing_band_housing",
            "census_subdivision_housing_cond_total_private_dwellings",
            "census_subdivision_housing_cond_regular_maintenance",
            "census_subdivision_housing_cond_major_repairs",
            "census_subdivision_housing_cost_less_30_pct_income",
            "census_subdivision_housing_cost_30_pct_more_income",
            "census_subdivision_households_owner_pct_mortgage",
            "census_subdivision_households_owner_pct_spending_30_pct_income",
            "census_subdivision_households_owner_count_total",
            "census_subdivision_households_owner_count_mortgage",
            "census_subdivision_households_owner_count_spending_30_pct_income",
            "census_subdivision_households_owner_median_monthly_shelter_costs",
            "census_subdivision_households_owner_avg_monthly_shelter_costs",
            "census_subdivision_households_owner_median_dwelling_value",
            "census_subdivision_households_owner_avg_dwelling_value",
            "census_subdivision_households_tenant_pct_subsidized_housing",
            "census_subdivision_households_tenant_pct_spending_30_pct_income",
            "census_subdivision_households_tenant_count_total",
            "census_subdivision_households_tenant_count_subsidized_housing",
            "census_subdivision_households_tenant_count_spending_30_pct_income",
            "census_subdivision_households_tenant_median_shelter_cost",
            "census_subdivision_households_tenant_avg_shelter_cost",
            "census_subdivision_avg_household_size",
            "census_subdivision_household_size_total",
            "census_subdivision_household_size_1",
            "census_subdivision_household_size_2",
            "census_subdivision_household_size_3",
            "census_subdivision_household_size_4",
            "census_subdivision_household_size_5_more",
            "census_subdivision_edu_1",
            "census_subdivision_edu_2",
            "census_subdivision_edu_3",
            "census_subdivision_edu_4",
            "census_subdivision_edu_field_total",
            "census_subdivision_edu_field_no_post_secondary",
            "census_subdivision_edu_field_education",
            "census_subdivision_edu_field_visual_arts_comms",
            "census_subdivision_edu_field_humanities",
            "census_subdivision_edu_field_social_sciences_law",
            "census_subdivision_edu_field_business",
            "census_subdivision_edu_field_physical_life_sciences",
            "census_subdivision_edu_field_math_cs",
            "census_subdivision_edu_field_architecture_eng",
            "census_subdivision_edu_field_agriculture",
            "census_subdivision_edu_field_health",
            "census_subdivision_edu_field_personal_protective_transportation",
            "census_subdivision_employed",
            "census_subdivision_unemployed",
            "census_subdivision_self_employed",
            "census_subdivision_employment_rate",
            "census_subdivision_noc_0_management",
            "census_subdivision_noc_1_business_finance_admin",
            "census_subdivision_noc_2_natural_applied_sciences",
            "census_subdivision_noc_3_health",
            "census_subdivision_noc_4_education_law_social",
            "census_subdivision_noc_5_art_culture_sport",
            "census_subdivision_noc_6_sales",
            "census_subdivision_noc_7_trades_transport",
            "census_subdivision_noc_8_natural_resources_agriculture",
            "census_subdivision_noc_9_manufacturing",
            "census_subdivision_naics_not_applicable",
            "census_subdivision_naics_agriculture",
            "census_subdivision_naics_mining",
            "census_subdivision_naics_utilities",
            "census_subdivision_naics_construction",
            "census_subdivision_naics_manufacturing",
            "census_subdivision_naics_wholesale",
            "census_subdivision_naics_retail",
            "census_subdivision_naics_transportation",
            "census_subdivision_naics_information",
            "census_subdivision_naics_finance",
            "census_subdivision_naics_real_estate",
            "census_subdivision_naics_tech",
            "census_subdivision_naics_management",
            "census_subdivision_naics_admin",
            "census_subdivision_naics_education",
            "census_subdivision_naics_healthcare",
            "census_subdivision_naics_arts",
            "census_subdivision_naics_accomodation",
            "census_subdivision_naics_other",
            "census_subdivision_naics_public_admin",
        )
