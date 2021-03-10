import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import { Alert } from "shared-components";
import { Container } from "react-bootstrap";
import OpportunityView from "../../OpportunityView/OpportunityView";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import ReviewAndSubmitCallout from "../../ReviewAndSubmitCallout/ReviewAndSubmitCallout";
import {
  postOpportunity,
  resetOpportunity,
  setApprovalStatus,
} from "../../../store/actions/opportunity";
import {
  setNotification,
  closeNoficiation,
} from "../../../store/actions/notification";
import { NOTIFICATION_ERROR } from "../../../store/constants/notification";

const ReviewOpportunity = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.notification.data);
  const opportunityModel = useSelector((state) => state.opportunity);

  const handleSubmitOpportunity = () => {
    dispatch(setApprovalStatus("NEW"));
    postOpportunity(opportunityModel)
      .then(() => {
        dispatch(resetOpportunity());
        dispatch(closeNoficiation());
        history.push("/opportunity/success");
      })
      .catch((e) => {
        dispatch(setNotification(NOTIFICATION_ERROR, e));
      });
  };

  const confirmCancel = () => {
    if (confirm("Are you sure you want discard this opportunity?")) {
      history.push("/");
    }
  };

  return (
    <div data-testid="ReviewOpportunity">
      <PortalHeader />
      <NavigationHeader currentStep={5} />
      {error.name === "Error" ? (
        <Container className="p-0 mt-3">
          <Alert
            icon={<MdError size={32} />}
            type="error"
            styling="bcgov-error-background"
            element="Opportunity cannot be submitted"
          />
        </Container>
      ) : null}
      <ReviewAndSubmitCallout
        submitOpportunity={() => handleSubmitOpportunity()}
        cancelOpportunity={() => confirmCancel()}
        prevRoute="/addOpportunity/addional-details"
      />
      <OpportunityView view="all" />
    </div>
  );
};

ReviewOpportunity.propTypes = {};

ReviewOpportunity.defaultProps = {};

export default ReviewOpportunity;
