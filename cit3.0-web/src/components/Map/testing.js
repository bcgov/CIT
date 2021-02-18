import { useMap } from "react-leaflet";

export default function Test({ setUrl, setBounds }) {
  const thisMap = useMap();
  const bounds = thisMap.getBounds().toBBoxString();
  console.log(bounds);
  //   setBounds(bounds);
  setUrl(
    `https://openmaps.gov.bc.ca/geo/pub/wms?service=WMS&version=1.1.0&request=GetMap&layers=pub%3AWHSE_IMAGERY_AND_BASE_MAPS.GSR_SCHOOLS_K_TO_12_SVW&bbox=${bounds}&width=500&height=600&srs=EPSG%3A3005&format=image%2Fjpeg`
  );
  return bounds;
  //   return null;
}
