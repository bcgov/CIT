import axios from "axios";

export const getPID = async (siteId) =>
  axios
    .get(`https://geocoder.api.gov.bc.ca/parcels/pids/${siteId}.json`, {
      headers: {
        apikey: process.env.REACT_APP_PROD_KEY,
      },
    })
    .then((data) => {
      if (data.data.pids.includes("|")) {
        return data.data.pids.split("|");
      }
      return [data.data.pids];
    })
    .catch((err) => {
      console.log("Error retrieving PIDs: ", err);
      return null;
    });

export async function getParcelData(pid) {
  const url = `https://openmaps.gov.bc.ca/geo/pub/WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application%2Fjson&TypeNames=pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW&srsName=EPSG%3A3005&cql_filter=PID='${pid}'`;
  return axios
    .get(url)
    .then((data) => {
      if (data.data.features.length) {
        return data;
      }
      return null;
    })
    .catch(() => null);
}
