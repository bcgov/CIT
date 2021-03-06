# Generated by Django 2.2.16 on 2021-03-22 18:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0133_auto_20210322_1831'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='opportunity',
            name='community_id',
        ),
        migrations.AddField(
            model_name='opportunity',
            name='nearest_community',
            field=models.ForeignKey(blank=True, db_column='nearest_community', null=True, on_delete=django.db.models.deletion.SET_NULL, to='pipeline.CommunityDistance'),
        ),
    ]
