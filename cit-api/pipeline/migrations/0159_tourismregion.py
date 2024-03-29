# Generated by Django 2.2.16 on 2022-03-14 02:13

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0158_auto_20220308_0413'),
    ]

    operations = [
        migrations.CreateModel(
            name='TourismRegion',
            fields=[
                ('tourism_region_id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('tourism_region_name', models.CharField(max_length=255)),
                ('area_id', models.IntegerField(help_text='Original ID of data point', null=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326)),
                ('feature_area_sqm', models.FloatField(null=True)),
                ('feature_length_m', models.FloatField(null=True)),
            ],
        ),
    ]
