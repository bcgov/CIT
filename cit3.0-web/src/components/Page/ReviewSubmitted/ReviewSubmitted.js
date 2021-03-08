import React from "react";
import { Button } from "shared-components/build/components/button/Button";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styles from "./ReviewSubmitted.module.css";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import { resetOpportunity } from "../../../store/actions/opportunity";

const ReviewSubmitted = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const backToDashboard = () => {
    dispatch(resetOpportunity());
    history.push("/dashboard");
  };
  return (
    <div className={styles.ReviewSubmitted} data-testid="ReviewSubmitted">
      <PortalHeader />
      <Container className="success-contianer">
        <h2>Your Investment Opportunity has been successfully submitted.</h2>
        <p>
          You submission will be reviewed. You can check the status of your
          submission on your dashboard.
        </p>
      </Container>
      <hr className="hr-bold" />
      <Container className="d-flex justify-content-end">
        <Button
          id="return"
          label="Return to Dashboard"
          onClick={() => backToDashboard()}
          styling="bcgov-normal-blue btn"
        />
      </Container>
    </div>
  );
};

export default ReviewSubmitted;
