import React, { useEffect } from "react";
import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "shared-components";
import OpportunityView from "../../OpportunityView/OpportunityView";
import {
  setOpportunity,
  getOpportunity,
  resetOpportunity,
} from "../../../store/actions/opportunity";
import OpportunityFactory from "../../../store/factory/OpportunityFactory";

const OpportunityPage = ({ id }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const opportunity = useSelector((state) => state.opportunity);
  const opportunityName = useSelector((state) => state.opportunity.name);

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

  // Copy the visually hidden textarea
  const copyLink = () => {
    document.getElementById("link").select();
    document.execCommand("copy");
  };

  // Use broswer print method
  const openPdf = () => {
    window.print();
  };

  // Open generic email with link
  const emailLink = () => {
    const subject = opportunityName;
    let uri = "mailto:?subject=";
    uri += encodeURIComponent(subject);
    uri += "&body=";
    uri += encodeURIComponent(window.location);
    window.open(uri);
  };

  return (
    <div data-testid="OpportunityPage">
      <Container className="p-0 mt-3">
        <Row className="no-print">
          <Col className="align-self-end">
            <Button
              label="Go Back to Search"
              styling="bcgov-normal-blue btn px-4"
              onClick={resetState}
              onKeyDown={resetState}
            />
            <textarea
              readOnly
              id="link"
              className="visually-hidden"
              value={window.location}
            />
          </Col>
          <Col>
            <div className="d-flex flex-grow-1 justify-content-end">
              <div className="d-flex flex-column">
                <button
                  type="button"
                  className="a-tag"
                  onClick={() => copyLink()}
                >
                  Copy Listing Link
                </button>
                <button
                  type="button"
                  className="a-tag"
                  onClick={() => emailLink()}
                >
                  Email Listing Link
                </button>
                <button
                  type="button"
                  className="a-tag"
                  onClick={() => openPdf()}
                >
                  View Listing PDF
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <hr className="my-3 hr-bold no-print" />
      </Container>
      <OpportunityView view="all" />
    </div>
  );
};

OpportunityPage.propTypes = { id: Proptypes.number };

OpportunityPage.defaultProps = { id: 0 };

export default OpportunityPage;
