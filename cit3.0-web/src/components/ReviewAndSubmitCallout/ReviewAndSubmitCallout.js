import React from "react";
import PropTypes from "prop-types";
import { Button } from "shared-components/build/components/button/Button";
import { Col, Container, NavLink, Row } from "react-bootstrap";
import { Input } from "shared-components/build/components/input/Input";
import styles from "./ReviewAndSubmitCallout.module.css";

/* eslint-disable jsx-a11y/label-has-associated-control */
const input = {
  id: "opportunity-name",
  placeholder: "Enter Name here. (eg. Old mill on Main St.",
  isReadOnly: false,
  isRequired: false,
};

const ReviewAndSubmitCallout = ({
  prevRoute,
  submitOpportunity,
  cancelOpportunity,
}) => (
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
          When you are ready to proceed and submit this opportunity for review,
          click the &quot;Submit my Opportunity&quot; button below. We will
          review the submission within [x] days. You can see the status of your
          submission on your dashboard.
        </p>
        <div role="form">
          <label className="d-flex flex-column" aria-label="opportunity-name">
            Name this Opportunity
            <span>
              This field is optional and will only be seen by you on your
              dashboard
            </span>
          </label>
          <Input
            aria-labelledby="opportunity-name"
            input={{
              ...input,
              styling: "bcgov-editable-white",
            }}
            onChange={() => {}}
          />
        </div>
        <hr className="hr-bold" />
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
          onClick={cancelOpportunity}
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

ReviewAndSubmitCallout.propTypes = {
  submitOpportunity: PropTypes.func.isRequired,
  cancelOpportunity: PropTypes.func.isRequired,
  prevRoute: PropTypes.string,
};

ReviewAndSubmitCallout.defaultProps = {
  prevRoute: null,
};

export default ReviewAndSubmitCallout;
