import React from "react";
import PropTypes from "prop-types";
import { Col, NavLink, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import Map from "../Map/Map";
import {
  determineStatusTextColour,
  formatDate,
  getAddress,
} from "../../helpers/helpers";
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
            <Map
              coords={opportunity.coords}
              isInteractive={false}
              isSearchMode={false}
            />
          </div>
        </Col>
        <Col>
          <Row>
            <Col className="p-2">
              {opportunity ? getAddress(opportunity.address) : ""}
            </Col>
            <Col className="p-2">{formatDate(opportunity.dateCreated)}</Col>
            <Col className="p-2">
              {determineStatusTextColour(opportunity.approvalStatus)}
            </Col>
            <Col>
              <NavLink
                className="p-2"
                to={`${opportunity.link}/approve`}
                onClick={() =>
                  history.push(
                    `/manage/investmentopportunities/view/${opportunity.id}`
                  )
                }
              >
                View Listing
              </NavLink>
            </Col>
          </Row>
          <Row>
            {opportunity.privateNote ? (
              <Col className="pl-0">
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
              </Col>
            ) : null}
            {opportunity.publicNote ? (
              <Col className="pl-0">
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
