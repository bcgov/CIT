import proj4 from "proj4";
import { geojsonToWKT } from "@terraformer/wkt";

export const convert3005CoordsTo4326 = (coords) => {
  const defString =
    "+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
  proj4.defs("EPSG:3005", defString);
  const converted = proj4(proj4("EPSG:3005"), proj4("EPSG:4326"), [
    coords[1],
    coords[0],
  ]);
  return [converted[1], converted[0]];
};

export const convert4326CoordsTo3005 = (coords) => {
  const defString =
    "+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
  proj4.defs("EPSG:3005", defString);
  const converted = proj4(proj4("EPSG:4326"), proj4("EPSG:3005"), [
    coords[1],
    coords[0],
  ]);
  return converted;
};

export const geoJSONToString = (geom) => {
  if (!geom.coordinates) {
    return null;
  }
  const geoJSON = {
    type: geom.type,
    coordinates: geom.coordinates,
  };
  return `SRID=3005;${geojsonToWKT(geoJSON)}`;
};
