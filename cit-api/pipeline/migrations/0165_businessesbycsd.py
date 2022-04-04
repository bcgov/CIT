
from django.db import migrations, models
import django.db.models.deletion
class Migration(migrations.Migration):

    dependencies = [
        ('pipeline', '0164_auto_20220331_0455'),
    ]

    operations = [

        migrations.CreateModel(
            name='BusinessesByCSD',
            fields=[
                ('naics_code', models.IntegerField(primary_key=True, serialize=False)),
                ('employee_class', models.IntegerField()),
                ('number_of_businesses', models.IntegerField()),
                ('sector', models.CharField(max_length=127, null=True)),
                ('census_subdivision', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='pipeline.CEN_PROF_DETAILED_CSD_ATTRS_SP')),
            ],
        ),
    ]