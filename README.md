# Countable Modern Django

A Dockerized boilerplate for a Django API driven web app, with Vue CLI and Postgres based on Countable's standards [here](https://github.com/countable-web/open-source-corporation/tree/master/product/engineering)

## Installation

Clone the project.

```
git clone https://github.com/countable/cit
```

Install Docker and docker-compose.


Development
```
cp dc.dev.yml docker-compose.override.yml
```
Staging
```
cp dc.stage.yml docker-compose.override.yml
```
Production
```
cp dc.prod.yml docker-compose.override.yml
```
Spin up the project.

```
docker-compose up
```

For development

Your Vue app is served at `http://localhost:8080`

The Django app is served at `http://localhost/api`

Ports may be configured by editing the port in the `dc.*.yml` files.

To create a superuser:

```
docker-compose exec web ./setup.sh
```

You can visit the Django admin at `http://localhost/admin`. The username is `admin`, password is `pass`.


# Importing Data

Some data must be downloaded locally (data bc warehouse resources). Download all local datasets to the `data` folder. ie, the census subdiv geometry:
```
wget http://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/files-fichiers/2016/lcsd000b16a_e.zip
mv lcsd000b16a_e.zip web/data/
```

import local shapefiles
```
docker-compose exec web python manage.py import_shp all
```

import local csv files
```
docker-compose exec web python manage.py import_csv all
```

Lastly, import data from databc
```
docker-compose exec web python manage.py import_databc all
```

## VSCode (Fronte end Development)

If the editor of choice is Visual Studio Code during development, one can have automatic linting enabled

In Files -> Settings -> Workspace -> Open Settings
```
{
  "editor.formatOnSave": true,
  "vetur.validation.template": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

It is recommended that the Workspace is the `cit-web` folder, and not the `cit` project for this to behave correctly.
