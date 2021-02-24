import React from "react";
import Proptypes from "prop-types";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
} from "../../../store/actions/opportunity";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import styles from "./OpportunityPage.module.css";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";

const OpportunityPage = ({ id }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const opId = id;
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
      document.title = `Investment - ${opportunity.name}`;
    });
  } else {
    // @todo: Make opportunity 404 page
    history.push("/");
  }

  return (
    <div className={styles.OpportunityPage} data-testid="OpportunityPage">
      <PortalHeader />
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityPage.propTypes = { id: Proptypes.number };

OpportunityPage.defaultProps = { id: 0 };

export default OpportunityPage;
