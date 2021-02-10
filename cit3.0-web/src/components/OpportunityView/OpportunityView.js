import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Resource from "./Resource";

export default function OpportunityView({ data }) {
  const siteInfo = {
    Ownership: "Crown",
    "Parcel Size": "5 ha",
    PID: "456fdsagjio438u9g",
  };
  const physical = {
    "Elevation at location": "100m",
    "Soil Name, Texture, Drainage": "Info here",
    "Access to water (nearest lake)": "3km",
    "Access to water (nearest river)": "5km",
  };
  const transportation = {
    "Nearest Highway": "50m",
    "Nearest Airport": "5km",
    "Nearest railway": "15km",
    "Nearest Port": " 47km",
    "Nearest Canada Customs Port of Entry": "35km",
  };

  const services = {
    "Network Connectivity": {
      "- Speed average": "20 Mbps",
      "- Speed at nearest road": "23 Mbps",
    },
    "Power Transmission Lines": "stuff",
    "Nearest Health Care Facility": "3km",
    "Nearest First Responders": {
      "- Fire": "3km",
      "- Ambulance": "4km",
      "- Police": "2km",
      "- Coast Guard": "10km",
    },
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <Row className="font-weight-bold">
            Site Information - General Details
          </Row>
          <Row>Ownership:</Row>
          <Row>Parcel Size:</Row>
          <Row>PID:</Row>
          <Resource
            title="Site Info - General Details"
            itemsToDisplay={siteInfo}
          />
          <Resource title="Physical" itemsToDisplay={physical} />
          <Resource title="Transportation" itemsToDisplay={transportation} />
          <Resource title="Services" itemsToDisplay={services} />
        </Col>
        <Col>{/* Map Component Here */}</Col>
      </Row>
    </Container>
  );
}

OpportunityView.propTypes = {
  data: PropTypes.shape().isRequired,
};
