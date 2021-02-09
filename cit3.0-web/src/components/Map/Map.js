import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import "./map.css";
import ChangeView from "../ChangeView/ChangeView";
import AddLocationMarker from "../AddMarker/AddMarker";

export default function Map(props) {
  // eslint-disable-next-line no-unused-vars
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const { coords, isReadOnly } = props;

  let enableInteraction;
  let additionalComponents;

  if (isReadOnly) {
    enableInteraction = false;
    additionalComponents = <Marker position={coords} />;
  } else {
    enableInteraction = true;
    additionalComponents = (
      <>
        <ChangeView center={coords} zoom={16} />
        <AddLocationMarker />
        <Marker position={coords}>
          <Popup>
            Lat: {coords[0]} Long: {coords[1]}
          </Popup>
        </Marker>
      </>
    );
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
      zoom={16}
      scrollWheelZoom={enableInteraction}
      zoomControl={enableInteraction}
      attributionControl={enableInteraction}
      fadeAnimation={enableInteraction}
      zoomAnimation={enableInteraction}
      doubleClickZoom={enableInteraction}
      dragging={enableInteraction}
      zoomSnap={enableInteraction}
      zoomDelta={enableInteraction}
      trackResize={enableInteraction}
      touchZoom={enableInteraction}
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
  isReadOnly: false,
};

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  isReadOnly: PropTypes.bool,
};
