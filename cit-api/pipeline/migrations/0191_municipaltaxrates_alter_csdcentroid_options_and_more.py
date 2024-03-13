# Generated by Django 4.1.7 on 2024-02-01 21:37

from django.db import migrations, models

#fixed automatic migrations by adding the models to the models/__init__.py file

class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0190_csdcentroid'),
    ]

    operations = [
        migrations.CreateModel(
            name='MunicipalTaxRates',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('census_subdivision_id', models.IntegerField(null=True)),
                ('municipality_name', models.CharField(max_length=127)),
                ('municipality_type', models.CharField(max_length=127)),
                ('regional_district_code', models.CharField(max_length=127)),
                ('tax_rate_purpose', models.CharField(max_length=127)),
                ('residential_tax_rate', models.FloatField(null=True)),
                ('utilities_tax_rate', models.FloatField(null=True)),
                ('supportive_housing_rax_rate', models.FloatField(null=True)),
                ('major_industry_tax_rate', models.FloatField(null=True)),
                ('light_industry_tax_rate', models.FloatField(null=True)),
                ('business_tax_rate', models.FloatField(null=True)),
                ('managed_forest_land_tax_rate', models.FloatField(null=True)),
                ('recreational_non_profit_tax_rate', models.FloatField(null=True)),
                ('farm_tax_rate', models.FloatField(null=True)),
            ],
            options={
                'ordering': ('census_subdivision_id',),
            },
        ),
        migrations.AlterModelOptions(
            name='csdcentroid',
            options={},
        ),
        migrations.AlterField(
            model_name='csdcentroid',
            name='census_year',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='csdcentroid',
            name='object_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='csdcentroid',
            name='x',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='csdcentroid',
            name='y',
            field=models.FloatField(),
        )
    ]