import PropTypes from "prop-types";
import { Marker, Popup } from "react-leaflet";
import { v4 } from "uuid";
import proj4 from "proj4";
import newIcon from "./markers";
import { setColour } from "../../helpers/helpers";

export default function ResourceMarker({ resourceName, resources }) {
  console.log({ resourceName, resources });
  const colour = setColour(resourceName, "colourName");

  if (resources.features) {
    const { point } = resources.features[0].properties;
    if (point) {
      const geo = point.match(/\((.*) (.*)\)/);
      const coords = [parseFloat(geo[2]), parseFloat(geo[1])];
      return (
        <Marker
          key={v4()}
          position={[coords[0], coords[1]]}
          icon={newIcon(colour)}
        >
          <Popup>
            Lat: {coords[0].toFixed(4)} Long: {coords[1].toFixed(4)}
          </Popup>
        </Marker>
      );
    }
  }
  return null;
}
ResourceMarker.propTypes = {
  resourceName: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
