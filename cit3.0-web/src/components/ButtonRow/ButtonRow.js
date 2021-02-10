import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { useHistory } from "react-router-dom";
import "./ButtonRow.css";

export default function ButtonRow({ showPrevious, onClick }) {
  const history = useHistory();
  return (
    <Row className="bottom">
      <Col>
        <Button
          onClick={() => history.push("/")}
          label="Cancel & Return to Dashboard"
          styling="bcgov-normal-white btn"
        />
      </Col>
      <Col className="d-flex justify-content-end">
        <Button
          onClick={onClick}
          label="Continue"
          styling="bcgov-normal-blue btn"
        />
      </Col>
    </Row>
  );
}

ButtonRow.defaultProps = {
  showPrevious: false,
};

ButtonRow.propTypes = {
  showPrevious: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
