import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";
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
      history.push("/investmentopportunities/");
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
          <NavLink to={`/delete/investmentopportunities/${opp.id}/`}>
            Delete
          </NavLink>
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
        <NavLink to={`/delete/investmentopportunities/${opp.id}`}>
          Delete
        </NavLink>
      </>
    );
  };

  return (
    <div key={opportunity.id} className="opportunity-table-row w-100">
      <Row
        className={publicView ? "nested-link" : ""}
        onClick={() => !!publicView && history.push(opportunity.link)}
      >
        <Col sm={3} md={3} lg={3}>
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
        <Col>
          <Row>
            <Col>{opportunity.address || "No Address"}</Col>
            {!publicView ? (
              <>
                <Col>{formatDate(opportunity.dateCreated)}</Col>
                <Col>
                  {determineStatusTextColour(opportunity.approvalStatus)}
                </Col>
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

          {opportunity.publicNote ? (
            <Row>
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
            </Row>
          ) : null}
        </Col>
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
