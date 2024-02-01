import json, requests
import pandas as pd

from sqlalchemy import create_engine
from django.conf import settings
from urllib.request import urlopen
from zipfile import ZipFile
from io import BytesIO

from pipeline.models.general import NBDPHHSpeeds
from pipeline.importers.base_importer import BaseImporter
from pipeline.importers.utils import write_to_db
class NBDPHHSpeedsImporter(BaseImporter):
    DATA_SOURCES = ["data/import/bucket2/semiannually/2NBDPHHSpeeds.json"]

    @classmethod
    def etl(cls, url) -> int:
        s = requests.get(url)
        if s.ok:
            resp = urlopen(url)
            zipfile = ZipFile(BytesIO(resp.read()))
            with zipfile.open("PHH_Speeds_Current-PHH_Vitesses_Actuelles_BC.csv") as f:
                fields = [
                    "PHH_ID",
                    "Combined_lt5_1_Combine",
                    "Combined_5_1_Combine",
                    "Combined_10_2_Combine",
                    "Combined_25_5_Combine",
                    "Combined_50_10_Combine",
                ]
                PHH_BC = pd.read_csv(f, header=0, delimiter=",", usecols=fields)
                PHH_BC.rename(
                    columns={
                        PHH_BC.columns[0]: "phh_id",
                        PHH_BC.columns[1]: "combined_lt5_1",
                        PHH_BC.columns[2]: "combined_5_1",
                        PHH_BC.columns[3]: "combined_10_2",
                        PHH_BC.columns[4]: "Combined_25_5",
                        PHH_BC.columns[5]: "combined_50_10",
                    },
                    inplace=True,
                )
            with zipfile.open(
                "PHH_Speeds_Government_Support-PHH_Vitesses_Appui_Gouvernement_BC.csv"
            ) as f:
                fields = ["PHH_ID", "Combined_50_10_Combine"]
                PHH_Gov_Suup = pd.read_csv(f, delimiter=",", usecols=fields)
                PHH_Gov_Suup.rename(
                    columns={
                        PHH_Gov_Suup.columns[0]: "phh_id",
                        PHH_Gov_Suup.columns[1]: "combined_50_10_gov_supp",
                    },
                    inplace=True,
                )
            nbdphhspeeds = PHH_BC.merge(PHH_Gov_Suup, on="phh_id", how="left")
            write_to_db(NBDPHHSpeeds,nbdphhspeeds)
            return len(nbdphhspeeds)