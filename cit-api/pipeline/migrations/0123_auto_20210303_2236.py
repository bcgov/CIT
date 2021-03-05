# Generated by Django 2.2.16 on 2021-03-03 22:36

from django.db import migrations, models


def populate_statuses(apps, schema_editor):
    ApprovalStatus = apps.get_model("pipeline", "ApprovalStatus")
    statuses = [
        ["Pending Edit from Community User/EDO", "Opportunity has been saved by submitter in an incomplete state.", "NCOM"],
        ["New - Edited", "Opportunity has been udpate by EDO for further review", "NWED"],
        ["Closed/Won", "Opportunity has been Closed or Won.", "CLOS"]
    ]
    # Add New status
    for status in statuses:
        approval_status = ApprovalStatus()
        approval_status.status_name = status[0]
        approval_status.status_description = status[1]
        approval_status.status_code = status[2]
        approval_status.active_status = True
        approval_status.save()

class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0122_auto_20210301_0649'),
    ]

    operations = [
        migrations.RunPython(populate_statuses),
        migrations.AddField(
            model_name='opportunity',
            name='last_admin',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='private_note',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='public_note',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='opportunity',
            name='date_published',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
