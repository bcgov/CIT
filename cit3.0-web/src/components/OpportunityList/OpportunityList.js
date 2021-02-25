import PropTypes from "prop-types";
// import { Col } from "react-bootstrap";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";

export default function OpportunityList({ opportunities }) {
  return (
    <>
      {opportunities &&
        opportunities.map((opp) => (
          <OpportunityListItem
            key={opp.id}
            id={opp.id}
            coords={opp.point}
            address={opp.address}
            public
          />
        ))}
    </>
  );
}

OpportunityList.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
