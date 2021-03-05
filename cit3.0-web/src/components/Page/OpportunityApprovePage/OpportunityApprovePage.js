import React from "react";
import Proptypes from "prop-types";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
  resetOpportunity,
} from "../../../store/actions/opportunity";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import styles from "./OpportunityApprovePage.module.css";

const OpportunityApprovePage = ({ id }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  let opId = id;
  if (!id) {
    const found = location.pathname.match(/(\d+)+$/);
    opId = found && found[0];
  }
  if (opId) {
    getOpportunity(opId).then((response) => {
      const opportunity = OpportunityFactory.createStateFromResponse(
        response.data
      );
      dispatch(setOpportunity(opportunity));
      document.title = `Investment Approval - ${opportunity.name}`;
    });
  }
  const resetState = (e) => {
    dispatch(resetOpportunity());
    history.goBack();
    e.preventDefault();
  };

  return (
    <div
      className={styles.OpportunityApprovePage}
      data-testid="OpportunityApprovePage"
    >
      <Container className="p-0">
        <Button
          className="a-tag mt-2 p-0"
          onClick={resetState}
          onKeyDown={resetState}
        >
          {"<<"} Return to Manage Opportunities
        </Button>
      </Container>
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityApprovePage.propTypes = { id: Proptypes.number };

OpportunityApprovePage.defaultProps = { id: 0 };

export default OpportunityApprovePage;
