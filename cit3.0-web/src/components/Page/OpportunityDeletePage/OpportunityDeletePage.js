import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "shared-components/build/components/alert/Alert";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import {
  deleteOpportunity,
  getOpportunity,
  resetOpportunity,
  setOpportunity,
} from "../../../store/actions/opportunity";
import ButtonRow from "../../ButtonRow/ButtonRow";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";

const OpportunityDeletePage = ({ id }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpportunityLoaded, setIsOpportunityLoaded] = useState(false);
  const opportunity = useSelector((state) => state.opportunity);
  const keycloak = useKeycloakWrapper();

  const onCancelClick = () => {
    dispatch(resetOpportunity());
    let backUrl = window.sessionStorage.getItem("back_url");
    if (backUrl === null) {
      backUrl = "/investmentopportunities/dashboard";
    }
    history.push(backUrl);
  };

  useEffect(() => {
    let opId = id;
    if (!id) {
      const found = location.pathname.match(/(\d+)+\/?$/);
      opId = found && parseInt(found[0], 10);
    }
    if (opId !== opportunity.id) {
      getOpportunity(opId)
        .then((response) => {
          const opp = OpportunityFactory.createStateFromResponse(response.data);
          dispatch(setOpportunity(opp));
          setIsOpportunityLoaded(true);
        })
        .catch((err) => {
          console.log("Error: ", err);
          setIsOpportunityLoaded(false);
          return null;
        });
    } else {
      setIsOpportunityLoaded(true);
    }
  }, []);

  const handleDeleteOpportunity = (e) => {
    deleteOpportunity(opportunity, keycloak.obj.token).then(() => {
      dispatch(resetOpportunity());
      history.goBack();
    });
    e.preventDefault();
  };

  return (
    <div data-testid="OpportunityDeletePage">
      {!opportunity.id || !isOpportunityLoaded ? (
        <>
          <div className="center-spinner">
            <Spinner animation="border" />
          </div>
        </>
      ) : (
        <Container className="my-3">
          <Alert
            icon={<MdError size={32} />}
            type="error"
            styling="bcgov-error-background"
            element="Deleting an opportunity is permanent"
          />
          <h3 className="my-3">{opportunity.name}</h3>
          <h4 className="my-3">{opportunity.address}</h4>
          <br />
          <br />
          <ButtonRow
            onClick={(e) => handleDeleteOpportunity(e)}
            continueLabel="Delete"
            noContinue={!opportunity.id}
            onCancelClick={onCancelClick}
          />
        </Container>
      )}
    </div>
  );
};

OpportunityDeletePage.propTypes = {
  id: PropTypes.number,
};
OpportunityDeletePage.defaultProps = {
  id: 0,
};

export default OpportunityDeletePage;
