import React from "react";
import Proptypes from "prop-types";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
} from "../../../store/actions/opportunity";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import styles from "./OpportunityApprovePage.module.css";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";

const OpportunityApprovePage = ({ id }) => {
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

  return (
    <div
      className={styles.OpportunityApprovePage}
      data-testid="OpportunityApprovePage"
    >
      <PortalHeader />
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityApprovePage.propTypes = { id: Proptypes.number };

OpportunityApprovePage.defaultProps = { id: 0 };

export default OpportunityApprovePage;
