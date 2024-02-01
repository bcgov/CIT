from django.contrib.gis.db import models

xlsx_col_to_db_col = [
    "municipality_name",
    "municipality_type",
    "regional_district_code",
    "tax_rate_purpose",
    "residential_tax_rate",
    "utilities_tax_rate",
    "supportive_housing_rax_rate",
    "major_industry_tax_rate",
    "light_industry_tax_rate",
    "business_tax_rate",
    "managed_forest_land_tax_rate",
    "recreational_non_profit_tax_rate",
    "farm_tax_rate",
]  # ORDER MUST MATCH COLUMN ORDER


class MunicipalTaxRates(models.Model):
    LINK_FIELD = "CENSUS_SUBDIVISION_ID"
    census_subdivision_id = models.IntegerField(null=True)  # not provided

    municipality_name = models.CharField(max_length=127)
    municipality_type = models.CharField(max_length=127)
    regional_district_code = models.CharField(max_length=127)
    tax_rate_purpose = models.CharField(max_length=127)

    residential_tax_rate = models.FloatField(null=True)
    utilities_tax_rate = models.FloatField(null=True)
    supportive_housing_rax_rate = models.FloatField(null=True)
    major_industry_tax_rate = models.FloatField(null=True)
    light_industry_tax_rate = models.FloatField(null=True)
    business_tax_rate = models.FloatField(null=True)
    managed_forest_land_tax_rate = models.FloatField(null=True)
    recreational_non_profit_tax_rate = models.FloatField(null=True)
    farm_tax_rate = models.FloatField(null=True)

    class Meta:
        ordering = ("census_subdivision_id",)

    def __str__(self) -> str:
        return f"<MunicipalTaxRates({self.census_subdivision_id:8}>"
