import React from "react";
import PropTypes from "prop-types";
import { Col, NavLink, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import Map from "../Map/Map";
import {
  determineStatusBackgroundColour,
  formatDate,
  getAddress,
} from "../../helpers/helpers";
import "./OpportunityApprovalItem.css";

const OpportunityApprovalItem = ({ opportunity }) => {
  const history = useHistory();
  return (
    <>
      <div
        key={opportunity.id}
        className="opportunity-table-row w-100"
        data-testid="OpportunityApprovalItem"
      >
        <Row>
          <Col sm={3} md={3} lg={3} className="bc">
            <div
              style={{ borderRight: "2px solid #606060" }}
              className="opportunity-approve-map-container"
            >
              <Map
                coords={opportunity.coords}
                isInteractive={false}
                isSearchMode={false}
              />
            </div>
          </Col>
          <Col>
            <Row className="bcgov-opp-inner-row">
              <b className="bcgov-opp-address">
                {opportunity ? getAddress(opportunity.address) : ""}
              </b>
              <div className="bcgov-opp-status">
                {determineStatusBackgroundColour(
                  opportunity.approvalStatus,
                  true
                )}
              </div>
            </Row>
            <div className="bcgov-opp-inner-row-props">
              <Row className="bcgov-opp-inner-row">
                <em>Date Added: {formatDate(opportunity.dateCreated)}</em>
              </Row>
              <div className="bcgov-opp-inner-row">
                {opportunity.privateNote ? (
                  <>
                    <b className="note-title">
                      Internal Note from {opportunity.lastAdmin}:
                    </b>
                    <LinesEllipsis
                      className="note pr-3"
                      text={opportunity.privateNote}
                      maxLine="3"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </>
                ) : null}
                {opportunity.publicNote ? (
                  <>
                    <b className="note-title">
                      Comment from {opportunity.lastAdmin}:
                    </b>
                    <LinesEllipsis
                      className="note pr-3"
                      text={opportunity.publicNote}
                      maxLine="3"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </>
                ) : null}
              </div>
            </div>
            <div className="bcgov-opp-action-row">
              <NavLink
                style={{ textDecoration: "underline" }}
                className="p-2 bc-ciot-delete"
                to={`/delete/investmentopportunities/${opportunity.id}/`}
                onClick={() =>
                  history.push(
                    `/delete/investmentopportunities/${opportunity.id}/`
                  )
                }
              >
                Delete
              </NavLink>
              <NavLink
                style={{ textDecoration: "underline" }}
                className="bcgov-opp-action-right-border"
                to={`${opportunity.link}/approve`}
                onClick={() =>
                  history.push(
                    `/manage/investmentopportunities/view/${opportunity.id}`
                  )
                }
              >
                View Listing
              </NavLink>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

OpportunityApprovalItem.propTypes = {
  opportunity: PropTypes.shape().isRequired,
};

OpportunityApprovalItem.defaultProps = {};

export default OpportunityApprovalItem;
