# Generated by Django 2.2.16 on 2022-04-24 16:35

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0174_auto_20220423_2309'),
    ]

    operations = [
        migrations.CreateModel(
            name='BCWildfireZone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zone_id', models.IntegerField(null=True)),
                ('centre_name', models.CharField(max_length=127, null=True)),
                ('zone_name', models.CharField(max_length=127, null=True)),
                ('headquarter_city_name', models.CharField(max_length=127, null=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326)),
            ],
        ),

        migrations.RemoveField(
            model_name='wildfirezone',
            name='zone_name',
        ),
    ]