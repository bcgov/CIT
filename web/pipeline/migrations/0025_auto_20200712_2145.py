# Generated by Django 2.2.13 on 2020-07-12 21:45

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0024_auto_20200711_1833'),
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326)),
            ],
        ),
        migrations.CreateModel(
            name='TsunamiZone',
            fields=[
                ('area_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Area')),
                ('zone_class', models.CharField(max_length=1)),
            ],
            bases=('pipeline.area',),
        ),
        migrations.CreateModel(
            name='WildfireZone',
            fields=[
                ('area_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Area')),
                ('risk_class', models.CharField(max_length=1)),
            ],
            bases=('pipeline.area',),
        ),
        migrations.AddField(
            model_name='community',
            name='tsunami_zone',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='pipeline.TsunamiZone'),
        ),
        migrations.AddField(
            model_name='community',
            name='wildfire_zone',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='pipeline.WildfireZone'),
        ),
    ]
