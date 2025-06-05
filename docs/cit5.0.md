In this version of the CIT we've focused on organization and cleanup.

The CIT and CIOT applications evolved from a single application. Due to the business being separate entities 
we elected to break the application into two unique entities.

CIT: https://github.com/bcgov/CIT

> ⚠️ The **CIOT** application is no longer actively maintained and has been **retired**.

CIOT: https://github.com/bcgov/CIOT

The business has also been challenged with the use of Azure and it's current poor support for this project. 
We elected to move to Platform Services supported implementation of Openshift (OCP). During the migration to OCP 
we did the following:
- migrated the build pipeline to use Github Actions and push Docker images to OCP image streams
- migrated all compute instances (API and GUI) to be hosted on OCP using HELM
- we managed to also migrate the database with support of PostGIS, however we ran into issue with granting direct access
- to the database by the PowerBI Service which is an external service on Azure outside our controls. We aren't able to 
- create an Ingres to do this. It was suggested we may be able to use a TSC to grant an external port then request an 
- update to SiS firewall to allow the PowerBI Service through on that port. This was a long shot to get approved and 
- was decided not worth pursuing at this time. We elected to continue hosting the database on our Azure RG.
- On OCP We set up a cron to do a nightly pg_dump of the Azure database. This creates a copy on a secondary service 
- (off Azure) for safe keeping.


Things to consider for future:
- adding functionality to the DB to autoscale on high demands.
- adding functionality to scale up the PowerBI Embedded during hight load / high request periods.
- Add a security group (outside our controls, we have to ask ISB to create it for us) that we can place the PowerBI 
- Embedded service into. This doesn't have any immediate benefits, but it'll set us up for future requirements that 
- are likely to come down on us that restrict access to the PowerBI Service.
- convert the PowerBI Service to use the API rather than direct connections to the DB. With that done we can migrate 
- the DB to OCP.