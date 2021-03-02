import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import Map from "../Map/Map";

const OpportunityListItem = ({ opportunity }) => {
  const determineTextColour = (approvalStatus) => {
    if (approvalStatus === "PEND") {
      return <div className="status-text-orange">Pending Review</div>;
    }
    if (approvalStatus === "PUBL") {
      return <div className="status-text-green">Published</div>;
    }
    if (approvalStatus === "EDIT") {
      return <div className="status-text-red">Needs to be edited</div>;
    }
    if (approvalStatus === "NCOM") {
      return <div className="status-text-red">Not completed</div>;
    }
    return approvalStatus;
  };

  const determineActions = (opp) => {
    if (opp.approvalStatus === "PUBL") {
      return (
        <>
          <NavLink to={opp.link}>View Listing</NavLink>
          <br />
          <a href="/">Mark as &quot;sold&quot;</a>
          <br />
          <a href="/">Edit Listing</a>
          <br />
          <a href="/">Delete</a>
        </>
      );
    }
    return (
      <>
        <NavLink to={opp.link}>View Listing</NavLink>
        <br />
        <a href="/">Edit Listing</a>
        <br />
        <a href="/">Delete</a>
      </>
    );
  };

  const formatDate = (ISODate) => {
    const dateString = ISODate.substring(0, 10);
    return dateString;
  };

  return (
    <div key={opportunity.id} className="opportunity-table-row w-100">
      <Row>
        <Col>
          <div
            style={{ borderRight: "2px solid #606060" }}
            className="opportunity-table-map-container"
          >
            <Map coords={opportunity.coords} isInteractive={false} />
          </div>
        </Col>
        <Col>{opportunity.address}</Col>
        {!opportunity.public ? (
          <>
            <Col>{formatDate(opportunity.dateCreated)}</Col>
            <Col>{determineTextColour(opportunity.approvalStatus)}</Col>
            <Col>{determineActions(opportunity)}</Col>
          </>
        ) : (
          <Col className="d-flex align-items-end justify-content-end mr-1">
            {opportunity.public && (
              <Link to={opportunity.link}>View property details</Link>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

OpportunityListItem.propTypes = {
  opportunity: PropTypes.shape().isRequired,
};

export default OpportunityListItem;
