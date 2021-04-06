import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import Map from "../Map/Map";
import { determineStatusTextColour, formatDate } from "../../helpers/helpers";

const OpportunityListItem = ({ opportunity, publicView }) => {
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
          <NavLink to={`/delete/opportunity/${opp.id}/`}>Delete</NavLink>
        </>
      );
    }
    return (
      <>
        <NavLink to={opp.link}>View Listing</NavLink>
        <br />
        <a href="/">Edit Listing</a>
        <br />
        <NavLink to={`/delete/opportunity/${opp.id}`}>Delete</NavLink>
      </>
    );
  };

  return (
    <div key={opportunity.id} className="opportunity-table-row w-100">
      <Row>
        <Col>
          <div
            style={{ borderRight: "2px solid #606060" }}
            className="opportunity-table-map-container"
          >
            <Map
              coords={opportunity.coords}
              isInteractive={false}
              isSearchMode={false}
            />
          </div>
        </Col>
        <Col>{opportunity.address}</Col>
        {!publicView ? (
          <>
            <Col>{formatDate(opportunity.dateCreated)}</Col>
            <Col>{determineStatusTextColour(opportunity.approvalStatus)}</Col>
            <Col>{determineActions(opportunity)}</Col>
          </>
        ) : (
          <Col className="d-flex align-items-end justify-content-end mr-1">
            {publicView && (
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
  publicView: PropTypes.bool.isRequired,
};

export default OpportunityListItem;
