# Generated by Django 2.2.16 on 2022-02-21 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0156_auto_20220215_1916'),
    ]

    operations = [
        migrations.CreateModel(
            name='NBDPHHSpeeds',
            fields=[
                ('phh_id', models.IntegerField(max_length=12, primary_key=True, serialize=False)),
                ('combined_lt5_1', models.BooleanField(default=False)),
                ('combined_5_1', models.BooleanField(default=False)),
                ('combined_10_2', models.BooleanField(default=False)),
                ('combined_25_5', models.BooleanField(default=False)),
                ('combined_50_10', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='PHDemographicDistribution',
            fields=[
                ('phh_id', models.IntegerField(max_length=12, primary_key=True, serialize=False)),
                ('phh_type', models.IntegerField()),
                ('population', models.FloatField()),
                ('total_private_dwellings', models.FloatField()),
                ('private_dwellings_usual_residents_occupied', models.FloatField()),
                ('dbuid_ididu', models.IntegerField()),
                ('hexuid_iduhex', models.TextField()),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
            ],
        ),
    ]