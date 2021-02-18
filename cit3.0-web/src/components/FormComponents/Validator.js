import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

export default function Validator({ message }) {
  return (
    <p className="mt-0" style={{ color: "red" }}>
      {message}
    </p>
  );
}

Validator.propTypes = {
  message: PropTypes.string.isRequired,
};
