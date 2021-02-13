import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import L from "leaflet";

import "./map.css";
import ChangeView from "../ChangeView/ChangeView";
import AddLocationMarker from "../AddMarker/AddMarker";
import ResourceMarker from "../AddMarker/ResourceMarker";

/* eslint-disable no-unused-vars */
export default function Map({
  nearbyResources,
  coords,
  setCoords,
  resourceIds,
  setNearbyResources,
  setAddress,
}) {
  const changeView = (centerCoords) => centerCoords;
  const [geoData, setGeoData] = useState({});
  const [bounds, setBounds] = useState("");
  // const [url, setUrl] = useState("");

  const boundsString =
    "-123.4468460083008%2C48.56672520488946%2C-123.34384918212892%2C48.62349154574442";

  const str = "1188753.04%2C397932.21%2C1196127.68%2C404508.68";
  const url2 = `https://openmaps.gov.bc.ca/geo/pub/wms?service=WMS&version=1.1.1&request=GetMap&layers=pub%3AWHSE_IMAGERY_AND_BASE_MAPS.GSR_SCHOOLS_K_TO_12_SVW&bbox=${boundsString}&width=500&height=600&srs=crs%3A84&format=image%2Fjpeg`;

  const url = `https://openmaps.gov.bc.ca/geo/pub/wms?service=WMS&version=1.1.1&request=GetMap&layers=pub%3AWHSE_IMAGERY_AND_BASE_MAPS.GSR_SCHOOLS_K_TO_12_SVW&bbox=${str}&width=500&height=600&srs=EPSG%3A3005&format=image%2Fpng`;

  const wmsLayer = L.tileLayer.wms(
    "https://openmaps.gov.bc.ca/geo/pub/wms?service=WMS&version=1.1.0&request=GetMap&layers=pub%3AWHSE_IMAGERY_AND_BASE_MAPS.BCNC_BC_NETWORK_COVERAGE_SV&bbox=1188753.04%2C397932.21%2C1196127.68%2C404508.68&width=500&height=600&srs=EPSG%3A3005&format=image%2Fjpeg"
  );

  return (
    <MapContainer
      center={coords}
      // zoom={2}
      zoom={5}
      scrollWheelZoom
      style={{ width: "100%", height: "100%" }}
    >
      {coords[0] !== 54.1722 ? <ChangeView center={coords} /> : null}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
        opacity={0.3}
        zIndex={1000}
        url={url2}
        transparent
        noWrap
        maxZoom={5}
        // version="1.3.0"
        // styles={{}}
        // layers="3601:Schools_Public_All"
        // srs="EPSG:4326"
        // format="image/png"
      /> */}
      <MapConsumer>
        {(localMap) => {
          const bb = localMap.getBounds().toBBoxString();
          console.log(bb);
          useEffect(() => {
            setBounds(bb);
          });
          return null;
        }}
      </MapConsumer>
      {/* <Test setUrl={setUrl} setBounds={setBounds} /> */}
      <AddLocationMarker
        setCoords={setCoords}
        setAddress={setAddress}
        resourceIds={resourceIds}
        setNearbyResources={setNearbyResources}
        changeView={changeView}
      />
      {/* <Polygon pathOptions={{ color: "purple" }} positions={multiPolygon} /> */}
      {coords[0] !== 54.1722 ? (
        <Marker position={coords}>
          <Popup>
            Lat: {coords[0]} Long: {coords[1]}
          </Popup>
        </Marker>
      ) : null}
      {JSON.stringify(nearbyResources) !== "{}"
        ? Object.entries(nearbyResources).map(([resource, resourceData]) => (
            <ResourceMarker
              key={resource}
              resourceName={resource}
              resources={resourceData}
            />
          ))
        : null}
    </MapContainer>
  );
}

Map.defaultProps = {
  nearbyResources: {},
};

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  nearbyResources: PropTypes.shape({
    resource: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape),
  }),
  resourceIds: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  setNearbyResources: PropTypes.func.isRequired,
  setCoords: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};
