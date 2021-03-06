# Generated by Django 2.2.13 on 2020-08-13 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0052_auto_20200813_0239'),
    ]

    operations = [
        migrations.AddField(
            model_name='censussubdivision',
            name='avg_household_size',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='household_size_1',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='household_size_2',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='household_size_3',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='household_size_4',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='household_size_5_more',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_owner_avg_dwelling_value',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_owner_avg_monthly_shelter_costs',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_owner_median_dwelling_value',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_owner_median_monthly_shelter_costs',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_owner_pct_mortgage',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_owner_spending_30_pct_income',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_tenant_avg_shelter_cost',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_tenant_median_shelter_cost',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_tenant_pct_subsidized_housing',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='households_tenant_spending_30_pct_income',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='housing_band_housing',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='housing_cond_major_repairs',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='housing_cond_regular_maintenance',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='housing_cost_30_pct_more_income',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='housing_cost_less_30_pct_income',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='housing_owner',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='censussubdivision',
            name='housing_renter',
            field=models.IntegerField(null=True),
        ),
    ]
