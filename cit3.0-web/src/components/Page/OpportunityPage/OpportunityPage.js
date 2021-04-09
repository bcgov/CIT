import React, { useEffect } from "react";
import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button } from "shared-components";
import { Alert } from "shared-components/build/components/alert/Alert";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
  resetOpportunity,
} from "../../../store/actions/opportunity";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";
import styles from "./OpportunityPage.module.css";

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

      <Container className="p-0">
        <Alert
          type="warning"
          styling="bcgov-warning-background mb-4"
          element="Property listings on this site include information provided by authorized community representatives and obtained from open data sources. The Province of British Columbia has not verified the information and prospective purchasers, lessors and others should conduct their own usual due diligence and make such enquiries as they deem necessary before purchasing, leasing or otherwise investing in the subject site. Prospective purchasers, lessors and other interested in the subject site should check existing laws and regulations to confirm that this particular property is suitable for their intended purpose or use and what permits, approvals and consultations, including with Indigenous communities, are required in order to develop such property, as well as any costs associated with such development. Listings are for information purposes only and are not intended to provide investment advice. Reliance upon any information shall be at the user’s sole risk. All information should be verified independently before being used or relied upon. The Province of British Columbia does not guarantee the quality, accuracy, completeness or timeliness of this information; and assumes no obligation to update this information or advise on further developments. The Province of British Columbia disclaims any liability for unauthorized use or reproduction of any information contained in this document and is not responsible for any direct, indirect, special or consequential damages or any other damages caused, arising out of or in connection with use of this information. The Province of British Columbia is not acting as a real estate broker or agent for any party in connection with any of the properties described on this website."
        />
      </Container>
    </div>
  );
};

OpportunityPage.propTypes = { id: Proptypes.number };

OpportunityPage.defaultProps = { id: 0 };

export default OpportunityPage;
