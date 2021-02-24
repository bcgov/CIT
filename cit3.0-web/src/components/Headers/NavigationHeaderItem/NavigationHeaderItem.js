import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import "./NavigationHeaderItem.css";
import NavigationCircle from "../NavigationCircle/NavigationCircle";

export default function NavigationHeaderItem({ label, step, currentStep }) {
  return (
    <Col
      xs="auto"
      data-testid="nav-item"
      className="d-flex flex-column justify-content-center align-items-center nav-item"
    >
      <NavigationCircle step={step} currentStep={currentStep} />
      <Row className="nav-label">{label}</Row>
    </Col>
  );
}

NavigationHeaderItem.propTypes = {
  label: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};
