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
  setLastAdmin,
} from "../../../store/actions/opportunity";
import { getOptions, setOptions } from "../../../store/actions/options";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import OpportunityApproveCallout from "../../OpportunityApproveCallout/OpportunityApproveCallout";
import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
} from "../../../store/constants/notification";
import {
  setNotification,
  closeNotification,
} from "../../../store/actions/notification";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import { getUser, postUser } from "../../../store/actions/user";
import UserFactory from "../../../store/factory/UserFactory";

const OpportunityApprovePage = ({ id }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [alertStatus, setAlertStatus] = useState();
  const [user, setUser] = useState({});
  const [validUser, setValidUser] = useState(true);
  const [userStatement, setUserStatement] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const opportunity = useSelector((state) => state.opportunity);
  const notificationShow = useSelector((state) => state.notification.show);
  const notificationType = useSelector((state) => state.notification.type);
  const username = useSelector((state) => state.user.name);
  const keycloak = useKeycloakWrapper();

  useEffect(() => {
    let opId = id;
    if (!id) {
      const found = location.pathname.match(/(\d+)+\/?$/);
      opId = found && parseInt(found[0], 10);
    }
    dispatch(closeNotification());
    if (opId !== opportunity.id) {
      getOpportunity(opId).then((response) => {
        const opp = OpportunityFactory.createStateFromResponse(response.data);
        dispatch(setOpportunity(opp));
        getUser({ id: opp.user }).then((userResponse) => {
          const { data: users } = userResponse;
          if (users.length) {
            const appUser = users[0];
            setUser(appUser);
            setValidUser(
              typeof appUser.municipalities.find(
                (m) => m.id === opp.municipality.id
              ) !== "undefined" ||
                typeof appUser.regional_districts.find(
                  (r) => r.id === opp.regionalDistrict.id
                ) !== "undefined"
            );
            setUserQuestion(
              `Do you approve ${appUser.name}, ${
                appUser.role ? `${appUser.role}, ` : ""
              }${appUser.email} to submit on behalf of ${
                opp.municipality.name || opp.regionalDistrict.name
              }?`
            );
            setUserStatement(
              `This Profile was submitted by ${appUser.name}, ${
                appUser.role ? `${appUser.role}, ` : ""
              }${appUser.email} to submit on behalf of ${
                opp.municipality.name || opp.regionalDistrict.name
              }`
            );
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

  const handleUpdateOpportunity = (newStatus, approval) => {
    dispatch(setLastAdmin(username));
    if (approval === "Yes") {
      postUser(
        UserFactory.createRequestFromState(user, opportunity),
        keycloak.obj.token
      ).then(() => {
        setValidUser(true);
      });
    }
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
          userQuestion={userQuestion}
          validUser={validUser}
          approvalStatuses={statuses}
          onStatusChange={(newStatus, approval) =>
            handleUpdateOpportunity(newStatus, approval)
          }
        />
        <p className="my-3">
          <b>{userStatement}</b>
        </p>
      </Container>
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityApprovePage.propTypes = { id: Proptypes.number };

OpportunityApprovePage.defaultProps = { id: 0 };

export default OpportunityApprovePage;
