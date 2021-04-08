# Generated by Django 2.2.16 on 2021-03-31 16:16

from django.db import migrations

def change_zoning_status(apps, schema_editor):
    LandUseZoning = apps.get_model("pipeline", "LandUseZoning")
    zoning = ["Agriculture", "", "AGRI"]
    new_zoning = LandUseZoning()
    new_zoning.name = zoning[0]
    new_zoning.description = zoning[1]
    new_zoning.code = zoning[2]
    new_zoning.save()

    Opportunity = apps.get_model("pipeline", "Opportunity")
    ARGI_land_use_opportunities = Opportunity.objects.filter(land_use_zoning="ARGI")
    ARGI_ocp_zoning_opportunities = Opportunity.objects.filter(ocp_zoning_code="ARGI")
    for opportunity in ARGI_land_use_opportunities:
        opportunity.land_use_zoning = new_zoning
        opportunity.save()

    for opportunity in ARGI_ocp_zoning_opportunities:
        opportunity.ocp_zoning_code = new_zoning
        opportunity.save()

    LandUseZoning.objects.get(code="ARGI").delete()


def undo_change_zoning_status(apps, schema_editor):
    Opportunity = apps.get_model("pipeline", "Opportunity")
    LandUseZoning = apps.get_model("pipeline", "LandUseZoning")
    zoning = ["Agriculture", "", "ARGI"]
    old_zoning = LandUseZoning()
    old_zoning.name = zoning[0]
    old_zoning.description = zoning[1]
    old_zoning.code = zoning[2]
    old_zoning.save()
    ARGI_land_use_opportunities = Opportunity.objects.filter(land_use_zoning="AGRI")
    ARGI_ocp_zoning_opportunities = Opportunity.objects.filter(ocp_zoning_code="AGRI")
    for opportunity in ARGI_land_use_opportunities:
        opportunity.land_use_zoning = old_zoning
        opportunity.save()

    for opportunity in ARGI_ocp_zoning_opportunities:
        opportunity.ocp_zoning_code = old_zoning
        opportunity.save()

    LandUseZoning.objects.get(code="AGRI").delete()

class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0138_auto_20210329_1530'),
    ]

    operations = [
        migrations.RunPython(change_zoning_status, undo_change_zoning_status),
    ]