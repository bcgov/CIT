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
        attribution='&copy; <a href="http://www.esri.com/">Esri</a> contributors'
        url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
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
