import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import TextInput from "./TextInput";
import Validator from "./Validator";

export default function MaxCapRow({
  units,
  handleChange,
  name,
  value,
  unitString,
  valid,
}) {
  return (
    <>
      <Row className="mt-4" id="water-max-cap-label">
        {units !== "MW"
          ? `Indicate the maximum capacity per hour in ${unitString}, if known`
          : `Indicate the total capacity in Megawatts, if known`}
      </Row>
      <Row className="align-items-center mb-0">
        <Col md className="pl-0 w-25 justify-content-center">
          <TextInput
            aria-labelledby="water-max-cap-label"
            handleChange={handleChange}
            name={name}
            rows={1}
            value={value}
          />
        </Col>
        <Col xs className="justify-content-center pl-0">
          {units ? (
            <p>{units}</p>
          ) : (
            <p>
              m<sup>3</sup>/hour
            </p>
          )}
        </Col>
        <Col xs />
      </Row>
      {!valid && (
        <Row>
          <Validator message="Please enter a valid number" />
        </Row>
      )}
    </>
  );
}

MaxCapRow.defaultProps = {
  units: null,
  unitString: "",
  valid: true,
};

MaxCapRow.propTypes = {
  units: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  unitString: PropTypes.string,
  valid: PropTypes.bool,
};
