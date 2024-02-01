import json
import pandas as pd
from io import BytesIO
from zipfile import ZipFile
from urllib.request import urlopen

from pipeline.models.general import PHDemographicDistribution
from pipeline.importers.base_importer import BaseImporter
from pipeline.importers.utils import write_to_db
class PHDemographicDistributionImporter(BaseImporter):
    DATA_SOURCES = ['data/import/bucket2/semiannually/2phdemographic.json']
    
    
    @classmethod
    def etl(cls, url, linkage_file) -> int:
        resp = urlopen(url)
        if resp.status == 200:
            zipfile = ZipFile(BytesIO(resp.read()))
            with zipfile.open("PHH_2021_CSV/PHH-BC.csv") as f:
                fields = [
                    "PHH_ID",
                    "Type",
                    "Pop2021",
                    "TDwell2021_TLog2021",
                    "URDwell2021_RH2021",
                    "DBUID_Ididu",
                    "HEXUID_IdUHEX",
                    "Latitude",
                    "Longitude",
                ]
                PHH_BC = pd.read_csv(f, header=0, delimiter=",", usecols=fields)
                #file was moved and csv columns were changed, map them back to col names
                PHH_BC.rename(columns={
                    PHH_BC.columns[0]:"phh_id",
                    PHH_BC.columns[1]:"phh_type",
                    PHH_BC.columns[2]:"population",
                    PHH_BC.columns[3]:"total_private_dwellings",
                    PHH_BC.columns[4]:"private_dwellings_usual_residents_occupied",
                    PHH_BC.columns[5]:"dbuid_ididu",
                    PHH_BC.columns[6]:"hexuid_iduhex",
                    },
                    inplace=True
                )

            linkage = pd.read_csv(linkage_file)
            linkage.rename(
                columns={
                    linkage.columns[0]: "dbuid_ididu",
                    linkage.columns[1]: "census_subdivision_id",
                },
                inplace=True,
            )
            df_all_rows = pd.merge(PHH_BC, linkage, how="left")
            write_to_db(PHDemographicDistribution, df_all_rows)
            return len(df_all_rows)