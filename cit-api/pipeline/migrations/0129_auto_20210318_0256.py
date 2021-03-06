# Generated by Django 2.2.16 on 2021-03-18 02:56

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0128_bcassessmentcensussubdivision_bcassessmenteconomicregion_bcassessmentregionaldistrict'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bcfloodplain',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='bcfloodplain',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='censuseconomicregion',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='censuseconomicregion',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='censussubdivision',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='censussubdivision',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='community',
            name='point',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='healthauthorityboundary',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='healthauthorityboundary',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='indianreservebandname',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='indianreservebandname',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='lake',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='lake',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='location',
            name='point',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='municipality',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='municipality',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='naturalresourceregion',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='naturalresourceregion',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='geo_position',
            field=django.contrib.gis.db.models.fields.PointField(srid=4326),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='parcel_geometry',
            field=django.contrib.gis.db.models.fields.PolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='permittedmajormines',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='permittedmajormines',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='provincialelectoraldistrict',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='provincialelectoraldistrict',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='railway',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='railway',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='regionaldistrict',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='regionaldistrict',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='river',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='river',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='road',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='roadsandhighways',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='roadsandhighways',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiLineStringField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='schooldistrict',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='schooldistrict',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='tsunamizone',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='tsunamizone',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='wildfirezone',
            name='geom',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='wildfirezone',
            name='geom_simplified',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(null=True, srid=4326),
        ),
    ]
