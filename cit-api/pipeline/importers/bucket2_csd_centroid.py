import csv

from pipeline.importers.base_importer import BaseImporter
from pipeline.models.csd_centroid import CSDCentroid



class CSDCentroidImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2csd_centroid.json"]

    @classmethod
    def etl(cls, filepath):
        num_records = 0
        content = open(filepath)
        csv_reader = csv.reader(content.readlines(), delimiter=",")
        for l, line in enumerate(csv_reader):
            if l == 0:
                continue #skip header row

            entry = CSDCentroid(
                id = line[0],
                name = line[1],
                closest_community_id=line[2],
                closest_community_distance=line[3],
                latitude=line[4],
                census_subdivision_id=line[5],
                location_name=line[6],
                first_responders=line[7],
                diagnostic_facilities=line[8],
                timber_facilities=line[9],
                civic_facilities=line[10],
                airports=line[11],
                port_and_terminal=line[12],
                customs_ports_of_entry=line[13],
                local_govt_offices=line[14],
                laboratory_services=line[15],
                emergency_social_service_facilities=line[16],
                pharmacies=line[17],
                economic_projects=line[18],
                hospitals=line[19],
                service_bc_locations=line[20],
                schools=line[21],
                clinics=line[22],
                courts=line[23],
                post_secondary_institutions=line[24],
                research_centres=line[25],
                public_library=line[26],
                is_within_50km=line[27],
                longitude=line[28],
                location_type_id=line[29],
                location_website=line[30],
            )
            entry.save()
            num_records += 1
        return num_records