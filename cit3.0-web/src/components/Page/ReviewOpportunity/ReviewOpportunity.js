import React from "react";
import PropTypes from "prop-types";
import styles from "./ReviewOpportunity.module.css";
import OpportunityView from "../../OpportunityView/OpportunityView";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import ReviewAndSubmitCallout from "../../ReviewAndSubmitCallout/ReviewAndSubmitCallout";

const submitOpportunity = () => {
  console.log("submitted");
};

const ReviewOpportunity = ({ location }) => (
  <div className={styles.ReviewOpportunity} data-testid="ReviewOpportunity">
    <PortalHeader />
    <NavigationHeader />
    <ReviewAndSubmitCallout
      onClick={submitOpportunity}
      prevRoute="/addOpportunity/propDetails2"
    />
    <OpportunityView data={location.state} />
  </div>
);

ReviewOpportunity.propTypes = {
  location: PropTypes.shape().isRequired,
};

ReviewOpportunity.defaultProps = {};

export default ReviewOpportunity;
