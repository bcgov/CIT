import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { useHistory, NavLink } from "react-router-dom";
import "./ButtonRow.css";
import { useDispatch } from "react-redux";
import { resetOpportunity } from "../../store/actions/opportunity";

export default function ButtonRow({ onClick, prevRoute, noContinue }) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Container className="bottom">
      {prevRoute && (
        <Row className="mb-4">
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
            onClick={() => {
              dispatch(resetOpportunity());
              history.push("/dashboard");
            }}
            label="Cancel & Return to Dashboard"
            styling=" BC-Gov-SecondaryButton bc-gov-btn"
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            disabled={noContinue}
            onClick={onClick}
            label="Continue"
            styling="bcgov-normal-blue btn primary"
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
