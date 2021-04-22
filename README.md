# B.C. Community Information Hub

This repo contains the B.C. Community Investment Opportunity Tool and the Community Information Dashboard.

## B.C. Community Investment Opportunity Tool

The Community Investment Opportunity Tool is a place where Economic Development Officers (EDO) can go to post possible investment opportunities for their respective communities. This tool includes a user authenticated portion where EDO's can go to see their currently posted investment opportunities as well as post new ones. It also includes a public facing view where possible investors can go to see all the currently available opportunities in the province or narrow down the opportunities on a set of filterable
criteria.

## B.C. Community Information Dashboard

The Community Information Dashboard is a dashboard for authenticated users and the public to get insight and statistics on communities around the province. The tool provides multiple ways for the information to be viewed including: Filtering by amenities and services, Regional district or municipality, and community type. The authenticated view allows Ministry employees greater access and control over the data for reports this includes restricted and sensitive data.

## Installation

Clone the project.

```
git clone https://github.com/bcgov/CIT
```

Install [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/).

Copy a local config template:

```
cp .env.template .env
```

To run the entire project in Docker use:

```
docker-compose up -d --build
```

If you wish to run the cit-web outside of docker for hot reloading you can run:

```
docker-compose up db -d --build
docker-compose up cit-api -d --build
```

and then to run the CIT 2.0 front end see the cit-web [readme](/cit-web/readme.md). To run the Community investment tool see [readme](/cit3.0-web/readme.md).

Once the app is running you can access the CIT 2.0 frontend app at `http://localhost:8080`, the Community Investment Tool Front end at `http://localhost:3000`, the Django app api at `http://localhost:8000/api` and the swagger documentation at `http://localhost:8000/swagger/`. To access the database use the proper user and port 5432.

You can create a new terminal, and run commands to interact with the application. `docker-compose ps` to show services, and `docker-compose exec web bash` to open a shell in inside the django service.

## Importing Data

See [DATA.md](DATA.md)

## Development

### VSCode (Front end Development)

If the editor of choice is Visual Studio Code during development, one can have automatic linting enabled

In Files -> Settings -> Workspace -> Open Settings access the settings.json and add:

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
 }
```

To run the linting manually run the following commands from the cit-web folder.

To display linting errors.

```
yarn lint
```

To auto fix linting errors.

```
yarn lint:fix
```

### Django Testing

To run the Django unit tests for the api use the following command from within the cit-api directory:

```
python3 runtests.py
```

or to run them in the cit-api docker container:

```
docker exec -it cit_cit-api_1 bash
python3 runtests.py
```

to target and run only specific tests you can use:

```
python manage.py test /path/to/your/test --settings=admin.test_settings
```

All tests are found under the tests directory in the cit-api and should be added to models views or serializers based on what they are testing.

## Deployment

#todo when worked out.

## How to Contribute

If you would like to contribute please follow the [contributing](CONTRIBUTING.md) readme.
