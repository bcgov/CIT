import React, { useEffect } from "react";
import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
  resetOpportunity,
} from "../../../store/actions/opportunity";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import styles from "./OpportunityPage.module.css";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";

const OpportunityPage = ({ id }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const opportunity = useSelector((state) => state.opportunity);
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
      });
    }
  }, []);

  const resetState = (e) => {
    history.goBack();
    dispatch(resetOpportunity());
    e.preventDefault();
  };

  return (
    <div className={styles.OpportunityPage} data-testid="OpportunityPage">
      <PortalHeader />
      <Container className="p-0">
        <Button
          className="a-tag mt-2 p-0"
          onClick={resetState}
          onKeyDown={resetState}
        >
          {"<<"} Return to Search
        </Button>
      </Container>
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityPage.propTypes = { id: Proptypes.number };

OpportunityPage.defaultProps = { id: 0 };

export default OpportunityPage;
