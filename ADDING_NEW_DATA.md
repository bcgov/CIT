# Adding new datasets

[WIP SY]

There are three main sources of data: BC Data Catalogue API, CSV files, and SHP files.

- add an entry to `/web/data/data_sources.json`.
- update data sources (`DataSource` model) in database:
```
docker-compose exec web python manage.py import_data_sources
```

- create a Django model for the new dataset. location assets (location points that are associated with communities) should be put in location_assets.py and should inherit from the Location base model. most other models should go into general.py (copy from a similar model to use as an example.)
- location assets have these required constants:
```
LATITUDE_FIELD = 'LATITUDE'
LONGITUDE_FIELD = 'LONGITUDE'
NAME_FIELD = 'SV_NAME'
```
replace these values with the column name in the original dataset. (todo: screenshot from databc)

in addition, these are optional constants:
PHONE_FIELD = 'PHONE_NUMBER'
WEBSITE_FIELD = 'WEBSITE'
EMAIL_FIELD = 'EMAIL_ADDRESS'

any dataset-specific fields can be imported by adding a field matching the column name in the original dataset.
e.g. in DiagnosticFacility we import a column named `ser_cd_dsc` in the original dataset so we have added a matching field in the model. (By convention, django model field names are lowercase.)

- make migrations and migrate the database:
```
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```
- add custom importer code, if needed. see `web/pipeline/importers/csv_resource.py`, `web/pipeline/importers/databc_resource.py`, and `web/pipeline/shp_resource.py` for more information.
- import your new dataset (resource_name matches the resource name of the new entry you added in data_sources.json, and use the appropriate importer for the data type):
```
docker-compose exec web python manage.py import_databc resource_name

```
