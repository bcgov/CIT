# How the Importer works

The importer is run using the bootstrap.py file in `./cit-api/pipeline/management/commands/bootstrap.py`.

To import all data, run:

```
docker-compose exec web python3 manage.py bootstrap
```

The first step in the import process determines if the environment is **Test** or **Prod**.  The next step creates a file structure in the deployed resource in order to ensure the structure exists for when the newest set of static files are downloaded and imported.

The importer connects to Azure to pull down the static files regardless of if they have been changed. This ensures that the static files are always the most up to date versions.

The most important of these files is the _datasources.json_.  It is a JSON representation of all of the datasources we are importing, along with the location of the file, the resource ID (for the BC data API), or dataset name (for the WMS import).  The order of the resources in _datasources.json_ are the order in which they are imported. The order is important as some data needs to be present for other data to be imported properly. 

The importer first imports the datasources from the JSON file into the database overwriting or updataing what is currently in the table.

There are 4 different types of imports: 
    
* CSV
* WMS
* DATABC API sources
* Shapefiles


Resources fall into 2 categories:
    
* Location resources (_ex. Hospitals_)
    
* Area resources (_ex. School Districts_)

If the resource being imported is a location resource it runs the _import_data_into_point_model_ function - `./cit-api/pipeline/importers/utils`, otherwise it is imported into an Area model via the _import_data_into_area_model_ function in the same file.  Any resource that is being imported as a location resource requires a secondary function to run called calculate_distance() which calls the BC router API to calculate the driving distance between each point and the communities within 50km. This can cause performance issues and greatly increases the time needed to run the import process.

## Known Issues 

* Missing communities in the communities_v6.csv spreadsheet

    - there are communities in BC that are recognized by the province but are not recognized federally
	- since these communities are missing from the sheet and the way the data structure was originally built there is a small workaround for the opportunity tool to get nearest municipality populations.


## Future work

During the course of this project we incurred some technical debt that was not able to be resolved due to the time constraints of this project.  Given more time we would have liked to further explore implementing:

    - restructuring of the data so that the municipality is the central object not the community.
	- decoupling of the import process so that singular imports can be done on just municipalities or census data and so on.



