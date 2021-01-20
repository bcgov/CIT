# Data Sources and Importing Data

There are three main types of data: BC Data Catalogue API, CSV files, and SHP files. These are enumerated in `./web/pipeline/constants.py`. The list of datasets used in this project is detailed in `./web/pipeline/data_sources.json` and this is imported into the `DataSource` model.

## Prepping Data

Some data are loaded from locally stored csv (located in in ./web/data) or shapefiles since they have no public API.

In addition, some of the shapefiles contain polygons for all of Canada, and can be preprocessed to filter to BC only.

Roads need to be trimmed for upload to mapbox.
https://open.canada.ca/data/en/dataset/00a331db-121b-445d-b119-35dbbe3eedd9
```
unzip NBD_Roads_ShapeFile.zip
cd NBD_Roads_ShapeFile
ogr2ogr -t_srs EPSG:4326 ll.shp NBD_ROAD_SPEEDS.shp
ogr2ogr -clipsrc -140 48 -115 60 BC_Roads.shp ll.shp
cd ..
mkdir BC_Roads
mv NBD_Roads_ShapeFile/BC_Roads* BC_Roads/
```

Hexes can be pre-processed as follows: 
```
wget <nbd site>/CHX_EXO_geo.kmz
ogr2ogr -f kml -t_srs EPSG:4326 hexes.kml CHX_EXO_geo.kmz
ogr2ogr -f kml -clipsrc -144 48 -110 60 hexbc.kml hexes.kml
```

Census Subdivision pre-processing:
```
ogrinfo -so web/data/lcsd000b16a_e.zip
unzip lcsd000b16a_e.zip
ogr2ogr -t_srs EPSG:4326 census.shp lcsd000b16a_e.shp
mkdir census
mv census* census
zip census.zip census/*
ogr2ogr -clipsrc -144 48 -110 60 census_bc.zip census.zip
```


## Importing Data

Some data must be downloaded locally (data bc warehouse resources). Download all local datasets to the `data` folder. ie, the census subdiv geometry:
```
wget http://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/files-fichiers/2016/lcsd000b16a_e.zip
mv lcsd000b16a_e.zip web/data/
```

This SRS is not recognized in this file, so reprojecting is necessary.
```
unzip lcsd000b16a_e.zip
ogr2ogr -t_srs EPSG:4326 census.shp lcsd000b16a_e.shp
mkdir census
mv census* census/
zip census.zip census/*
```

To import all data, run:

```
docker-compose exec web python manage.py bootstrap
```

Note: In production environments, the django application uses the unprivileged Postgres user `django` (without write permissions). In order to import any data, we need to switch to the `migrator` user (the `--settings=web.settings_migrator` flag, which uses the database settings in `settings_migrator.py`):

```
docker-compose exec web python manage.py bootstrap --settings=web.settings_migrator
```

Alternatively, resources can be imported individually.

import local shapefiles
```
docker-compose exec web python manage.py import_shp all
```

import local csv files
```
docker-compose exec web python manage.py import_csv all
```

import data from databc
```
docker-compose exec web python manage.py import_databc all
```

Use the `all` parameter in the three above commands to import all resources from each source, or see `web/data/data_sources.json` for a list of valid resources to import individually.

## Updating data

Datasets from the BC Data Catalogue API (`source_type="api"`) can be updated by re-importing those resources. Rerunning the importers will update existing rows in the database, import any new ones, and update the `last_updated` date for this dataset on the DataSource model.

For datasets that import from CSV or SHP files, you will need to download the updated files and place them in `./web/data` before rerunning the importer. (Note: the `source_file_path` on the DataSource will need to match the file you're importing from. If this has changed, either update your filename or the `source_file_path` on the DataSource instance.)

## Adding new datasets

See [ADDING_NEW_DATA.md](ADDING_NEW_DATA.md).
