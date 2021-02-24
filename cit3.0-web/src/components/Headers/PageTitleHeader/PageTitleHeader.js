import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

export default function PageTitleHeader({ title, text }) {
  return (
    <Col className="my-5">
      <h2 className="mb-4">{title}</h2>
      <p>{text}</p>
    </Col>
  );
}

PageTitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
