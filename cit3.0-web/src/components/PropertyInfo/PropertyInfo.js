import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

export default function PropertyInfo({ info, tag }) {
  return (
    <Row className="my-4">
      <Col>{tag ? <p>{info}</p> : <h3>{info}</h3>}</Col>
    </Row>
  );
}

PropertyInfo.defaultProps = {
  tag: true,
};

PropertyInfo.propTypes = {
  info: PropTypes.string.isRequired,
  tag: PropTypes.bool,
};
