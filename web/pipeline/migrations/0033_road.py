# Generated by Django 2.2.13 on 2020-07-20 06:21

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0032_municipality'),
    ]

    operations = [
        migrations.CreateModel(
            name='Road',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('geom', django.contrib.gis.db.models.fields.LineStringField(srid=4326)),
                ('best_broadband', models.CharField(max_length=5)),
            ],
        ),
    ]
