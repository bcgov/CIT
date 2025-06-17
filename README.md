[![Lifecycle:Maturing](https://img.shields.io/badge/Lifecycle-Maturing-007EC6)]()

# Community Information Tool

The [Community Information Tool](https://communityinformationtool.gov.bc.ca/cit-dashboard/home) compiles over 40 data sets offering insights into regions across B.C. 
with integrated socio-economic, connectivity and community assets data. This interactive tool supports community, 
regional and province-wide planning, which is essential to building thriving communities.

## Table of contents

### General

- [Contributing](docs/development/CONTRIBUTING.md)
- [Deployment](docs/deployment/Deployment.md)

### Local development

- [Setting up a local development environment](docs/development/Local_Environment_Setup.md)
- [Setting up cit-web local development environment for hot-reload](cit-web/README.md)
- [Importing Data](docs/development/DATA.md)
- [Django Testing](docs/development/Local_Environment_Setup.md#django-testing)

### Services
- [CIT Web](cit-web/README.md)
- [CIT API](cit-api/README.md)
- [Importer](docs/IMPORTER.md)

### Infrastructure

The infrastructure has evolved over time. Currently, the infrastructure is hosted in three locations:

🐙 API and GUI are hosted on Openshift (OCP) run by the BC Gov Platform Services team. 
This infrastructure is managed by the HELM charts found in the "Openshift" folder.

🛢️ Database and PowerBI Embedded are hosted in a production Resource Group on Azure Landing Zone. 
Prior to Landing zone this was unmanned by code.

📊 PowerBI Service is hosted on Azure by BG Gov PowerBI Team.

- [CIT Architecture](docs/architecture/CIT-CIOT-Arch-Current.jpg)

### PowerBI

- [PowerBI Embedded](docs/powerbi/PowerBI_Embedded.md)
- [Azure OAuth PowerBI Embedded](docs/powerbi/AZURE_OAUTH_POWERBI-EMBEDDED.md)
- [Power BI Embedding Example](docs/powerbi/Power%20BI%20Embedding.pdf)
