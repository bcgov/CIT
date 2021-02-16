import { Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Radios({ labels, name, handleRadioChange }) {
  const mapLabels = (values) =>
    values.map((label) => (
      <Form.Check
        key={label}
        onChange={(e) => handleRadioChange(name, label, e.target.value)}
        inline
        type="radio"
        label={label}
        aria-label={label}
        name={name}
      />
    ));
  return <Row>{mapLabels(labels)}</Row>;
}
Radios.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
};
