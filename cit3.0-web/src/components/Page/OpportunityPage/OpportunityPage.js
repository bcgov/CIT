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
    dispatch(
      setOpportunity(OpportunityFactory.createFromResponse(response.data))
    );
  });

  return (
    <div className={styles.OpportunityPage} data-testid="OpportunityPage">
      <PortalHeader />
      <OpportunityView />
    </div>
  );
};

OpportunityPage.propTypes = {};

OpportunityPage.defaultProps = {};

export default OpportunityPage;
