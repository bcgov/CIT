import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styles from "./ReviewOpportunity.module.css";
import OpportunityView from "../../OpportunityView/OpportunityView";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import ReviewAndSubmitCallout from "../../ReviewAndSubmitCallout/ReviewAndSubmitCallout";

const ReviewOpportunity = ({ location }) => {
  const history = useHistory();

  const submitOpportunity = () => {
    console.log("calling submission endpoint");
    history.push("/addOpportunity/success");
  };

  const confirmCancel = () => {
    if (confirm("Are you sure you want discard this opportunity?")) {
      history.push("/");
    }
  };

  return (
    <div className={styles.ReviewOpportunity} data-testid="ReviewOpportunity">
      <PortalHeader />
      <NavigationHeader />
      <ReviewAndSubmitCallout
        submitOpportunity={() => submitOpportunity()}
        cancelOpportunity={() => confirmCancel()}
        prevRoute="/addOpportunity/propDetails2"
      />
      <OpportunityView data={location.state} view="all" />
    </div>
  );
};

ReviewOpportunity.propTypes = {
  location: PropTypes.shape().isRequired,
};

ReviewOpportunity.defaultProps = {};

export default ReviewOpportunity;
