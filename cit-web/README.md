# CIT Web Service

This application contains the Community Information Tool web interface.

## Community Information Tool

This is an embedded PowerBI report in addition to a home page and web interface. 
The home page allows a user to choose to view the public report or to use their IDIR to log in 
to view the internal report. A logged-in user can view either the internal report or the public report. 
The data viewing functionality is implemented in the PowerBI environment. The web interface allows a user 
to Save to PDF (or print) the currently selected report page as well as to create and copy to clipboard a link 
to the Tool for a specific community or regional district.

## Prerequisites

### Copy environment variables

```shell
cp .env.template .env
```

### Ensure the file public/static/env.js exists.

This file contains hardcoded environment values

### Start all CIT docker containers, most importantly `cit-api` and `cit-db`.

```shell
docker-compose up -d cit-api db
```

## Start up the frontend

There are two ways to start the frontend application depending on development purposes.

- ✅ Recommended: Hot-reload Development Server

```shell
yarn start
```

- 🐳 Alternative: Docker-based Static Container

```shell
docker-compose up -d cit-web
```

## Available Scripts

In the project directory, you can run:

```shell
yarn start
```

Runs the app in the development mode.
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits. You will also see any lint errors and warnings in the console.

```shell
yarn test
```

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```shell
yarn build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```shell
yarn lint
```

Runs ESLint on all files and outputs any warnings and errors to the console.

```shell
yarn lint:fix
```

Runs ESLint on all files and automatically fixes any errors found.

## Source Folder structure

`mocks` - scripts to mock objects in unit tests.

`components` - visual components and pages in the application.

`constants` - constants strings and numbers shared across application components.

`contexts` - context like authorization, shared across application components.

`hooks` - component-specific code chunks, intended to match react life cycles.

`layouts` - User authentication layout, for reuse in the page design.

`store` - React redux store files.

`stories` - storybook assets.

`utils` - User authentication page wrappers, for reuse in the router.

## Developer notes

- Hot module reloading with `yarn start` doesn't always bust the build files in the browser. 
  Known areas to refresh the page on an edit is the redux store files in `src/store/`.
- Environment variables must both be entered in .env and src/public/static/env.js for the application to run.


# Updates in CIT 5.0

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