import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
} from "../../../store/actions/opportunity";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import styles from "./OpportunityPage.module.css";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";

const OpportunityPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.match(/(\d+)+$/)[0];

  getOpportunity(id).then((response) => {
    const opportunity = OpportunityFactory.createStateFromResponse(
      response.data
    );
    dispatch(setOpportunity(opportunity));
    document.title = `Investment - ${opportunity.name}`;
  });

  return (
    <div className={styles.OpportunityPage} data-testid="OpportunityPage">
      <PortalHeader />
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityPage.propTypes = {};

OpportunityPage.defaultProps = {};

export default OpportunityPage;
