import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { useHistory, NavLink } from "react-router-dom";
import "./ButtonRow.css";

export default function ButtonRow({ onClick, prevRoute, noContinue }) {
  const history = useHistory();
  return (
    <Container className="bottom">
      {prevRoute && (
        <Row className="mb-2">
          <Col>
            <NavLink to={prevRoute} replace>
              {"<<"} Previous Page
            </NavLink>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Button
            onClick={() => history.push("/")}
            label="Cancel & Return to Dashboard"
            styling="bcgov-normal-white btn"
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            disabled={noContinue}
            onClick={onClick}
            label="Continue"
            styling="bcgov-normal-blue btn"
          />
        </Col>
      </Row>
    </Container>
  );
}

ButtonRow.defaultProps = {
  prevRoute: null,
  noContinue: false,
};

ButtonRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  prevRoute: PropTypes.string,
  noContinue: PropTypes.bool,
};
