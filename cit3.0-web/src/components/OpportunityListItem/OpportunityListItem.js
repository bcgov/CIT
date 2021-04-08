import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Map from "../Map/Map";
import { determineStatusTextColour, formatDate } from "../../helpers/helpers";
import {
  getOpportunity,
  setOpportunity,
} from "../../store/actions/opportunity";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

const OpportunityListItem = ({ opportunity, publicView, handleModalOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const goToEditListing = () => {
    getOpportunity(opportunity.id).then((response) => {
      dispatch(
        setOpportunity({
          ...OpportunityFactory.createStateFromResponse(response.data),
          editing: true,
        })
      );
      history.push("/opportunity/");
    });
  };
  const determineActions = (opp) => {
    if (opp.approvalStatus === "PUBL") {
      return (
        <>
          <NavLink to={opp.link}>View Listing</NavLink>
          <br />
          <Button
            className="p-0"
            variant="link"
            onClick={() => goToEditListing()}
          >
            Edit Listing
          </Button>
          <br />
          <Button
            variant="link"
            className="p-0"
            onClick={() => handleModalOpen(opp.id)}
          >
            Closed/Won
          </Button>
          <br />
          <NavLink to={`/delete/opportunity/${opp.id}/`}>Delete</NavLink>
        </>
      );
    }
    return (
      <>
        <NavLink to={opp.link}>View Listing</NavLink>
        <br />

        <Button
          className="p-0"
          variant="link"
          onClick={() => goToEditListing()}
        >
          Edit Listing
        </Button>
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

OpportunityListItem.defaultProps = {
  handleModalOpen: () => {},
};

OpportunityListItem.propTypes = {
  opportunity: PropTypes.shape().isRequired,
  handleModalOpen: PropTypes.func,
  publicView: PropTypes.bool.isRequired,
};

export default OpportunityListItem;
