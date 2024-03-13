# Generated by Django 4.1.7 on 2024-03-05 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0195_csdsmallbusinesses_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MunicipalLandTitleTransfers',
            fields=[
                ('development_region', models.CharField(max_length=255)),
                ('regional_district', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('municipality', models.CharField(max_length=255, null=True)),
                ('statistic_type', models.CharField(max_length=255, null=True)),
                ('year', models.IntegerField()),
                ('jan_value', models.FloatField(null=True)),
                ('feb_value', models.FloatField(null=True)),
                ('mar_value', models.FloatField(null=True)),
                ('apr_value', models.FloatField(null=True)),
                ('may_value', models.FloatField(null=True)),
                ('jun_value', models.FloatField(null=True)),
                ('jul_value', models.FloatField(null=True)),
                ('aug_value', models.FloatField(null=True)),
                ('sep_value', models.FloatField(null=True)),
                ('oct_value', models.FloatField(null=True)),
                ('nov_value', models.FloatField(null=True)),
                ('dec_value', models.FloatField(null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='community',
            name='has_any_k12_school',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='community',
            name='incorporated',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='community',
            name='is_coastal',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='csdcentroid',
            name='name',
            field=models.CharField(max_length=127),
        )       
    ]