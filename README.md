[![Lifecycle:Maturing](https://img.shields.io/badge/Lifecycle-Maturing-007EC6)]()

# Community Information Tool

The [Community Information Tool](https://communityinformationtool.gov.bc.ca/cit-dashboard/home) compiles over 40 data sets offering insights into regions across B.C. 
with integrated socio-economic, connectivity and community assets data. This interactive tool supports community, 
regional and province-wide planning, which is essential to building thriving communities.

## Table of contents

### General

- [Repository](https://github.com/bcgov/CIT)
- [Contributing](docs/development/CONTRIBUTING.md)
- [Deployment](docs/deployment/Deployment.md)
- [Architecture](docs/architecture/CIT-CIOT-Arch.jpg)
- [Notes and suggestions](#notes-and-suggestions)

### Local development

- [Setting up a local development environment](docs/development/Local_Environment_Setup.md)
- [Setting up cit-web local development environment for hot-reload](cit-web/README.md)
- [Importing Data](docs/data/DATA.md)
- [Django Testing](docs/development/Local_Environment_Setup.md#django-testing)

### Services
- [CIT Web](cit-web/README.md)
- [CIT API](cit-api/README.md)
- [Importer](docs/data/IMPORTER.md)

### Infrastructure

The infrastructure has evolved over time. Currently, the infrastructure is hosted in three locations:

🐙 API and GUI are hosted on Openshift (OCP) run by the BC Gov Platform Services team. 
This infrastructure is managed by the HELM charts found in the "Openshift" folder.

🛢️ Database and PowerBI Embedded are hosted in a production Resource Group on Azure Landing Zone. 
Prior to Landing zone code unmanned this.

📊 PowerBI Service is hosted on Azure by BG Gov PowerBI Team.

- [CIT Architecture](docs/architecture/CIT-CIOT-Arch.jpg)

### PowerBI

- [PowerBI Embedded](docs/powerbi/PowerBI_Embedded.md)
- [Azure OAuth PowerBI Embedded](docs/powerbi/AZURE_OAUTH_POWERBI-EMBEDDED.md)
- [Power BI Embedding Example](docs/powerbi/Power%20BI%20Embedding.pdf)

### Notes and suggestions

The business has also been challenged with the use of Azure and its current poor support for this project. 
We elected to move to Platform Services supported implementation of Openshift (OCP). During the migration to OCP 
we did the following:
- migrated the build pipeline to use GitHub Actions and push Docker images to OCP image streams
- migrated all compute instances (API and GUI) to be hosted on OCP using HELM
- we managed to also migrate the database with support of PostGIS, however, we ran into issue with granting direct access
- to the database by the PowerBI Service which is an external service on Azure outside our controls. We aren't able to 
- create an Ingres to do this. It was suggested we may be able to use a TSC to grant an external port then request an 
- update to SiS firewall to allow the PowerBI Service through on that port. This was a long shot to get approved and 
- it was decided not worth pursuing at this time. We elected to continue hosting the database on our Azure RG.
- On OCP We set up a cron to do a nightly pg_dump of the Azure database. This creates a copy on a secondary service 
- (off Azure) for safe keeping.


Things to consider for future:
- adding functionality to the DB to autoscale on high demands.
- adding functionality to scale up the PowerBI Embedded during a high load / high request periods.
- Add a security group (outside our controls, we have to ask ISB to create it for us) that we can place the PowerBI 
- Embedded service into. This doesn't have any immediate benefits, but it'll set us up for future requirements that 
- are likely to come down on us that restrict access to the PowerBI Service.
- convert the PowerBI Service to use the API rather than direct connections to the DB. With that done, we can migrate 
- the DB to OCP.