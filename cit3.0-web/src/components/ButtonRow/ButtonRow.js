import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import { NavLink } from "react-router-dom";
import "./ButtonRow.css";

export default function ButtonRow({
  onClick,
  prevRoute,
  noContinue,
  cancelLabel,
  continueLabel,
  onCancelClick,
}) {
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
            onClick={onCancelClick}
            label={cancelLabel}
            styling=" BC-Gov-SecondaryButton bc-gov-btn"
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            disabled={noContinue}
            onClick={onClick}
            label={continueLabel}
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
  continueLabel: "Continue",
  cancelLabel: "Cancel & Return to Dashboard",
};

ButtonRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  prevRoute: PropTypes.string,
  noContinue: PropTypes.bool,
  continueLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onCancelClick: PropTypes.func.isRequired,
};
