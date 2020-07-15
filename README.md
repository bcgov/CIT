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

In [Azure Active Directory] under [App registrations] select [New registration]

Enter a Name: APP_NAME

Select: Accounts in any organizational directory (Any Azure AD directory - Multitenant)
## Single tenancy may also work, this is the current setting for this in our initial testing 

Click [Register]

Browse to the newly created App, and look at the [Overview] page

Copy down the Application (client) ID: CLIENT_ID

Open [API permissions] and click [Add a permission]

Select [Power BI Service] and then [Delegated permissions]

Select everything in the [App], [Capacity], [Content], [Dashboard], [Dataflow], [Dataset], [Gateway], [Report], [StorageAccount], and [Workspace] sections

## I think Aaron did this a different way? through some link?

## Perhaps there is something that happened in the [Certificates & secrets] section? It looks like we have some generated

Optionally go to [Groups] in Azure Active Directory

Click [New group], select Security for [Group Type], Add a name: SECURITY_GROUP, and description

It may also require adding Members to this (we have 3 currently)

Now go to [Power BI Embedded] in the main [Azure Portal]

Select [Add], create an instance depending on the processing requirements (A1 low, A2, medium, A4 high, etc..)
## Note that this service is pay per use and will begin billing once it is started, it can be paused to save cost.

Log in to the [Power BI portal](powerbi.microsoft.com)

Hit the cog at the top right and select [Admin portal]

Go to [Tenant settings] and then to [Developer settings] and open the section for [Allow service principals to use Power BI APIs]

Make sure this is Enabled, and Apply to: is set to [the entire organization], alternatively, set a specific security group: SECURITY_GROUP

This would refer back to the security group made in Azure: SECURITY_GROUP

Now go to [Capacity settings] in the [Admin portal]

Select [Power BI Embedded]

If the instance is already made in Azure, there should be a capacity shown here, if it is greyed out, it is probably Paused. Go to azure and Start it. Once its started you can hit the name on the far left, just under [Capacity Name], it is actually a link to the settings. This was very confusing at first and is not well documented, take care to read these instructions to find this.

At the bottom of the page on the right you can click [Assign workspaces], You can select [Specific workspace] and type the one you like. Or you can go to the far left, in the main powerbi menu, select the workspace tab, and under the workspace you want you can select the 4 dots in the side menu and select worskpace settings, you should be able to set the capacity in the [Advanced] drop down, you can select the Azure capacity in a list.

Under the main [Admin portal] select [Workspaces]

Find the workspace you want to use, and there are 3 dots on the right side of the name column on the row of interest, click this and select [Access], enter in the service principal (APP_ID) to the box, select Admin from the list and select [Add]

This should allow the workspace to be called from the API

## Note, if you want to pause the Azure Power BI Instance, it will prevent the page from loading. In a Dev environment, it is useful to run everything on the free service so you can leave it up 24/7 without paying. In order to unassign the workspace from the capacity, either go into the capacity settings (the capacity MUST be active for you to access this page), or in the workspace tab on the left, under the 4 dot menu, you can uncheck [Dedicated capacity] in the advanced tab.

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