# Generated by Django 2.2.13 on 2020-08-26 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0064_auto_20200826_2058'),
    ]

    operations = [
        migrations.AddField(
            model_name='censussubdivision',
            name='population_count_change',
            field=models.IntegerField(null=True),
        ),
    ]
