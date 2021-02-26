import React from "react";
import Proptypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import PublicLayout from "./PublicLayout";

const AuthLayout = ({ children }) => (
  <PublicLayout>
    <Container
      fluid
      className="d-flex flex-column flex-grow-1"
      style={{ padding: 0 }}
    >
      <Row noGutters>
        <Col>{children}</Col>
      </Row>
    </Container>
  </PublicLayout>
);

AuthLayout.propTypes = {
  children: Proptypes.shape().isRequired,
};

export default AuthLayout;
