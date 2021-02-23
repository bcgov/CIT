import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  MapConsumer,
  LayersControl,
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
  isInteractive,
}) {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  let additionalComponents;
  let zoomLevel;

  const changeView = (centerCoords) => centerCoords;
  const [geoData, setGeoData] = useState({});
  const [bounds, setBounds] = useState("");

  const boundsString =
    "-123.4468460083008%2C48.56672520488946%2C-123.34384918212892%2C48.62349154574442";

  const str = "1188753.04%2C397932.21%2C1196127.68%2C404508.68";
  const url2 = `https://openmaps.gov.bc.ca/geo/pub/wms?service=WMS&version=1.1.1&request=GetMap&layers=pub%3AWHSE_IMAGERY_AND_BASE_MAPS.GSR_SCHOOLS_K_TO_12_SVW&bbox=${boundsString}&width=500&height=600&srs=crs%3A84&format=image%2Fjpeg`;

  const url = `https://openmaps.gov.bc.ca/geo/pub/wms?service=WMS&version=1.1.1&request=GetMap&layers=pub%3AWHSE_IMAGERY_AND_BASE_MAPS.GSR_SCHOOLS_K_TO_12_SVW&bbox=${str}&width=500&height=600&srs=EPSG%3A3005&format=image%2Fpng`;

  const wmsLayer = L.tileLayer.wms(
    "https://openmaps.gov.bc.ca/geo/pub/wms?service=WMS&version=1.1.0&request=GetMap&layers=pub%3AWHSE_IMAGERY_AND_BASE_MAPS.BCNC_BC_NETWORK_COVERAGE_SV&bbox=1188753.04%2C397932.21%2C1196127.68%2C404508.68&width=500&height=600&srs=EPSG%3A3005&format=image%2Fjpeg"
  );

  const multiPolygon = [
    [
      [48.59509, -123.4056],
      [48.598, -123.41],
      [48.6, -123.42],
      [48.6, -123.43],
    ],
  ];

  if (isInteractive) {
    // Used in the add opportunity workflow
    additionalComponents = (
      <>
        <ChangeView center={changeView(coords)} zoom={13} />
        <AddLocationMarker
          setCoords={setCoords}
          setAddress={setAddress}
          resourceIds={resourceIds}
          setNearbyResources={setNearbyResources}
          changeView={changeView}
        />
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; <a href="http://www.esri.com/">Esri</a> contributors'
              url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {/* <Polygon pathOptions={{ color: "purple" }} positions={multiPolygon} /> */}
        {coords[0] !== 49.2827 ? (
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
      </>
    );
    zoomLevel = 2;
  } else {
    // Used in the list view of opportunities
    additionalComponents = (
      <>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords} />
      </>
    );
    zoomLevel = 13;
  }

  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <MapContainer
      center={coords}
      zoom={zoomLevel}
      scrollWheelZoom={isInteractive}
      zoomControl={isInteractive}
      attributionControl={isInteractive}
      fadeAnimation={isInteractive}
      zoomAnimation={isInteractive}
      doubleClickZoom={isInteractive}
      dragging={isInteractive}
      zoomSnap={isInteractive}
      zoomDelta={isInteractive}
      trackResize={isInteractive}
      touchZoom={isInteractive}
      style={{ width: "100%", height: "100%" }}
    >
      <MapConsumer>
        {(localMap) => {
          // Extend tile sizing to fix white borders on map
          /* eslint-disable */
          localMap.invalidateSize();
          const originalInitTile = L.GridLayer.prototype._initTile;
          L.GridLayer.include({
            _initTile(tile) {
              originalInitTile.call(this, tile);

              const tileSize = this.getTileSize();

              tile.style.width = `${tileSize.x + 1}px`;
              tile.style.height = `${tileSize.y + 1}px`;
            },
          });
          /* eslint-enable */
          const bb = localMap.getBounds().toBBoxString();
          useEffect(() => {
            setBounds(bb);
          });
          return null;
        }}
      </MapConsumer>
      {additionalComponents}
    </MapContainer>
  );
}

Map.defaultProps = {
  isInteractive: true,
  nearbyResources: null,
};

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  isInteractive: PropTypes.bool,
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
