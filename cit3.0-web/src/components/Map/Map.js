import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
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
}) {
  // const [currentView, ]
  const changeView = (centerCoords) => centerCoords;
  const multiPolygon = [
    [
      [48.59509, -123.4056],
      [48.598, -123.41],
      [48.6, -123.42],
      [48.6, -123.43],
    ],
  ];
  return (
    <MapContainer
      center={coords}
      zoom={2}
      scrollWheelZoom
      style={{ width: "100%", height: "100%" }}
    >
      <ChangeView center={changeView(coords)} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <WMSTileLayer
        opacity={1}
        zIndex={100}
        url="https://openmaps.gov.bc.ca/geo/pub/WHSE_IMAGERY_AND_BASE_MAPS.GSR_AIRPORTS_SVW/ows?"
      /> */}
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
  resourceIds: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  setNearbyResources: PropTypes.func.isRequired,
  setCoords: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};
