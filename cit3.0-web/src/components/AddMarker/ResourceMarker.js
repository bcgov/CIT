import PropTypes from "prop-types";
import { Marker, Popup } from "react-leaflet";
import { v4 } from "uuid";
import newIcon from "./markers";
import setColour from "../../helpers/helpers";

export default function ResourceMarker({ resourceName, resources }) {
  const colour = setColour(resourceName, "colourName");

  return resources.map((resource) => {
    const lat =
      resource.LATITUDE || resource.Latitude || resource.SCHOOL_LATITUDE;

    const long =
      resource.LONGITUDE || resource.Longitude || resource.SCHOOL_LONGITUDE;
    return (
      <Marker key={v4()} position={[lat, long]} icon={newIcon(colour)}>
        <Popup>
          Lat: {lat.toFixed(4)} Long: {long.toFixed(4)}
        </Popup>
      </Marker>
    );
  });
}
ResourceMarker.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
