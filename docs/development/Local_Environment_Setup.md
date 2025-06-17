# Local Environment Setup

## Prerequisites

### ⚠ Important Note on using Docker

[Source](https://github.com/bcgov/CONN-CCBC-portal/blob/main/local_setup/README.md#when-using-docker)

If you are a part of the B.C. government developer ecosystem, as of April 10, 2024, 
the following options are recommended over docker Desktop:

🐋 _You can still use some docker tools like Docker CLI but not paid and metered Docker tools 
including Docker Desktop and Docker Hub_.

- [Podman](https://podman.io/)
- [Rancher](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/other-installation-methods/rancher-on-a-single-node-with-docker)
- [Portainer](https://www.portainer.io/)
- [Colima](https://github.com/abiosoft/colima)

## Installation

1. Clone the project:

```shell
git clone https://github.com/bcgov/CIT

```

2. Install [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/) or any other containerization solution.

Copy a local config template for each project(cit-api, cit-web) if not already exists.

eg: for `cit-api` in `/cit-api` directory

```shell
cp .env.template .env

```

### Running the project in docker

To start the entire project in Docker:

```shell
docker-compose up -d --build

```

You can create a new terminal and run commands to interact with the application:

```shell
docker-compose ps
```

to show services, and 

```shell
docker-compose exec cit-api bash
```
to open a shell in inside the Django service.

To run a single service or services:

```shell
docker-compose up [service_name(s)] -d --build
```

You can create a new terminal, and run commands to interact with the application. For example:

```shell
docker-compose exec cit-api bash
```

to open a shell in inside the Django service.

### Running on hot reload mode

If you wish to run the cit-web outside of docker for hot reloading, you can run:

```shell
docker-compose up db -d --build
docker-compose up cit-api -d --build
```

And then to run the Community investment tool see [README](https://github.com/bcgov/CIT/blob/develop/cit-web/README.md).

Once the app is running you can access the Community Investment Tool Front end at 
[http://localhost:3000](http://localhost:3000), 
the Django app api at [http://localhost:8000/api/](http://localhost:8000/api/) and the swagger documentation 
at [http://localhost:8000/swagger/](http://localhost:8000/swagger/).
To access the database use the proper user and port `5432`.

You can create a new terminal, and run commands to interact with the application. 

```shell
docker-compose ps
```
to show services, and 

```shell
docker-compose exec cit-api bash
``` 

to open a shell in inside the django service.

## Docker containers

CIT consists of three main docker containers when running locally, these are defined in `docker-compose.yml` 
and respective Dockerfiles.

- `cit-web` - Builds and hosts `./cit-web` on port 80, utilizing npm and nginx.
- `cit-api` - Builds and hosts `./cit-api` on port 8000, utilizing python 3.6, in addition to providing 
  swagger on `*:8000/swagger/`
- `db` - Stands up a Postgres database for cit-api to use on port 5432

## Development

### VSCode (Front end Development)

If the editor of choice is Visual Studio Code during development, one can have automatic linting enabled.

In Files → Settings → Workspace → Open Settings, access the settings.json and add:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
 }
```

To run the linting manually run the following commands from the cit-web folder.

To display linting errors.

```shell
yarn lint
```

To auto fix linting errors.

```shell
yarn lint:fix
```

### Django Testing

To run the Django unit tests for the api use the following command from within the cit-api directory:

```shell
python3 tests/runtests.py
```

or to run them in the cit-api docker container:

```shell
docker exec -it cit_cit-api_1 bash
python3 tests/runtests.py
```

to target and run only specific tests you can use:

```shell
python manage.py test /path/to/your/test --settings=admin.test_settings
```

All tests are found under the tests directory in the cit-api and should be added to models views or serializers 
based on what they are testing.
