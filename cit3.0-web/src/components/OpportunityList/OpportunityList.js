import PropTypes from "prop-types";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";

export default function OpportunityList({ opportunities }) {
  return (
    <>
      <h4>{opportunities.length} Properties match your search</h4>
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
  opportunities: PropTypes.arrayOf(PropTypes.string).isRequired,
};
