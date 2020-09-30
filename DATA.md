# Data Sources and Importing Data

## Prepping Data

Some data are loaded from locally stored csv (that you save in ./web/data) and shapefiles since have no public API.

```
mkdir web/data
```

Roads need to be trimmed for upload to mapbox.
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

Use the `all` parameter in the three above commands to import all resources from each source, or see `web/pipeline/constants.py` for a list of valid resources to import individually.
