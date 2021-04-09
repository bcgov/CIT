import axios from "axios";
import { convertCoords } from "./helpers";

export const buildSoilString = (properties) => {
  const name = properties.SOILNAME_1;
  const texture = properties.TEXTURE_1;
  const drainage = properties.DRAIN_1;
  const soil = `${name || null}, ${texture || null}, ${drainage || null}`;
  return soil;
};

export async function getSoilAndElevationData(coords4326, source) {
  const converted = convertCoords(coords4326);
  const url = `https://openmaps.gov.bc.ca/geo/pub/WHSE_TERRESTRIAL_ECOLOGY.STE_SOIL_SURVEYS_MVW/wfs?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application%2Fjson&TypeNames=pub:WHSE_TERRESTRIAL_ECOLOGY.STE_SOIL_SURVEYS_MVW&srsName=EPSG%3A4326&cql_filter=INTERSECTS(SHAPE,POINT(${converted[0]} ${converted[1]}))`;
  return axios
    .get(url, {
      cancelToken: source.token,
    })
    .then((data) => {
      if (data.data.features.length) {
        return data.data.features[0].properties;
      }
      return null;
    })
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("request cancelled in soil", thrown.message);
      }
      return null;
    });
}
