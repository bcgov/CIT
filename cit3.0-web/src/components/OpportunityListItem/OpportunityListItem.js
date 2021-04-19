import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";
import NumberFormat from "react-number-format";
import Map from "../Map/Map";
import {
  determineStatusTextColour,
  formatDate,
  getAddress,
} from "../../helpers/helpers";
import {
  getOpportunity,
  setOpportunity,
} from "../../store/actions/opportunity";
import OpportunityFactory from "../../store/factory/OpportunityFactory";

const OpportunityListItem = ({
  options,
  opportunity,
  publicView,
  handleModalOpen,
}) => {
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

  const saleOrLease = () => {
    const propertyStatus = options.propertyStatuses.find(
      (s) => s.code === opportunity.userInfo.saleOrLease.value
    ).name;
    return propertyStatus !== "Both" ? propertyStatus : "Sale or Lease";
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
        <Col className="d-flex flex-column">
          <Row>
            <Col>
              <b>{opportunity ? getAddress(opportunity.address) : ""}</b>
            </Col>
            <Col
              style={{
                marginRight: "0.5rem",
              }}
            >
              <div className="d-flex flex-row flex-wrap align-content-end">
                {opportunity.siteInfo.parcelSize.value ? (
                  <p className="border--pill">
                    Parcel Size:{" "}
                    <NumberFormat
                      displayType="text"
                      value={opportunity.siteInfo.parcelSize.value}
                      suffix={` acres`}
                      decimalScale={3}
                      thousandSeparator={
                        isNaN(opportunity.siteInfo.parcelSize.value)
                          ? false
                          : ","
                      }
                    />
                  </p>
                ) : null}
                {opportunity.userInfo.currentZone.value && options ? (
                  <p className="border--pill">{`Zoning: ${
                    options.landUseZoning.find(
                      (s) => s.code === opportunity.userInfo.currentZone.value
                    ).name
                  }`}</p>
                ) : null}
                {opportunity.userInfo.saleOrLease.value && options ? (
                  <p className="border--pill">{`${saleOrLease()}`}</p>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="flex-grow-1">
            {!publicView ? (
              <>
                <Col>{formatDate(opportunity.dateCreated)}</Col>
                <Col>
                  {determineStatusTextColour(opportunity.approvalStatus)}
                </Col>
                <Col>{determineActions(opportunity)}</Col>
              </>
            ) : (
              <Col>
                {publicView && (
                  <Row className="h-100">
                    <Col
                      style={{
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      <LinesEllipsis
                        className="note"
                        text={opportunity.userInfo.opportunityDescription.value}
                        maxLine="4"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                      />
                    </Col>
                    <Col
                      style={{
                        alignSelf: "flex-end",
                        paddingBottom: "0.5rem",
                        marginRight: "0.5rem",
                      }}
                      sm={6}
                      md={6}
                      lg={4}
                      className="text-right"
                    >
                      <Link to={opportunity.link}>View property details</Link>
                    </Col>
                  </Row>
                )}
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {opportunity.publicNote ? (
        <Row>
          <Col className="pl-0">
            <b className="note-title">Comment from {opportunity.lastAdmin}:</b>
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
    </div>
  );
};

OpportunityListItem.defaultProps = {
  options: {},
  handleModalOpen: () => {},
};

OpportunityListItem.propTypes = {
  options: PropTypes.shape(),
  opportunity: PropTypes.shape().isRequired,
  handleModalOpen: PropTypes.func,
  publicView: PropTypes.bool.isRequired,
};

export default OpportunityListItem;
