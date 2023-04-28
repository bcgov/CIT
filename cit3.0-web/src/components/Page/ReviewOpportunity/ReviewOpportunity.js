import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import { Alert } from "shared-components";
import { Container } from "react-bootstrap";
import OpportunityView from "../../OpportunityView/OpportunityView";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import ReviewAndSubmitCallout from "../../ReviewAndSubmitCallout/ReviewAndSubmitCallout";
import {
  postOpportunity,
  putOpportunity,
  resetOpportunity,
  setApprovalStatus,
  setOpportunityUser,
} from "../../../store/actions/opportunity";
import {
  setNotification,
  closeNotification,
} from "../../../store/actions/notification";
import sendAdminEmailNotification from "../../../store/actions/email";
import { NOTIFICATION_ERROR } from "../../../store/constants/notification";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import { postUser } from "../../../store/actions/user";
import UserFactory from "../../../store/factory/UserFactory";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import { createOpportunityLink } from "../../../helpers/helpers";

const ReviewOpportunity = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.notification.data);
  const opportunityModel = useSelector((state) => state.opportunity);
  const editing = useSelector((state) => state.opportunity.editing);
  const userModel = useSelector((state) => state.user);
  const keycloak = useKeycloakWrapper();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePostOpportunity = async () => {
    const { data: user } = await postUser(
      UserFactory.createRequestFromState(userModel, {}),
      keycloak.obj.token
    );
    dispatch(setOpportunityUser(user.id));
    dispatch(setApprovalStatus("NEW"));
    await postOpportunity(opportunityModel, keycloak.obj.token)
      .then((response) => {
        const opportunityLink = createOpportunityLink(response.data.id);
        sendAdminEmailNotification(
          response.data.id,
          opportunityLink,
          keycloak.obj.token
        )
          .then(() => {})
          .catch((e) => {
            console.log(e);
          });
        dispatch(resetOpportunity());
        dispatch(closeNotification());
        setIsSubmitted(false);
        history.push("/investmentopportunities/success");
      })
      .catch((e) => {
        dispatch(setNotification(NOTIFICATION_ERROR, e));
        window.scrollTo(0, 0);
      });
  };

  const handlePutpportunity = async () => {
    dispatch(setApprovalStatus("NWED"));
    await putOpportunity(opportunityModel, keycloak.obj.token)
      .then(() => {
        dispatch(resetOpportunity());
        dispatch(closeNotification());
        setIsSubmitted(false);
        history.push("/investmentopportunities/success");
      })
      .catch((e) => {
        dispatch(setNotification(NOTIFICATION_ERROR, e));
        window.scrollTo(0, 0);
      });
  };

  const handleSubmitOpportunity = () => {
    setIsSubmitted(true);
    if (!editing) {
      handlePostOpportunity();
    } else {
      handlePutpportunity();
    }
  };

  const confirmCancel = () => {
    if (confirm("Are you sure you want discard this opportunity?")) {
      history.push("/investmentopportunities/dashboard");
    }
  };

  return (
    <div data-testid="ReviewOpportunity">
      <NavigationHeader currentStep={5} />
      {error && error.name === "Error" ? (
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
        prevRoute="/investmentopportunities/additional-details"
        isSubmitted={isSubmitted}
      />
      <OpportunityView view="all" />
    </div>
  );
};

export default ReviewOpportunity;
