import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Alert } from "shared-components/build/components/alert/Alert";
import { MdCheckBox, MdError } from "react-icons/md";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
  updateOpportunity,
} from "../../../store/actions/opportunity";
import { getOptions, setOptions } from "../../../store/actions/options";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import OpportunityApproveCallout from "../../OpportunityApproveCallout/OpportunityApproveCallout";
import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
} from "../../../store/constants/notification";
import { setNotification } from "../../../store/actions/notification";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import { getUser } from "../../../store/actions/user";

const OpportunityApprovePage = ({ id }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [alertStatus, setAlertStatus] = useState();
  const opportunity = useSelector((state) => state.opportunity);
  const notificationShow = useSelector((state) => state.notification.show);
  const notificationType = useSelector((state) => state.notification.type);
  const keycloak = useKeycloakWrapper();

  useEffect(() => {
    let opId = id;
    if (!id) {
      const found = location.pathname.match(/(\d+)+\/?$/);
      opId = found && parseInt(found[0], 10);
    }
    if (opId !== opportunity.id) {
      getOpportunity(opId).then((response) => {
        const opp = OpportunityFactory.createStateFromResponse(response.data);
        dispatch(setOpportunity(opp));
        getUser({ id: opp.userId }).then((response) => {
          const { data: users } = response;
          if (users.length) {
            const appUser = users[0];
            const places = [];
            appUser.municipalities.forEach((m) => places.push(m.name));
            appUser.regional_districts.forEach((r) => places.push(r.name));
            setCommunities(places.join(", "));
          }
        });
      });
    }
  }, []);

  const statuses = useSelector((state) => state.options.statuses);
  if (!statuses) {
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
    });
  }

  const handleUpdateOpportunity = (newStatus) => {
    setAlertStatus(newStatus);
    updateOpportunity(opportunity, keycloak.obj.token)
      .then(() => {
        dispatch(setNotification(NOTIFICATION_SUCCESS));
      })
      .catch((e) => {
        dispatch(setNotification(NOTIFICATION_ERROR, e));
      });
  };

  return (
    <div data-testid="OpportunityApprovePage">
      <Container className="p-0 pt-3">
        {notificationShow && notificationType === NOTIFICATION_SUCCESS ? (
          <Alert
            icon={<MdCheckBox size={32} />}
            type="success"
            styling="bcgov-success-background"
            element={`The status of this opportunity has been updated to ${alertStatus}`}
          />
        ) : null}

        {notificationShow && notificationType === NOTIFICATION_ERROR ? (
          <Alert
            icon={<MdError size={32} />}
            type="error"
            styling="bcgov-error-background"
            element={`The status of this opportunity cannot be changed to ${alertStatus}`}
          />
        ) : null}
        <OpportunityApproveCallout
          publicNote={opportunity.publicNote}
          privateNote={opportunity.privateNote}
          currentStatus={opportunity.approvalStatus}
          approvalStatuses={statuses}
          onStatusChange={(newStatus) => handleUpdateOpportunity(newStatus)}
        />
      </Container>
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityApprovePage.propTypes = { id: Proptypes.number };

OpportunityApprovePage.defaultProps = { id: 0 };

export default OpportunityApprovePage;
