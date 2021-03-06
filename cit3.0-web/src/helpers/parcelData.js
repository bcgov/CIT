import axios from "axios";

export const getPID = async (siteId) =>
  axios
    .get(`https://geocoder.api.gov.bc.ca/parcels/pids/${siteId}.json`, {
      headers: {
        apikey: process.env.REACT_APP_PROD_KEY,
      },
    })
    .then((data) => {
      console.log("PID: ", data.data.pids);
      // parse here
      return data.data.pids;
    });

// TODO -> make sure to parse data as it may contain comma separated list of PIDS,
// will need to then retrieve for each etc
// run multiple calls or build up query string
export async function getParcelData(pid) {
  const url = `https://openmaps.gov.bc.ca/geo/pub/WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application%2Fjson&TypeNames=pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW&srsName=EPSG%3A3005&cql_filter=PID='${pid}'`;
  return axios.get(url);
}
