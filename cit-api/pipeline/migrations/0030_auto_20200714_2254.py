# Generated by Django 2.2.13 on 2020-07-14 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0029_location_location_fuzzy'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='num_courts',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='community',
            name='num_hospitals',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='community',
            name='num_schools',
            field=models.IntegerField(null=True),
        ),
    ]
