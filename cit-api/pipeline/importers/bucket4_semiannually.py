import json
from pipeline.models.general import DataSource
import concurrent.futures
import urllib.request

# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
def import_data_sources():
    DATA_SOURCES = ['data/import/bucket4/semiannually/4census_economic_region.json', 'data/import/bucket4/semiannually/4courts.json', 'data/import/bucket4/semiannually/4health_authority_boundaries.json', 'data/import/bucket4/semiannually/4indian_reserve_and_band_name.json', 'data/import/bucket4/semiannually/4lakes.json', 'data/import/bucket4/semiannually/4natural_resource_regions.json', 'data/import/bucket4/semiannually/4post_secondary_institutions.json', 'data/import/bucket4/semiannually/4provincial_electoral_district.json', 'data/import/bucket4/semiannually/4railways.json', 'data/import/bucket4/semiannually/4research_centres.json', 'data/import/bucket4/semiannually/4rivers.json', 'data/import/bucket4/semiannually/4road_and_highways.json', 'data/import/bucket4/semiannually/4services.json']
    with concurrent.futures.ThreadPoolExecutor(13) as executor:
        future_to_url = {executor.submit(import_data, url): url for url in DATA_SOURCES}
        for future in concurrent.futures.as_completed(future_to_url):
            url = future_to_url[future]
            try:
                data = future.result()
            except Exception as exc:
                print('%r generated an exception: %s' % (url, exc))
            else:
                print('Data was imported successfully!')    
    
def import_data(filename):    
    with open(filename) as f:
        data_sources = json.loads(f.read())
    for data_source in data_sources:
        dataset, created = DataSource.objects.update_or_create(name=data_source.pop("name"), defaults={**data_source})
        print("dataset", dataset)



