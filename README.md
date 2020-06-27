# Countable Modern Django

A Dockerized boilerplate for a Django API driven web app, with Vue CLI and Postgres based on Countable's standards [here](https://github.com/countable-web/open-source-corporation/tree/master/product/engineering)

## Installation

Clone the project.

Install Docker and docker-compose.

Spin up the project.

```
docker-compose up
```

Your Vue app is served at `http://localhost`

And, your Django app is served at `http://localhost/api`


To create a superuser:

```
docker-compose exec web ./setup.sh
```

You can visit the Django admin at `http://localhost/admin`. The username is `admin`, password is `pass`.

## Features

  * Fully Dockerized, and configured with docker-compose
  * Uses PostgreSQL
  * API-Driven Django. We don't use Django's templates for anything.
  * Uses Nuxt.js
  * Proxies all ports through port 80, the default, including websockets, so there's no need to worry about the port of anything when developing.
