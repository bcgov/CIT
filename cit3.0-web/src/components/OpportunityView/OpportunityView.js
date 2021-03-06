import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "shared-components";
import { v4 } from "uuid";
import Resource from "./Resource";
import LocationsPanel from "../LocationsPanel/LocationsPanel";
import BusinessContact from "../BusinessContact/BusinessContact";
import Map from "../Map/Map";
import { setCoords, setAddress } from "../../store/actions/opportunity";
import "./OpportunityView.css";

export default function OpportunityView({ view }) {
  const dispatch = useDispatch();

  // Site info sections on left side of page
  const siteInfo = useSelector((state) => state.opportunity.siteInfo);
  const userInfo = useSelector((state) => state.opportunity.userInfo);
  let overallInfo = siteInfo;
  if (view === "all") {
    overallInfo = { ...overallInfo, ...userInfo };
  }
  const physical = useSelector((state) => state.opportunity.physical);
  const transportation = useSelector(
    (state) => state.opportunity.transportation
  );
  const services = useSelector((state) => state.opportunity.services);
  const address = useSelector((state) => state.opportunity.address);
  const coords = useSelector((state) => state.opportunity.coords);

  // For Location panel on the right side
  const municipalities = useSelector(
    (state) => state.opportunity.municipalities
  );
  const firstNationCommunities = useSelector(
    (state) => state.opportunity.firstNationCommunities
  );
  const nearbyResources = useSelector(
    (state) => state.opportunity.nearbyResources
  );
  const resourceIds = useSelector((state) => state.opportunity.resourceIds);
  const businessContactName = useSelector(
    (state) => state.opportunity.businessContactName
  );
  const businessContactEmail = useSelector(
    (state) => state.opportunity.businessContactEmail
  );
  const name = useSelector((state) => state.opportunity.name);

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          {name ? (
            <Row>
              <h2 className="mb-4">{name}</h2>
            </Row>
          ) : null}
          {overallInfo && (
            <>
              <Resource
                key={v4()}
                title="Site Info - General Details"
                itemsToDisplay={overallInfo}
                view={view}
              />
              <div style={{ marginLeft: "-15px", marginRight: "-15px" }}>
                <Alert
                  icon={<></>}
                  type="info"
                  styling="bcgov-info-background mb-3"
                  element="Proximity details are provided in straight-line distances."
                />
              </div>
            </>
          )}
          {physical && (
            <Resource
              key={v4()}
              view={view}
              title="Physical"
              itemsToDisplay={physical}
            />
          )}
          {transportation && (
            <Resource
              key={v4()}
              view={view}
              title="Transportation"
              itemsToDisplay={transportation}
            />
          )}
          {services && (
            <Resource
              view={view}
              key={v4()}
              title="Services"
              itemsToDisplay={services}
            />
          )}
        </Col>
        <Col xs lg="5" className="leaflet-border pr-0">
          <div
            className="full-border"
            style={{ height: "100%", width: "100%" }}
          >
            <Map
              isSearchMode={false}
              coords={coords}
              setCoords={(c) => dispatch(setCoords(c))}
              setAddress={(a) => dispatch(setAddress(a))}
              nearbyResources={nearbyResources}
              resourceIds={resourceIds}
            />
          </div>
          <LocationsPanel
            address={address}
            coords={coords}
            municipalities={municipalities}
            firstNationCommunities={firstNationCommunities}
          />
          {businessContactName || businessContactEmail ? (
            <BusinessContact
              name={businessContactName}
              email={businessContactEmail}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

OpportunityView.propTypes = {
  view: PropTypes.string,
};

OpportunityView.defaultProps = {
  view: "",
};
