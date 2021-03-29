import axios from "axios";
import { convertCoords } from "./helpers";
import Config from "../Config";

export const getPID = async (siteId) =>
  axios
    .get(`https://geocoder.api.gov.bc.ca/parcels/pids/${siteId}.json`, {
      headers: {
        apikey: Config.geocoderKey,
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

export async function getParcelDataNoAddress(coords4326) {
  const convertedCoords = convertCoords(coords4326);
  const url = `https://openmaps.gov.bc.ca/geo/pub/WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application%2Fjson&TypeNames=pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW&srsName=EPSG%3A4326&cql_filter=INTERSECTS(SHAPE,POINT(${convertedCoords[0]} ${convertedCoords[1]}))`;
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
