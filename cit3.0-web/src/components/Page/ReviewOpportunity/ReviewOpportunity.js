import React from "react";
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
import { NOTIFICATION_ERROR } from "../../../store/constants/notification";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import { postUser } from "../../../store/actions/user";
import UserFactory from "../../../store/factory/UserFactory";

const ReviewOpportunity = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.notification.data);
  const opportunityModel = useSelector((state) => state.opportunity);
  const editing = useSelector((state) => state.opportunity.editing);
  const userModel = useSelector((state) => state.user);
  const keycloak = useKeycloakWrapper();

  const handlePostOpportunity = async () => {
    const { data: user } = await postUser(
      UserFactory.createRequestFromState(userModel, {}),
      keycloak.obj.token
    );
    dispatch(setOpportunityUser(user.id));
    dispatch(setApprovalStatus("NEW"));
    await postOpportunity(opportunityModel, keycloak.obj.token)
      .then(() => {
        dispatch(resetOpportunity());
        dispatch(closeNotification());
        history.push("/opportunity/success");
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
        history.push("/opportunity/success");
      })
      .catch((e) => {
        dispatch(setNotification(NOTIFICATION_ERROR, e));
        window.scrollTo(0, 0);
      });
  };

  const handleSubmitOpportunity = () => {
    if (!editing) {
      handlePostOpportunity();
    } else {
      handlePutpportunity();
    }
  };

  const confirmCancel = () => {
    if (confirm("Are you sure you want discard this opportunity?")) {
      history.push("/dashboard");
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
        prevRoute="/addOpportunity/addional-details"
      />
      <OpportunityView view="all" />
    </div>
  );
};

export default ReviewOpportunity;
