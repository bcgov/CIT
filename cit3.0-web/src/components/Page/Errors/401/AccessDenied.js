import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Alert } from "shared-components/build/components/alert/Alert";
import { MdError } from "react-icons/md";

const AccessDenied = () => (
  <Container data-testid="AccessDeniedPage">
    <Row>
      <Col>
        <h2 className="my-4">Access Denied</h2>
        <Alert
          icon={<MdError size={32} />}
          type="error"
          styling="bcgov-error-background my-4"
          element="You do not have permission to view this page."
        />
        <h2 className="my-4">Oh no! What can I do next?</h2>
        <ol style={{ lineHeight: "2rem" }} className="my-4">
          <li>Be sure to login with the correct credentials.</li>
          <li>
            If you received permissions recently, refresh the page to get the
            new role.
          </li>
          <li>
            If this message is shown in error{" "}
            <a href={`mailto:citinfo@gov.bc.ca?subject="Permission Request"`}>
              contact us
            </a>{" "}
            for assistance.
          </li>
        </ol>
        <hr className="hr-bold my-2" />
        <div className="d-flex justify-content-between">
          <Link to="/investmentopportunities/search/">Return to Homepage</Link>
          <Link to="/login/">Login to continue</Link>
        </div>
      </Col>
    </Row>
  </Container>
);

export default AccessDenied;
