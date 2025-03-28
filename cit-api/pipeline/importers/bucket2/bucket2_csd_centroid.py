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
                first_responders=line[7] or None,
                diagnostic_facilities=line[8] or None,
                timber_facilities=line[9] or None,
                civic_facilities=line[10] or None,
                airports=line[11] or None,
                port_and_terminal=line[12] or None,
                customs_ports_of_entry=line[13] or None,
                local_govt_offices=line[14] or None,
                laboratory_services=line[15] or None,
                emergency_social_service_facilities=line[16] or None,
                pharmacies=line[17] or None,
                economic_projects=line[18] or None,
                hospitals=line[19] or None,
                service_bc_locations=line[20] or None,
                schools=line[21] or None,
                clinics=line[22] or None,
                courts=line[23] or None,
                post_secondary_institutions=line[24] or None,
                research_centres=line[25] or None,
                public_library=line[26] or None,
                is_within_50km=line[27] or None,
                longitude=line[28],
                location_type_id=line[29],
                location_website=line[30],
            )
            entry.save()
            num_records += 1
        return num_records