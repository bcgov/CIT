import PropTypes from "prop-types";
import { Marker, Popup } from "react-leaflet";
import { v4 } from "uuid";

export default function OpportunitiesMarker({ opportunities }) {
  console.log(opportunities);
  const parseLatLng = (str) => {
    const index = str.indexOf("(");
    const sub = str.slice(index + 1);
    const long = sub.slice(0, sub.indexOf(" "));
    const lat = sub.slice(sub.indexOf(" ") + 1, sub.length - 2);
    return [Number(lat), Number(long)];
  };

  const markers = (opps) =>
    opps.map((opp) => <Marker key={v4()} position={parseLatLng(opp.point)} />);

  return <>{markers(opportunities)}</>;
}

OpportunitiesMarker.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
