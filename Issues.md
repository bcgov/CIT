NGINX errors out if the front end doesn't start first, but there are no dependencies set between containers in the docker-compose

On Windows, the docker compose modifies over 100 files in git, affecting line endings

On Windows, the .sh files don't work when they're run in the container because they are initially cloned with CRLFs instead of LFs

Yarn install is inconsistent and sometimes has an error partway through, requiring a deletion of the node_modules folder

cit-web freezes up during yarn install inside docker container sometimes

Files are referenced in the documentation that don't exist in the repo, such as data_sources.json

Incomplete readme, some sections left with TODOs in them

Application is hard coded to run in a docker container, working in local development requires undocumented config changes for different pieces to communicate with each other

The census data stat can datasource has a certificate issue that causes an error in the data import pipeline: 
    https://www12.statcan.gc.ca/rest/census-recensement/CR2016Geo.json?lang=E&geos=CSD&cpt=59
    https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?dguid= 

The census data stat can datasource seems to be going down randomly

Not clear where to get all of the data sources required for the database data

Data import pipeline has some code that breaks the json that it's trying to read, resulting in errors

