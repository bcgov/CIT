import React from "react";
import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
  updateOpportunity,
} from "../../../store/actions/opportunity";
import { getOptions, setOptions } from "../../../store/actions/options";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import styles from "./OpportunityApprovePage.module.css";
import OpportunityApproveCallout from "../../OpportunityApproveCallout/OpportunityApproveCallout";

const OpportunityApprovePage = ({ id }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const opportunity = useSelector((state) => state.opportunity);

  let opId = id;
  if (!id) {
    const found = location.pathname.match(/(\d+)+$/);
    opId = found && parseInt(found[0], 10);
  }
  if (opId !== opportunity.id) {
    getOpportunity(opId).then((response) => {
      const opp = OpportunityFactory.createStateFromResponse(response.data);
      dispatch(setOpportunity(opp));
    });
  }
  const statuses = useSelector((state) => state.options.statuses);
  if (!statuses) {
    getOptions().then((response) => {
      dispatch(setOptions(response.data));
    });
  }

  const handleUpdateOpportunity = () => {
    updateOpportunity(opportunity);
  };

  return (
    <div
      className={styles.OpportunityApprovePage}
      data-testid="OpportunityApprovePage"
    >
      <Container className="p-0">
        <OpportunityApproveCallout
          publicNote={opportunity.publicNote}
          privateNote={opportunity.privateNote}
          currentStatus={opportunity.approvalStatus}
          approvalStatuses={statuses}
          onStatusChange={(change) => handleUpdateOpportunity(change)}
        />
      </Container>
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityApprovePage.propTypes = { id: Proptypes.number };

OpportunityApprovePage.defaultProps = { id: 0 };

export default OpportunityApprovePage;
