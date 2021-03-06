import { MapContainer, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import OpportunitiesMarker from "../OpportunitiesMarker";

export default function OpportunitiesMap({ opportunities }) {
  const center = [53.726669, -127.647621];

  return (
    <MapContainer
      className="full-border"
      style={{ height: "600px", width: "100%" }}
      center={center}
      zoom={5}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {opportunities && <OpportunitiesMarker opportunities={opportunities} />}
    </MapContainer>
  );
}

OpportunitiesMap.defaultProps = {
  opportunities: null,
};

OpportunitiesMap.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.shape),
};
