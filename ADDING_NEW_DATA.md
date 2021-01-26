# Adding new datasets

There are three main sources of data: BC Data Catalogue API, CSV files, and SHP files.

To add new datasets:

- Add an entry to `./web/data/data_sources.json`.
- Update data sources (the `DataSource` model) in database:
```
docker-compose exec web python manage.py import_data_sources
```

Note: In production environments, the django application uses the unprivileged Postgres user `django` (without write permissions). In order to import any data, we need to switch to the `migrator` user (the `--settings=web.settings_migrator` flag, which uses the database settings in `settings_migrator.py`):

```
docker-compose exec web python manage.py import_data_sources --settings=web.settings_migrator
```

- Create a Django model for the new dataset.

## Importing location assets
_Location assets_ (location points that are associated with communities) should be put in `./web/pipeline/models/location_assets.py` and should inherit from the `Location` base model. Most of the other models should go into `./web/pipeline/models/general.py`. (Copy from a similar model to use as an example.)

Location assets have these required constants:
```
LATITUDE_FIELD = 'LATITUDE_COLUMN_NAME'
LONGITUDE_FIELD = 'LONGITUDE_COLUMN_NAME'
NAME_FIELD = 'NAME_COLUMN_NAME'
```
Replace these values with the column name in the original dataset.

In addition, these are optional constants, and if these are included, then these fields will be imported into the `location_phone`, `location_email`, `location_website` fields. (See the `Location` base model for more information about the shared fields.)
```
PHONE_FIELD = 'PHONE_NUMBER_COLUMN_NAME'
WEBSITE_FIELD = 'WEBSITE_COLUMN_NAME'
EMAIL_FIELD = 'EMAIL_ADDRESS_COLUMN_NAME'
```

Any dataset-specific fields can be imported by adding a field matching the column name in the original dataset. For example, in `DiagnosticFacility` we import a column named `ser_cd_dsc` in the original dataset so we have added a matching field in the model. (By convention, Django model field names are lowercase.)

## Importing other datasets

Other models should inherit from Django's base model (i.e. `class CivicLeader(models.Model)`). These datasets may need custom importer code to be written. See `./web/pipeline/importers/csv_resource.py`, `./web/pipeline/importers/databc_resource.py`, and `./web/pipeline/importers/shp_resource.py` for examples.

- After adding a new Django model, run the following command to propagate the changes to the database (i.e. make migrations and migrate the database):
```
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```
- Import your new dataset (replace `MY_RESOURCE_NAME` with the resource `name` field of the new entry you added in data_sources.json, and use the appropriate importer for the data type):
```
docker-compose exec web python manage.py import_databc MY_RESOURCE_NAME
```

## Importing data into PowerBI

Importing data into powerbi happens in the Power Query Editor. To access this, Go to the [Home] tab at the top of the screen, and select [Transform data] in the ribbon under the subsection [Queries].

Along the left you have your current queries. It is likely that they have some specific code in them to handle pagination, delays, or custom column edits. Copy out the majority of a previous queries code by selecting the query, and then selecting [Advanced Editor] from the [Home] ribbon under the [Query] subsection.

Here is an example query:

```
let
    BaseUrl = "https://communityinformationtool.gov.bc.ca/api/pipeline/locations/?format=json",
    LimitPerPage = 1000,
 
    GetPage = (Index) =>
        let Offset  = "offset=" & Text.From(Index * LimitPerPage),
            Limit   = "limit=" & Text.From(LimitPerPage),
            Url   = BaseUrl & "&" & Limit & "&" & Offset,
            Json  = Function.InvokeAfter(() => Json.Document(Web.Contents(Url)), #duration(0,0,0,1)),
            Value = Json[results]
        in  Value,
    
    FirstPage = Json.Document(Web.Contents(BaseUrl & "&limit=" & Text.From(LimitPerPage))),
    EntityCount = FirstPage[count],
    PageCount   = Number.RoundUp(EntityCount / LimitPerPage),
    PageIndices = { 0 .. PageCount - 1 },
    Pages       = List.Transform(PageIndices, each GetPage(_)),
    #"Converted to Table" = Table.FromList(Pages, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    #"Expanded Column1" = Table.ExpandListColumn(#"Converted to Table", "Column1"),
    #"Expanded Column2" = Table.ExpandRecordColumn(#"Expanded Column1", "Column1", {"id", "name", "community_id", "location_type", "get_latitude", "get_longitude", "location_fuzzy"}, {"id", "name", "community_id", "location_type", "get_latitude", "get_longitude", "location_fuzzy"})
in
    #"Expanded Column2"
```

The important features of this query are the BaseUrl, LimitPerPage, and the last Expanded column.

The BaseUrl points to the API endpoint you have set up previously. It should also have ```?format=json``` at the end.

The LimitPerPage should be left at 1000 unless the dataset is very large per entry and needs to be lowered. 

The last Expanded column is specific to the api endpoint and will describe all of the columns that will be retrieved. This line needs to be edited to conform to the data that is available from the API.

If you need a way to update a large number of columns, an easy trick is to delete this Expanded Column 2 line, remove the ',' from the Expanded Column 1 line so the syntax is correct, and change the very last line to Expanded Column 1.

Now you can press Done and the query preview will show one column. You can select the small icon in the top right of table, To the right of 'Column1' in the row header. This icon will ask you which columns you would like to expand. The default is that all columns are selected (this is what you want). Also be sure to uncheck the 'Use original column name as prefix' as this will make everything Column1.id, Column1.name, etc.... instead of id, name, etc..

Select OK and this query is done. 

Repeat for any other api endpoints you need.








