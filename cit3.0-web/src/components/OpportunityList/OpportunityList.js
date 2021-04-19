import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

export default function OpportunityList({
  opportunities,
  component: Component,
}) {
  const options = useSelector((state) => state.options);
  return (
    <>
      {opportunities.length
        ? opportunities.map((opp) => {
            const opportunity = OpportunityFactory.createStateFromResponse(opp);
            const ListItem = Component();
            return (
              <ListItem
                key={v4()}
                options={options}
                opportunity={opportunity}
                publicView
              />
            );
          })
        : null}
    </>
  );
}

OpportunityList.propTypes = {
  component: PropTypes.func.isRequired,
  opportunities: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
