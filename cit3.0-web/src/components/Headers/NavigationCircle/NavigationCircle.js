import PropTypes from "prop-types";
import "../NavigationHeaderItem/NavigationHeaderItem.css";
import { AiOutlineCheck } from "react-icons/ai";

export default function NavigationCircle({ step, currentStep }) {
  return (
    <>
      {currentStep === step && <div className="step current mb-2">{step}</div>}
      {currentStep < step && <div className="step future mb-2">{step}</div>}
      {currentStep > step && (
        <div className="step past mb-2">
          <AiOutlineCheck className="fa-2x gov-blue" />
        </div>
      )}
    </>
  );
}

NavigationCircle.propTypes = {
  step: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};
