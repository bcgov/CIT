# Generated by Django 2.2.16 on 2021-01-26 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0114_investment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='investment',
            name='address',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
