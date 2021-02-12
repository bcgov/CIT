import { Container, Row, Col } from "react-bootstrap";
/// import PropTypes from "prop-types";
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

export default function OpportunityView() {
  const dispatch = useDispatch();

  // Site info sections
  const siteInfo = useSelector((state) => state.opportunity.siteInfo);
  const physical = useSelector((state) => state.opportunity.physical);
  const transportation = useSelector(
    (state) => state.opportunity.transportation
  );
  const services = useSelector((state) => state.opportunity.services);
  const address = useSelector((state) => state.opportunity.address);
  const coords = useSelector((state) => state.opportunity.coords);
  const municipalities = useSelector(
    (state) => state.opportunity.municipalities
  );
  const nearbyResources = useSelector(
    (state) => state.opportunity.nearbyResources
  );
  const businessContact = useSelector(
    (state) => state.opportunity.businessContact
  );

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <Resource
            title="Site Info - General Details"
            itemsToDisplay={siteInfo}
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
          />
          <LocationsPanel
            address={address}
            coords={coords}
            municipalities={municipalities}
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

// OpportunityView.propTypes = {
//   data: PropTypes.shape().isRequired,
// };
