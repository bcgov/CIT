import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

export default function PageTitleHeader({ title, text, span }) {
  return (
    <Col className="my-5">
      <h2 className="mb-4">{title}</h2>
      <p>
        {text}
        {span ? <b> {span}</b> : ""}
      </p>
    </Col>
  );
}

PageTitleHeader.defaultProps = {
  span: "",
};

PageTitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  span: PropTypes.string,
};
