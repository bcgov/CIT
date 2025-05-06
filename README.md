[![Lifecycle:Maturing](https://img.shields.io/badge/Lifecycle-Maturing-007EC6)]()
# B.C. Community Information Hub

## B.C. Community Information Dashboard

The [Community Information Dashboard&#128279;](https://communityinformationtool.gov.bc.ca/cit-dashboard/home) is a dashboard for authenticated users and the public to get insight and statistics on communities around the province. The tool provides multiple ways for the information to be viewed including: Filtering by amenities and services, Regional district or municipality, and community type. The authenticated view allows Ministry employees greater access and control over the data for reports this includes restricted and sensitive data.

## Table of contents

### General
- [Contributing](CONTRIBUTING.md) 
- [Deployment](docs/Deployment.md)

### Local development
- [Setting up a local development environment](docs/Local_Environment_Setup.md)
- [Setting up cit-web local development environment for hot-reload](cit3.0-web/README.md)
- [Importing Data](docs/DATA.md)
- [Django Testing](docs/Local_Environment_Setup.md#django-testing)

### Infrastructure
The infrastructure has evolved over time. Currently the infrastructure is hosted in three locations:
- API and GUI are hosted on Openshift (OCP) run by the BC Gov't Platform Services team. This infrastructure is managed by the HELM charts found in the "Openshift" folder.
- Database and PowerBI Embedded are hosted in a production Resource Group on Azure. This infrastructure is currently unmanned by code. There is a Terraform structure that used be used for the testing environment that never made it into managing production.  However with the migration to OCP much of this has been obsoleted and there's a TODO to clean this up.
- PowerBI Service is hosted on Azure by BG Gov't PowerBI Team.

- [CIT Architecture](docs/CIT-CIOT-Arch-Current.jpg)
- [PowerBI Embedded](docs/PowerBI_Embedded.md)


