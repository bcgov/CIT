# Generated by Django 2.2.16 on 2021-04-07 22:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0144_auto_20210407_1822'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublicLibrary',
            fields=[
                ('location_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Location')),
                ('service_point_id', models.CharField(blank=True, max_length=255, null=True)),
                ('library_system_name', models.CharField(blank=True, max_length=255, null=True)),
                ('locality', models.CharField(blank=True, max_length=255, null=True)),
                ('wifi_ind', models.CharField(blank=True, max_length=4, null=True)),
                ('outreach_ind', models.CharField(blank=True, max_length=4, null=True)),
                ('accessibility_ind', models.CharField(blank=True, max_length=4, null=True)),
                ('custodian_org_description', models.CharField(blank=True, max_length=255, null=True)),
                ('postal_code', models.CharField(blank=True, max_length=255, null=True)),
                ('street_address', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ('id',),
            },
            bases=('pipeline.location',),
        ),
    ]
