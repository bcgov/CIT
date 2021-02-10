import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import "./NavigationHeaderItem.css";

export default function NavigationHeaderItem({ label, step }) {
  return (
    <Col className="d-flex px-3 flex-column justify-content-center align-items-center">
      <Row className="step mb-2">{step}</Row>
      <Row>{label}</Row>
    </Col>
  );
}

NavigationHeaderItem.propTypes = {
  label: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
};
