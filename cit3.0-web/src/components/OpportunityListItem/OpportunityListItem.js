import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";
import NumberFormat from "react-number-format";
import Map from "../Map/Map";
import {
  determineStatusBackgroundColour,
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
        <div className="bcgov-opp-actions-inner">
          <Button
            className="p-0 bcgov-view-listing-link"
            variant="link"
            onClick={() => setCurrentUrl(opp.link)}
          >
            View Listing
          </Button>
          |
          <Button
            className="p-0 bcgov-edit-listing-link"
            variant="link"
            onClick={() => goToEditListing()}
          >
            Edit Listing
          </Button>
          |
          <Button
            className="p-0 bcgov-closed-listing-link"
            variant="link"
            onClick={() => handleModalOpen(opp.id)}
          >
            Close
          </Button>
          <NavLink
            to={`/delete/investmentopportunities/${opp.id}/`}
            className=" bcgov-delete-listing-link"
          >
            Delete
          </NavLink>
        </div>
      );
    }
    return (
      <div className="bcgov-opp-actions-inner">
        <Button
          className="p-0 bcgov-view-listing-link"
          variant="link"
          onClick={() => setCurrentUrl(opp.link)}
        >
          View Listing
        </Button>
        |
        <Button
          className="p-0 bcgov-edit-listing-link"
          variant="link"
          onClick={() => goToEditListing()}
        >
          Edit Listing
        </Button>
        |
        <NavLink
          className="p-0 bcgov-delete-listing-link"
          to={`/delete/investmentopportunities/${opp.id}`}
        >
          Delete
        </NavLink>
      </div>
    );
  };

  const truncate = (str) =>
    str.length > 252 ? `${str.substring(0, 252)} ...` : str;

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
      <Row className={publicView ? "nested-link" : ""}>
        <Col md={3} lg={3}>
          <div className="border-list-item opportunity-table-map-container">
            <Map
              coords={opportunity.coords}
              isInteractive={false}
              isSearchMode={false}
            />
          </div>
        </Col>
        <Col className="d-flex flex-column bcgov-ciot-opportunity-col">
          {publicView ? (
            <>
              <Row>
                <Col style={{ paddingLeft: "0" }}>
                  <div className="bcgov-opp-address">
                    <b>{opportunity ? getAddress(opportunity.address) : ""}</b>
                  </div>
                  <div className="d-flex flex-row flex-wrap bcgov-opp-properties">
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
              <Row className="h-100 bcgov-cios-list-item-properties">
                <Col
                  style={{
                    paddingLeft: "0",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  {truncate(opportunity.userInfo.opportunityDescription.value)}
                </Col>
              </Row>
              <Row className="h-100">
                <Button
                  className="p-0 bcgov-view-properties"
                  variant="link"
                  onClick={() => {
                    window.open(opportunity.link, "_blank");
                  }}
                >
                  View property details {">"}
                </Button>
                {/* </Col> */}
              </Row>
            </>
          ) : null}
          <div className="flex-grow-1">
            {!publicView ? (
              <>
                <div className="bcgov-opp-status">
                  {determineStatusBackgroundColour(opportunity.approvalStatus)}
                </div>
                <div style={{ paddingLeft: "0" }}>
                  <div className="bcgov-opp-address">
                    <b>{opportunity ? getAddress(opportunity.address) : ""}</b>
                  </div>
                </div>
                <div className="bcgov-opp-properties">
                  <div className="bcgov-opp-date-added">
                    Date added: {formatDate(opportunity.dateCreated)}
                  </div>
                </div>
                <div className="bcgov-opp-actions">
                  {determineActions(opportunity)}
                </div>
              </>
            ) : null}
          </div>
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
