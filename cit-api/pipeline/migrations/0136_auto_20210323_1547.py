# Generated by Django 2.2.16 on 2021-03-23 15:47

from django.db import migrations, models

def populate_statuses(apps, schema_editor):
    LandUseZoning = apps.get_model("pipeline", "LandUseZoning")
    LandUseZoning.objects.get(code="INDH").delete();
    zonings = [
        ["Industrial (Heavy)", "", "INDH"]
    ]
    # Add new zone
    for zoningInfo in zonings:
        zoning = LandUseZoning()
        zoning.name = zoningInfo[0]
        zoning.description = zoningInfo[1]
        zoning.code = zoningInfo[2]
        zoning.save()


def unpopulate_statuses(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0135_merge_20210322_2156'),
    ]

    operations = [
        migrations.AddField(
            model_name='opportunity',
            name='network_at_road',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='network_avg',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.RunPython(populate_statuses, unpopulate_statuses),
    ]
