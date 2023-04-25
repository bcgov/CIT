FROM artifacts.developer.gov.bc.ca/bcgov-docker-local/patroni-postgres:12.4-latest

USER root
RUN apt-get -y update ;\
    apt-get -y upgrade
RUN apt-get install -y postgresql-postgis postgresql-12-pgrouting postgresql-contrib postgresql-12-pg-qualstats

#-- The below extensions are installed on the server above, but in PSQL the extensions needed to be created.
#-- CREATE EXTENSION postgis;
#-- CREATE EXTENSION pgrouting;
#-- CREATE EXTENSION pg_buffercache SCHEMA public;
#-- CREATE EXTENSION pg_stat_statements SCHEMA public;


USER postgres
