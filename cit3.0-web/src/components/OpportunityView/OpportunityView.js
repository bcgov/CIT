import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Resource from "./Resource";
import LocationsPanel from "../LocationsPanel/LocationsPanel";
import BusinessContact from "../BusinessContact/BusinessContact";
import Map from "../Map/Map";
import {
  setCoords,
  setAddress,
  setNearbyResources,
} from "../../store/actions/opportunity";
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
  const businessContact = useSelector(
    (state) => state.opportunity.businessContact
  );

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <Resource
            title="Site Info - General Details"
            itemsToDisplay={overallInfo}
          />
          <Resource title="Physical" itemsToDisplay={physical} />
          <Resource title="Transportation" itemsToDisplay={transportation} />
          <Resource title="Services" itemsToDisplay={services} />
        </Col>
        <Col xs lg="5" className="leaflet-border pr-0">
          <Map
            setNearbyResources={(r) => dispatch(setNearbyResources(r))}
            coords={coords}
            setCoords={(c) => dispatch(setCoords(c))}
            setAddress={(a) => dispatch(setAddress(a))}
            nearbyResources={nearbyResources}
            resourceIds={resourceIds}
          />
          <LocationsPanel
            address={address}
            coords={coords}
            municipalities={municipalities}
            firstNationCommunities={firstNationCommunities}
          />
          {businessContact.name || businessContact.email ? (
            <BusinessContact
              name={businessContact.name}
              email={businessContact.email}
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
