# Generated by Django 4.1.7 on 2024-02-20 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0191_municipaltaxrates_alter_csdcentroid_options_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CSDCoreHousingNeed',
        ),
        migrations.AlterField(
            model_name='community',
            name='has_any_k12_school',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='community',
            name='incorporated',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='community',
            name='is_coastal',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='nbdphhspeeds',
            name='phh_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='nearest_first_nations',
            field=models.ManyToManyField(blank=True, db_column='nearest_first_nations', to='pipeline.indianreservebanddistance'),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='nearest_municipalities',
            field=models.ManyToManyField(blank=True, db_column='nearest_municipalities', to='pipeline.municipalitydistance'),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='opportunity_preferred_development',
            field=models.ManyToManyField(db_column='opportunity_preferred_development', to='pipeline.preferreddevelopment'),
        ),
        migrations.AlterField(
            model_name='phdemographicdistribution',
            name='phh_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='project',
            name='is_earliest_entry',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='is_latest_entry',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterModelTable(
            name='csdcentroid',
            table='c2021_FeatureToPoint_TableToExcel',
        ),
    ]
