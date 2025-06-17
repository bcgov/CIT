# Importing Datasets

- [Adding new datasets](#adding-new-datasets)
- [Importing location assets](#importing-location-assets)
- [Importing other datasets](#importing-other-datasets)

## Adding new datasets

There are three main sources of data: BC Data Catalogue API, CSV files, and SHP files.

To add new datasets:

- Add an entry to `./cit-api/data/data_sources.json`.
- Update data sources (the `DataSource` model) in database:

```
docker-compose exec web python manage.py import_data_sources
```

**Note**: In production environments, the django application uses the unprivileged Postgres user `django` 
(without write permissions). To import any data, we need to switch to the `migrator` user 
(the `--settings=cit-api.settings_migrator` flag, which uses the database settings in `settings_migrator.py`):

```shell
docker-compose exec web python manage.py import_data_sources --settings=cit-api.settings_migrator
```

- Create a Django model for the new dataset.

## Importing location assets

_Location assets_ (location points that are associated with communities) should be put in 
`./cit-api/pipeline/models/location_assets.py` and should inherit from the `Location` base model. 
Most of the other models should go into `./cit-api/pipeline/models/general.py`. 
(Copy from a similar model to use as an example.)

Location assets have these required constants:

```
LATITUDE_FIELD = 'LATITUDE_COLUMN_NAME'
LONGITUDE_FIELD = 'LONGITUDE_COLUMN_NAME'
NAME_FIELD = 'NAME_COLUMN_NAME'
```

Replace these values with the column name in the original dataset.

In addition, these are optional constants, and if these are included, then these fields will be 
imported into the `location_phone`, `location_email`, `location_website` fields. (See the `Location` 
base model for more information about the shared fields.)

```
PHONE_FIELD = 'PHONE_NUMBER_COLUMN_NAME'
WEBSITE_FIELD = 'WEBSITE_COLUMN_NAME'
EMAIL_FIELD = 'EMAIL_ADDRESS_COLUMN_NAME'
```

Any dataset-specific fields can be imported by adding a field matching the column name in the original dataset. 
For example, in `DiagnosticFacility` we import a column named `ser_cd_dsc` in the original dataset so we have added a 
matching field in the model. (By convention, Django model field names are lowercase.)

## Importing other datasets

Other models should inherit from Django's base model (i.e. `class CivicLeader(models.Model)`). These datasets may need 
custom importer code to be written. See `./cit-api/pipeline/importers/csv_resource.py`, 
`./cit-api/pipeline/importers/databc_resource.py`, and `./cit-api/pipeline/importers/shp_resource.py` for examples.

- After adding a new Django model, run the following command to propagate the changes to the database 
  (i.e. make migrations and migrate the database):

```
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```

- Import your new dataset (replace `MY_RESOURCE_NAME` with the resource `name` field of the new entry you added 
  in data_sources.json, and use the appropriate importer for the data type):

```
docker-compose exec web python manage.py import_databc MY_RESOURCE_NAME
```