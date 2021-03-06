# Generated by Django 2.2.16 on 2021-02-23 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0118_auto_20210217_1907'),
    ]

    operations = [
        migrations.RenameField(
            model_name='opportunity',
            old_name='point',
            new_name='geo_position',
        ),
        migrations.RenameField(
            model_name='opportunity',
            old_name='address',
            new_name='opportunity_address',
        ),
        migrations.AddField(
            model_name='opportunity',
            name='business_contact_email',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='business_contact_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='community_link',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='elevation_at_location',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='environmental_information',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_electrical_capacity',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_electrical_connected',
            field=models.CharField(blank=True, choices=[('Y', 'Yes'), ('N', 'No'), ('U', 'Unknown')], max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_link',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_name',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_natual_gas_capacity',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_natual_gas_connected',
            field=models.CharField(blank=True, choices=[('Y', 'Yes'), ('N', 'No'), ('U', 'Unknown')], max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_road_connected',
            field=models.CharField(blank=True, choices=[('Y', 'Yes'), ('N', 'No'), ('U', 'Unknown')], max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_sewer_capacity',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_sewer_connected',
            field=models.CharField(blank=True, choices=[('Y', 'Yes'), ('N', 'No'), ('U', 'Unknown')], max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_water_capacity',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_water_connected',
            field=models.CharField(blank=True, choices=[('Y', 'Yes'), ('N', 'No'), ('U', 'Unknown')], max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='parcel_ownership',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='parcel_size',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='pid',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='soil_drainage',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='soil_name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='soil_texture',
            field=models.TextField(blank=True, null=True),
        ),
    ]
