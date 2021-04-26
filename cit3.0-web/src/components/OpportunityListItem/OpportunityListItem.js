import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";
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
import "./OpportunityListItem.css";

const OpportunityListItem = ({
  options,
  opportunity,
  publicView,
  handleModalOpen,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const setCurrentUrl = (path) => {
    // For returning to the correct page when cancelling a delete
    window.sessionStorage.setItem("back_url", window.location.pathname);
    history.push(path);
  };

  const goToEditListing = () => {
    getOpportunity(opportunity.id).then((response) => {
      dispatch(
        setOpportunity({
          ...OpportunityFactory.createStateFromResponse(response.data),
          editing: true,
        })
      );
      history.push("/investmentopportunities/add");
    });
  };
  const determineActions = (opp) => {
    if (opp.approvalStatus === "PUBL") {
      return (
        <>
          <Button
            className="p-0"
            variant="link"
            onClick={() => setCurrentUrl(opp.link)}
          >
            View Listing
          </Button>
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
            Closed
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
        <Button
          className="p-0"
          variant="link"
          onClick={() => setCurrentUrl(opp.link)}
        >
          View Listing
        </Button>
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
    return propertyStatus !== "Both"
      ? `For ${propertyStatus}`
      : "Sale or Lease";
  };

  return (
    <div key={opportunity.id} className="opportunity-table-row w-100">
      <Row
        className={publicView ? "nested-link" : ""}
        onClick={() => !!publicView && history.push(opportunity.link)}
      >
        <Col md={3} lg={3}>
          <div className="border-list-item opportunity-table-map-container">
            <Map
              coords={opportunity.coords}
              isInteractive={false}
              isSearchMode={false}
            />
          </div>
        </Col>
        <Col className="d-flex flex-column">
          {publicView ? (
            <>
              <Row>
                <Col style={{ paddingLeft: "0" }}>
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
                          (s) =>
                            s.code === opportunity.userInfo.currentZone.value
                        ).name
                      }`}</p>
                    ) : null}
                    {opportunity.userInfo.saleOrLease.value && options ? (
                      <p className="border--pill">{`${saleOrLease()}`}</p>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row className="h-100">
                <Col
                  style={{
                    paddingLeft: "0",
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
                  <Button
                    className="p-0"
                    variant="link"
                    onClick={() => setCurrentUrl(opportunity.link)}
                  >
                    View property details
                  </Button>
                </Col>
              </Row>
            </>
          ) : null}
          <Row className="flex-grow-1">
            {!publicView ? (
              <>
                <Col style={{ paddingLeft: "0" }}>
                  <b>{opportunity ? getAddress(opportunity.address) : ""}</b>
                </Col>
                <Col>{formatDate(opportunity.dateCreated)}</Col>
                <Col>
                  {determineStatusTextColour(opportunity.approvalStatus)}
                </Col>
                <Col>{determineActions(opportunity)}</Col>
              </>
            ) : null}
          </Row>
          {!publicView && opportunity.publicNote ? (
            <Row>
              <Col style={{ paddingLeft: "0" }}>
                <LinesEllipsis
                  className="note pr-3"
                  text={`Reason: ${opportunity.publicNote}`}
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
