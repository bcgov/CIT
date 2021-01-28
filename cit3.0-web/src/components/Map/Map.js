import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.css";
import ChangeView from "../ChangeView/ChangeView";
import AddLocationMarker from "../AddMarker/AddMarker";

export default function Map(props) {
  const { coords } = props;

  return (
    <MapContainer
      center={coords}
      zoom={16}
      scrollWheelZoom
      style={{ width: "100%", height: "100%" }}
    >
      <ChangeView center={coords} zoom={16} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddLocationMarker />
      <Marker position={coords}>
        <Popup>
          Lat: {coords[0]} Long: {coords[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
};
