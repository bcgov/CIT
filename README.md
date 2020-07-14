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


## Importing Data

Some data must be downloaded locally (data bc warehouse resources). Download all local datasets to the `data` folder. ie, the census subdiv geometry:
```
wget http://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/files-fichiers/2016/lcsd000b16a_e.zip
mv lcsd000b16a_e.zip web/data/
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

## VSCode (Front end Development)

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

## PowerBI REST API OAuth tokens

Log in to the [Azure portal](https://portal.azure.com/).

[TODO: Add info about Azure/PowerBI permissions that need to be configured]

We use the [msal](https://github.com/AzureAD/microsoft-authentication-library-for-python) library for Python to generate OAuth access tokens. To generate a token, send a GET request to `/api/token/`, which will return a JSON object in the following format:

```
{
    "access_token": "[OAUTH ACCESS TOKEN]"
}
```

These access tokens have an expiry time of one hour and are cached in the session. If a token that expires in 30 minutes or later exists, calling the API again will return the existing token.

This token is used in the Authorization header when using the PowerBI REST API:

`Authorization: Bearer [OAUTH ACCESS TOKEN]`

[TODO: Add info about the PowerBI REST API]