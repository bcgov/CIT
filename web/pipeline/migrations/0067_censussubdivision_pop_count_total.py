# Generated by Django 2.2.13 on 2020-08-26 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0066_auto_20200826_2239'),
    ]

    operations = [
        migrations.AddField(
            model_name='censussubdivision',
            name='pop_count_total',
            field=models.IntegerField(null=True),
        ),
    ]
