# Generated by Django 2.2.16 on 2021-03-19 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0131_merge_20210319_1625'),
    ]

    operations = [
        migrations.AlterField(
            model_name='opportunity',
            name='opportunity_rental_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='opportunity_sale_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True),
        ),
        migrations.AlterField(
            model_name='opportunity',
            name='parcel_size',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=15, null=True),
        ),
    ]