# Generated by Django 2.2.16 on 2021-04-23 15:30

from django.db import migrations, models


def add_preferred_developments(apps, schema_editor):
    PreferredDevelopment = apps.get_model("pipeline", "PreferredDevelopment")
    developments = [
        ["Accommodation and Food Services", "", "FOOD"],
        ["Administrative and Support", "", "ADMIN"],
        ["Advanced manufacturing", "", "ADVMAN"],
        ["Aerospace", "", "AERO"],
        ["Agri technology", "", "AGRIT"],
        ["Agrifoods", "", "AGFOOD"],
        ["Artificial intelligence", "", "ARTINT"],
        ["Arts, Entertainment, and Recreation", "", "ARTS"],
        ["Augmented Reality/Virtual Reality", "", "ARVR"],
        ["Clean Technology", "", "CLNTECH"],
        ["Construction", "", "CONST"],
        ["Educational Services", "", "EDUCAT"],
        ["Entertainment & Digital Media", "", "MEDIA"],
        ["Finance and Insurance", "", "FININS"],
        ["Financial Technology", "", "FINTCH"],
        ["Fishing", "", "FISH"],
        ["Forestry", "", "TREE"],
        ["Health Care and Social Assistance", "", "HLTH"],
        ["Hunting", "", "HUNT"],
        ["Hydrogen Energy", "", "HYDRO"],
        ["Info & Cultural", "", "CULTR"],
        ["Information & Communications", "", "INFO"],
        ["Life Sciences", "", "LIFE"],
        ["Management of Companies and Enterprises", "", "MGMT"],
        ["Mass Timber", "", "TIMB"],
        ["Mining", "", "MINE"],
        ["Nano Technology", "", "NANO"],
        ["Natural Gas", "", "NATGAS"],
        ["Ocean Technology", "", "OCEAN"],
        ["Other", "", "OTHER"],
        ["Professional, Scientific, and Technical Services", "", "PROF"],
        ["Quantum Computing", "", "QUANT"],
        ["Real Estate and Rental and Leasing", "", "RESTAT"],
        ["Retail", "", "RETAIL"],
        ["Shipbuilding", "", "SHIP"],
        ["Technology", "", "TECH"],
        ["Tourism", "", "TOUR"],
        ["Waste Management and Remediation Services", "", "WAST"],
        ["Wholesale Trade", "", "WOTR"]
    ]
    for option in developments:
        p = PreferredDevelopment.objects.filter(code=option[2]).first()
        if p is None:
            new_development = PreferredDevelopment()
            new_development.name = option[0]
            new_development.description = option[1]
            new_development.code = option[2]
            new_development.save()


def undo_add_preferred_developments(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0153_merge_20210419_2350'),
    ]

    operations = [
        migrations.RunPython(add_preferred_developments, undo_add_preferred_developments),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_preferred_development_v2',
            field=models.CharField(blank=True, max_length=255, null=True),
        )
    ]