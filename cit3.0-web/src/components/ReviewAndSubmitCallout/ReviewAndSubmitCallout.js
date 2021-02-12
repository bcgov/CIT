import React from "react";
import PropTypes from "prop-types";
import { Button } from "shared-components/build/components/button/Button";
import { Col, Container, NavLink, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./ReviewAndSubmitCallout.module.css";

const ReviewAndSubmitCallout = ({ prevRoute, onClick }) => {
  const history = useHistory();
  const confirmCancel = () => {
    if (confirm("Are you sure you want discard this opportunity?")) {
      history.push("/");
    }
  };
  const submitOpportunity = () => {
    console.log("calling submission endpoint");
  };
  return (
    <Container
      className={styles.ReviewAndSubmitCallout}
      data-testid="ReviewAndSubmitCallout"
    >
      <Row>
        <Col>
          <p>
            This screen shows you the listing for your investment opportunity as
            it will appear on the Investor Portal. All the data you see on this
            page comes from different open source databases.
          </p>
          <p>
            When you are ready to proceed and submit this opportunity for
            review, click the &quot;Submit my Opportunity&quot; button below. We
            will review the submission within [x] days.
          </p>
          <hr />
        </Col>
      </Row>
      {prevRoute && (
        <Row className="mb-4">
          <Col>
            <NavLink id="back" to={prevRoute} replace>
              {"<<"} Previous Page
            </NavLink>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Button
            id="cancel"
            onClick={confirmCancel}
            label="Cancel & Return to Dashboard"
            styling="bcgov-normal-white btn"
          />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            id="submit"
            onClick={submitOpportunity}
            label="Submit my Opportunity"
            styling="bcgov-normal-blue btn"
          />
        </Col>
      </Row>
    </Container>
  );
};

ReviewAndSubmitCallout.propTypes = {
  onClick: PropTypes.func.isRequired,
  prevRoute: PropTypes.string,
};

ReviewAndSubmitCallout.defaultProps = {
  prevRoute: null,
};

export default ReviewAndSubmitCallout;
