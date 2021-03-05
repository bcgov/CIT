import React from "react";
import PropTypes from "prop-types";
import { Col, NavLink, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Map from "../Map/Map";
import { determineStatusTextColour, formatDate } from "../../helpers/helpers";
import "./OpportunityApprovalItem.css";

const OpportunityApprovalItem = ({ opportunity }) => {
  const history = useHistory();
  return (
    <div
      key={opportunity.id}
      className="opportunity-table-row w-100"
      data-testid="OpportunityApprovalItem"
    >
      <Row>
        <Col sm={3} md={3} lg={3} className="mr-3">
          <div
            style={{ borderRight: "2px solid #606060" }}
            className="opportunity-approve-map-container"
          >
            <Map coords={opportunity.coords} isInteractive={false} />
          </div>
        </Col>
        <Col>
          <Row>
            <Col className="p-2">{opportunity.address}</Col>
            <Col className="p-2">{formatDate(opportunity.dateCreated)}</Col>
            <Col className="p-2">
              {determineStatusTextColour(opportunity.approvalStatus)}
            </Col>
            <Col>
              <NavLink
                className="p-2"
                to={`${opportunity.link}/approve`}
                onClick={() =>
                  history.push(`/manage/opportunity/${opportunity.id}`)
                }
              >
                View Listing
              </NavLink>
            </Col>
          </Row>
          <Row>
            <Col sm={3} md={3} lg={3}>
              &nbsp;
            </Col>
            {opportunity.privateNote ? (
              <Col className="pl-0">
                <b className="note">
                  Internal Note from {opportunity.lastAdmin}:
                </b>
                <p className="note pr-3">{opportunity.privateNote}</p>
              </Col>
            ) : null}
            {opportunity.publicNote ? (
              <Col className="pl-0">
                <b className="note">Comment from {opportunity.lastAdmin}:</b>
                <p className="note pr-3">{opportunity.publicNote}</p>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

OpportunityApprovalItem.propTypes = {
  opportunity: PropTypes.shape().isRequired,
};

OpportunityApprovalItem.defaultProps = {};

export default OpportunityApprovalItem;
