import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import "./NavigationHeaderItem.css";
import NavigationCircle from "../NavigationCircle/NavigationCircle";

export default function NavigationHeaderItem({ label, step, currentStep }) {
  return (
    <Col className="d-flex px-3 flex-column justify-content-center align-items-center">
      <Row>
        <NavigationCircle step={step} currentStep={currentStep} />
      </Row>
      <Row>{label}</Row>
    </Col>
  );
}

NavigationHeaderItem.propTypes = {
  label: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};
