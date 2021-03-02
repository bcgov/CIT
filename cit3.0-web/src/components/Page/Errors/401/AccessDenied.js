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
          element="You do not have permission to view this page"
        />
        <hr className="hr-bold my-2" />
        <Link to="/login">Login to continue</Link>
      </Col>
    </Row>
  </Container>
);

export default AccessDenied;
