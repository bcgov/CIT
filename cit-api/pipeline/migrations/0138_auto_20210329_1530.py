# Generated by Django 2.2.16 on 2021-03-29 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0137_merge_20210324_0000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='opportunity',
            name='opportunity_address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]