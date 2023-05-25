import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Button } from "shared-components";
import { Alert } from "shared-components/build/components/alert/Alert";
import { Col, Container, Row, Spinner } from "react-bootstrap";
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
  const [buttonText, setButtonText] = useState("Go Back");

  useEffect(() => {
    dispatch(resetOpportunity());
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

  // set appropriate button text
  useEffect(() => {
    const back = window.sessionStorage.getItem("back_url");
    if (back && back.includes("/search")) {
      setButtonText("Return to Search");
    } else if (back && back.includes("/dashboard")) {
      setButtonText("Return to Dashboard");
    }
  }, []);

  const resetState = (e) => {
    e.preventDefault();
    history.goBack();
    dispatch(resetOpportunity());
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
      {opportunity.id ? (
        <>
          <Container className="p-0 mt-3">
            <Row className="no-print">
              <Col className="align-self-end">
                {history.action !== "POP" && (
                  <Button
                    label={buttonText}
                    styling="bcgov-normal-blue btn px-4"
                    onClick={resetState}
                    onKeyDown={resetState}
                  />
                )}
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

          <Container className="p-0 no-print">
            <Alert
              icon={<></>}
              type="warning"
              styling="bcgov-warning-background mb-4"
              element={
                <span>
                  Property listings on this site include information provided by
                  authorized community representatives and obtained from{" "}
                  <span>
                    {" "}
                    <Link to="/investmentopportunities/datasources">
                      open data sources.
                    </Link>
                  </span>{" "}
                  The Province of British Columbia has not verified the
                  information and prospective purchasers, lessors and others
                  should conduct their own usual due diligence and make such
                  enquiries as they deem necessary before purchasing, leasing or
                  otherwise investing in the subject site. Prospective
                  purchasers, lessors and other interested in the subject site
                  should check existing laws and regulations to confirm that
                  this particular property is suitable for their intended
                  purpose or use and what permits, approvals and consultations,
                  including with Indigenous communities, are required in order
                  to develop such property, as well as any costs associated with
                  such development. Listings are for information purposes only
                  and are not intended to provide investment advice. Reliance
                  upon any information shall be at the user’s sole risk. All
                  information should be verified independently before being used
                  or relied upon. The Province of British Columbia does not
                  guarantee the quality, accuracy, completeness or timeliness of
                  this information; and assumes no obligation to update this
                  information or advise on further developments. The Province of
                  British Columbia disclaims any liability for unauthorized use
                  or reproduction of any information contained in this document
                  and is not responsible for any direct, indirect, special or
                  consequential damages or any other damages caused, arising out
                  of or in connection with use of this information. The Province
                  of British Columbia is not acting as a real estate broker or
                  agent for any party in connection with any of the properties
                  described on this website.
                </span>
              }
            />
          </Container>
        </>
      ) : (
        <div className="center-page-spinner-opportunities">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};

OpportunityPage.propTypes = { id: Proptypes.number };

OpportunityPage.defaultProps = { id: 0 };

export default OpportunityPage;
