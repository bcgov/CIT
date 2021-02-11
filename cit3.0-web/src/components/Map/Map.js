import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  MapConsumer,
} from "react-leaflet";
import "./map.css";
import ChangeView from "../ChangeView/ChangeView";
import AddLocationMarker from "../AddMarker/AddMarker";
import ResourceMarker from "../AddMarker/ResourceMarker";

export default function Map({
  nearbyResources,
  coords,
  setCoords,
  resourceIds,
  setNearbyResources,
  setAddress,
  isInteractive,
}) {
  // eslint-disable-next-line no-unused-vars
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  let additionalComponents;
  let zoomLevel;

  const changeView = (centerCoords) => centerCoords;
  const multiPolygon = [
    [
      [48.59509, -123.4056],
      [48.598, -123.41],
      [48.6, -123.42],
      [48.6, -123.43],
    ],
  ];

  if (isInteractive) {
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
        <Polygon pathOptions={{ color: "purple" }} positions={multiPolygon} />
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
    additionalComponents = <Marker position={coords} />;
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
        {(map) => {
          map.invalidateSize();
          return null;
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
