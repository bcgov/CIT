import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Container fluid data-testid="NotFoundPage">
    <Row>
      <Col>
        <h1>Page not found</h1>
        <Link to="/search">Go back to the search</Link>
      </Col>
    </Row>
  </Container>
);

export default NotFoundPage;
