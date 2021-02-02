import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.css";
import ChangeView from "../ChangeView/ChangeView";
import AddLocationMarker from "../AddMarker/AddMarker";
import ResourceMarker from "../AddMarker/ResourceMarker";

export default function Map({ nearbyResources, coords }) {
  return (
    <MapContainer
      center={coords}
      zoom={2}
      scrollWheelZoom
      style={{ width: "100%", height: "100%" }}
    >
      <ChangeView center={coords} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddLocationMarker />
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
    </MapContainer>
  );
}

Map.defaultProps = {
  nearbyResources: null,
};

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  nearbyResources: PropTypes.shape({
    resource: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape),
  }),
};
