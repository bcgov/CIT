# Generated by Django 2.2.16 on 2021-03-15 18:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0126_auto_20210311_2036'),
    ]

    operations = [
        migrations.CreateModel(
            name='BCAssessmentRegionalDistrict',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actual_use_code_category', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqft_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqft_res', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqm_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqm_res', models.CharField(blank=True, max_length=128, null=True)),
                ('average_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_area_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_area_hectares', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('bca_sbcdu_sysid', models.CharField(blank=True, max_length=128, null=True)),
                ('census_division_name', models.CharField(blank=True, max_length=128, null=True)),
                ('median_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('median_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('median_storeys_commercial', models.CharField(blank=True, max_length=128, null=True)),
                ('median_storeys_residential', models.CharField(blank=True, max_length=128, null=True)),
                ('median_year_built_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('median_year_built_res', models.CharField(blank=True, max_length=128, null=True)),
                ('number_commercial_bldgs', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_folios', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_6mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_12mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_24_mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_60_mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_6mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_12mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_24mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_60mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_5to25_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_gt25_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_lt5_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_residential_bldgs', models.CharField(blank=True, max_length=128, null=True)),
                ('number_underutilized_property', models.CharField(blank=True, max_length=128, null=True)),
                ('number_utilized_property', models.CharField(blank=True, max_length=128, null=True)),
                ('number_vacant_property', models.CharField(blank=True, max_length=128, null=True)),
                ('total_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('total_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('regional_district', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pipeline.RegionalDistrict')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='BCAssessmentEconomicRegion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actual_use_code_category', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqft_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqft_res', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqm_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqm_res', models.CharField(blank=True, max_length=128, null=True)),
                ('average_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_area_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_area_hectares', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('bca_sberu_sysid', models.CharField(blank=True, max_length=128, null=True)),
                ('median_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('median_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('median_storeys_commercial', models.CharField(blank=True, max_length=128, null=True)),
                ('median_storeys_residential', models.CharField(blank=True, max_length=128, null=True)),
                ('median_year_built_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('median_year_built_res', models.CharField(blank=True, max_length=128, null=True)),
                ('number_commercial_bldgs', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_folios', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_6mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_12mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_24_mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_60_mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_6mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_12mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_24mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_60mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_5to25_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_gt25_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_lt5_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_residential_bldgs', models.CharField(blank=True, max_length=128, null=True)),
                ('number_underutilized_property', models.CharField(blank=True, max_length=128, null=True)),
                ('number_utilized_property', models.CharField(blank=True, max_length=128, null=True)),
                ('number_vacant_property', models.CharField(blank=True, max_length=128, null=True)),
                ('total_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('total_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('economic_region', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pipeline.CensusEconomicRegion')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='BCAssessmentCensusSubdivision',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actual_use_code_category', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqft_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqft_res', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqm_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('average_area_sqm_res', models.CharField(blank=True, max_length=128, null=True)),
                ('average_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_area_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_area_hectares', models.CharField(blank=True, max_length=128, null=True)),
                ('average_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('bca_sbcsdu_sysid', models.CharField(blank=True, max_length=128, null=True)),
                ('census_economic_region_name', models.CharField(blank=True, max_length=128, null=True)),
                ('census_division_name', models.CharField(blank=True, max_length=128, null=True)),
                ('median_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('median_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('median_storeys_commercial', models.CharField(blank=True, max_length=128, null=True)),
                ('median_storeys_residential', models.CharField(blank=True, max_length=128, null=True)),
                ('median_year_built_comm', models.CharField(blank=True, max_length=128, null=True)),
                ('median_year_built_res', models.CharField(blank=True, max_length=128, null=True)),
                ('number_commercial_bldgs', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_folios', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_6mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_12mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_24_mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_permits_60_mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_6mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_12mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_24mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_of_sales_60mo', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_5to25_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_gt25_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_properties_lt5_acres', models.CharField(blank=True, max_length=128, null=True)),
                ('number_residential_bldgs', models.CharField(blank=True, max_length=128, null=True)),
                ('number_underutilized_property', models.CharField(blank=True, max_length=128, null=True)),
                ('number_utilized_property', models.CharField(blank=True, max_length=128, null=True)),
                ('number_vacant_property', models.CharField(blank=True, max_length=128, null=True)),
                ('total_improvement_value', models.CharField(blank=True, max_length=128, null=True)),
                ('total_land_value', models.CharField(blank=True, max_length=128, null=True)),
                ('census_subdivision', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='pipeline.CensusSubdivision')),
            ],
            options={
                'ordering': ('id',),
            },
        ),
    ]
