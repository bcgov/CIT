# Generated by Django 2.2.13 on 2020-07-21 17:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0033_auto_20200720_1857'),
    ]

    operations = [
        migrations.RenameField(
            model_name='censussubdivision',
            old_name='popluation_percentage_change',
            new_name='population_percentage_change',
        ),
    ]
