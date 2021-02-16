import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import TextInput from "./TextInput";

export default function MaxCapRow({ units, handleChange, name }) {
  return (
    <>
      <Row id="water-max-cap-label">
        Indicate the maximum capacity per hour in cubic metres, if known
      </Row>
      <Row className="align-items-center">
        <Col md className="pl-0 w-25 justify-content-center">
          <TextInput handleChange={handleChange} name={name} rows={1} />
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
    </>
  );
}

MaxCapRow.defaultProps = {
  units: null,
};

MaxCapRow.propTypes = {
  units: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
