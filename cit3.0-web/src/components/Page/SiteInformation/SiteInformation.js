import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Alert } from "shared-components";
import { useDispatch } from "react-redux";

import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import OpportunityView from "../../OpportunityView/OpportunityView";
import ButtonRow from "../../ButtonRow/ButtonRow";
import { resetOpportunity } from "../../../store/actions/opportunity";
import "./SiteInformation.css";

export default function SiteInformation({ location }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const goToNextPage = () => {
    history.push(`/investmentopportunities/property-details`);
  };

  const onCancelClick = () => {
    dispatch(resetOpportunity());
    history.push("/investmentopportunities/dashboard");
  };

  return (
    <>
      <NavigationHeader currentStep={2} />
      <Container className="p-0 mt-3" />
      <OpportunityView data={location.state} />
      <ButtonRow
        showPrevious
        prevRoute="/investmentopportunities/add"
        onClick={goToNextPage}
        onCancelClick={onCancelClick}
      />
    </>
  );
}

SiteInformation.propTypes = {
  location: PropTypes.shape().isRequired,
};
