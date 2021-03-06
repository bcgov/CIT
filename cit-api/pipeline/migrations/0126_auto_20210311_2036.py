# Generated by Django 2.2.16 on 2021-03-11 20:36

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0125_merge_20210309_2155'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomsPortOfEntry',
            fields=[
                ('location_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Location')),
                ('customs_port_street_address', models.CharField(blank=True, max_length=255, null=True)),
                ('customs_port_type', models.CharField(blank=True, max_length=255, null=True)),
                ('customs_port_municipality', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ('id',),
            },
            bases=('pipeline.location',),
        ),
        migrations.CreateModel(
            name='IndianReserveBandName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=127)),
                ('english_name', models.CharField(max_length=127)),
                ('band_number', models.IntegerField(null=True)),
                ('area_id', models.IntegerField(help_text='Original ID of data point', null=True)),
                ('feature_area_sqm', models.IntegerField(null=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='RoadsAndHighways',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area_id', models.IntegerField(help_text='Original ID of data point', null=True)),
                ('feature_type', models.CharField(max_length=32)),
                ('road_surface', models.CharField(max_length=32)),
                ('road_class', models.CharField(max_length=32)),
                ('name', models.CharField(max_length=127)),
                ('road_name_alias1', models.CharField(max_length=32, null=True)),
                ('road_name_alias2', models.CharField(max_length=32, null=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=3005)),
                ('number_of_lanes', models.IntegerField(null=True)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.RenameField(
            model_name='railway',
            old_name='railway_id',
            new_name='area_id',
        ),
    ]
