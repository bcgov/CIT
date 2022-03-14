import json
from pipeline.models.general import DataSource
import concurrent.futures
import urllib.request

# need 5 pipelines with each own command for DevOps to build script batch. Regroup the json files to consider the schedule as well.
def import_data_sources():
    DATA_SOURCES = ['data/import/bucket5/semiannually/5airports.json', 'data/import/bucket5/semiannually/5civic_facilities.json', 'data/import/bucket5/semiannually/5clinics.json', 'data/import/bucket5/semiannually/5customs_ports_of_entry.json', 'data/import/bucket5/semiannually/5diagnostic_facilities.json', 'data/import/bucket5/semiannually/5emergency_social_service_facilities.json', 'data/import/bucket5/semiannually/5first_nations_health_authority.json', 'data/import/bucket5/semiannually/5hospitals.json', 'data/import/bucket5/semiannually/5laboratory_service.json', 'data/import/bucket5/semiannually/5local_govt_offices.json', 'data/import/bucket5/semiannually/5pharmacies.json', 'data/import/bucket5/semiannually/5port_and_terminal.json', 'data/import/bucket5/semiannually/5public_library.json', 'data/import/bucket5/semiannually/5schools.json', 'data/import/bucket5/semiannually/5servicebc_locations.json', 'data/import/bucket5/semiannually/5timber_facilities.json']
    with concurrent.futures.ThreadPoolExecutor(16) as executor:
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



