# Generated by Django 2.2.16 on 2021-03-01 04:00

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0120_auto_20210224_1830'),
    ]

    operations = [
        migrations.CreateModel(
            name='BCFloodplain',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('floodplains_bc_area_id', models.CharField(max_length=127)),
                ('name', models.CharField(max_length=127)),
                ('feature_name', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='CensusEconomicRegion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('census_year', models.CharField(max_length=32)),
                ('economic_region_id', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='EAOProjects',
            fields=[
                ('location_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Location')),
                ('project_description', models.CharField(blank=True, max_length=255, null=True)),
                ('type', models.CharField(blank=True, max_length=255, null=True)),
                ('sub_type', models.CharField(blank=True, max_length=255, null=True)),
                ('proponent', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ('id',),
            },
            bases=('pipeline.location',),
        ),
        migrations.CreateModel(
            name='EmergencySocialServiceFacility',
            fields=[
                ('location_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Location')),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('facility_type_code', models.CharField(blank=True, max_length=255, null=True)),
                ('status', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ('id',),
            },
            bases=('pipeline.location',),
        ),
        migrations.CreateModel(
            name='HealthAuthorityBoundary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hlth_authority_id', models.CharField(max_length=32)),
                ('hlth_authority_code', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='LaboratoryService',
            fields=[
                ('location_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Location')),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('type', models.CharField(blank=True, max_length=255, null=True)),
                ('sub_type', models.CharField(blank=True, max_length=255, null=True)),
                ('street_address', models.CharField(blank=True, max_length=255, null=True)),
                ('keywords', models.CharField(blank=True, max_length=255, null=True)),
                ('organization_name', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ('id',),
            },
            bases=('pipeline.location',),
        ),
        migrations.CreateModel(
            name='Lake',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='LocalGovernmentOffice',
            fields=[
                ('location_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Location')),
                ('street_address', models.CharField(blank=True, max_length=255, null=True)),
                ('keywords', models.CharField(blank=True, max_length=255, null=True)),
                ('custodian_org_description', models.CharField(blank=True, max_length=255, null=True)),
                ('occupant_type_description', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ('id',),
            },
            bases=('pipeline.location',),
        ),
        migrations.CreateModel(
            name='NaturalResourceRegion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=127)),
                ('org_unit', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='PermittedMajorMines',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mine_number', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=128, null=True)),
                ('status_desc', models.CharField(max_length=128, null=True)),
                ('op_status_code', models.CharField(max_length=128, null=True)),
                ('permit_no', models.CharField(max_length=128, null=True)),
                ('permitee_name', models.CharField(max_length=128, null=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='PortAndTerminal',
            fields=[
                ('location_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pipeline.Location')),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('keywords', models.CharField(blank=True, max_length=255, null=True)),
                ('custodian_org_description', models.CharField(blank=True, max_length=255, null=True)),
                ('occupant_type_description', models.CharField(blank=True, max_length=255, null=True)),
                ('data_source', models.CharField(blank=True, max_length=255, null=True)),
                ('authority', models.CharField(blank=True, max_length=255, null=True)),
                ('commodities_handled', models.CharField(blank=True, max_length=255, null=True)),
                ('physical_address', models.CharField(blank=True, max_length=255, null=True)),
                ('other_address', models.CharField(blank=True, max_length=255, null=True)),
                ('street_address', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'ordering': ('id',),
            },
            bases=('pipeline.location',),
        ),
        migrations.CreateModel(
            name='ProvincialElectoralDistrict',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('electoral_district_id', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=127)),
                ('ed_abbreviation', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='Railway',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('railway_id', models.IntegerField(help_text='Original ID of data point', null=True)),
                ('track_classification', models.CharField(max_length=32)),
                ('use_type', models.CharField(max_length=32)),
                ('number_of_tracks', models.IntegerField(null=True)),
                ('electrification', models.CharField(max_length=32)),
                ('status', models.CharField(max_length=32)),
                ('name', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=3005)),
                ('operator_english_name', models.CharField(max_length=64)),
                ('owner_name', models.CharField(max_length=32)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='River',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('river_id', models.IntegerField(help_text='Original ID of data point', null=True)),
                ('name', models.CharField(max_length=127)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
                ('geom_simplified', django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005)),
            ],
            options={
                'ordering': ('id',),
            },
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='aer_status',
            new_name='aerodrome_status',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='aircr_acs',
            new_name='aircraft_access_ind',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='data_srce',
            new_name='data_source',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='datasrc_yr',
            new_name='data_source_year',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='descriptn',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='fuel_avail',
            new_name='fuel_availability_ind',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='heli_acs',
            new_name='helicopter_access_ind',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='iata',
            new_name='iata_code',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='mx_rway_ln',
            new_name='max_runway_length',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='num_rway',
            new_name='number_of_runways',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='oil_avail',
            new_name='oil_availability_ind',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='rway_surf',
            new_name='runway_surface',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='seapln_acc',
            new_name='seaplane_access_ind',
        ),
        migrations.RenameField(
            model_name='naturalresourceproject',
            old_name='architect',
            new_name='eao_project_status',
        ),
        migrations.RenameField(
            model_name='naturalresourceproject',
            old_name='clean_energy_ind',
            new_name='project_category',
        ),
        migrations.RenameField(
            model_name='naturalresourceproject',
            old_name='construction_jobs',
            new_name='project_location',
        ),
        migrations.RenameField(
            model_name='naturalresourceproject',
            old_name='construction_subtype',
            new_name='proponent',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='construction_type',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='developer',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='estimated_cost',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='federal_funding',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='green_building_desc',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='green_building_ind',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='municipal_funding',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='operating_jobs',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='project_category_name',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='project_stage',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='project_status',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='provinvial_funding',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='standardized_completion_date',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='standardized_start_date',
        ),
        migrations.RemoveField(
            model_name='naturalresourceproject',
            name='update_activity',
        ),
        migrations.AddField(
            model_name='datasource',
            name='dataset',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='datasource',
            name='import_order',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='censussubdivision',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='censussubdivision',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='community',
            name='point',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='location',
            name='point',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='municipality',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='municipality',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='naturalresourceproject',
            name='project_comments',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='geo_position',
            field=django.contrib.gis.db.models.fields.PointField(srid=3005),
        ),
        migrations.AlterField(
            model_name='regionaldistrict',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='regionaldistrict',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='road',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='schooldistrict',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='schooldistrict',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='tsunamizone',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='tsunamizone',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='wildfirezone',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
        migrations.AlterField(
            model_name='wildfirezone',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=3005),
        ),
    ]