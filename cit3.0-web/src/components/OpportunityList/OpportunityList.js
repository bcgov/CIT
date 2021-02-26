import PropTypes from "prop-types";
import { v4 } from "uuid";
import OpportunityListItem from "../OpportunityListItem/OpportunityListItem";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

export default function OpportunityList({ opportunities }) {
  return (
    <>
      {opportunities.length &&
        opportunities.map((opp) => {
          const opportunity = OpportunityFactory.createStateFromResponse(opp);
          console.log("OPP: ", opp);
          return <OpportunityListItem key={v4()} opportunity={opportunity} />;
        })}
    </>
  );
}

OpportunityList.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
