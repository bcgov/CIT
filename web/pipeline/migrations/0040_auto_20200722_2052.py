# Generated by Django 2.2.13 on 2020-07-22 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0039_auto_20200722_1610'),
    ]

    operations = [
        migrations.AddField(
            model_name='community',
            name='percent_25_5',
            field=models.FloatField(default=0, help_text='portion (0-1) of area with 25/5 speeds (calc. by road length)'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='community',
            name='percent_50_10',
            field=models.FloatField(default=0, help_text='portion (0-1) of area with 50/10 speeds (calc. by road length)'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='isp',
            name='name',
            field=models.CharField(max_length=127, unique=True),
        ),
        migrations.AlterUniqueTogether(
            name='service',
            unique_together={('isp', 'hex', 'technology')},
        ),
    ]
