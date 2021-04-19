import PropTypes from "prop-types";
import { Marker, Tooltip } from "react-leaflet";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

export default function OpportunitiesMarker({ opportunities }) {
  const history = useHistory();
  const markers = (opps) =>
    opps.map((opp) => {
      const opportunity = OpportunityFactory.createStateFromResponse(opp);
      return (
        <Marker
          key={v4()}
          position={opportunity.coords}
          eventHandlers={{
            click: () => {
              history.push(opportunity.link);
            },
          }}
        >
          <Tooltip>{opportunity.address}</Tooltip>
        </Marker>
      );
    });

  return <>{markers(opportunities)}</>;
}

OpportunitiesMarker.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
