import PropTypes from "prop-types";
import "../NavigationHeaderItem/NavigationHeaderItem.css";
import { AiOutlineCheck } from "react-icons/ai";
import { Row } from "react-bootstrap";

export default function NavigationCircle({ step, currentStep }) {
  return (
    <>
      {currentStep === step && (
        <Row className="step current mb-2 mx-2">{step}</Row>
      )}
      {currentStep < step && <Row className="step future mb-2">{step}</Row>}
      {currentStep > step && (
        <Row className="step past mb-2">
          <AiOutlineCheck
            className="gov-blue check"
            style={{ fontSize: "32px" }}
          />
        </Row>
      )}
    </>
  );
}

NavigationCircle.propTypes = {
  step: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};
