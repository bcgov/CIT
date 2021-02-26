import PropTypes from "prop-types";
import { Marker, Popup } from "react-leaflet";
import { v4 } from "uuid";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

export default function OpportunitiesMarker({ opportunities }) {
  const markers = (opps) =>
    opps.map((opp) => {
      const opportunity = OpportunityFactory.createStateFromResponse(opp);
      return <Marker key={v4()} position={opportunity.coords} />;
    });

  return <>{markers(opportunities)}</>;
}

OpportunitiesMarker.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
