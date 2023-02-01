-- This create the two users (The PowerBI Read Only user and the Azure user used in the test DB.)
CREATE USER cit_pbi;
CREATE USER pchgulfv;

-- These below extensions are already installed with this psql docker image
-- CREATE EXTENSION postgis;
-- CREATE EXTENSION pgrouting;
-- CREATE EXTENSION pg_buffercache SCHEMA public;
-- CREATE EXTENSION pg_stat_statements SCHEMA public;

-- pg_restore --no-owner --host=localhost --port=5432 --username=postgres --dbname=cittest1 chris_cit.dump
-- psql --host=localhost --port=5432 --username=postgres cittest1 < chris_cittest1.sql
