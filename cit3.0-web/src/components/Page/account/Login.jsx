import React from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaExternalLinkAlt } from "react-icons/fa";
import useKeycloakWrapper from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";

const Login = () => {
  return (
    <Container className="login" fluid>
      <Container className="unauth p-4 mb-4">
        <h2 className="my-4">Login to Community Information Tool</h2>
        <Row className="sign-in">
          <Col md>
            <Container className="p-4 mb-4 bg-light rounded">
              <h3 className="mb-4">Don&apos;t have a Business BCeID?</h3>
              <p>
                1. Search to see if your entity is{" "}
                <a
                  href="https://www.bceid.ca/directories/whitepages"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  already registered
                </a>{" "}
                <FaExternalLinkAlt />
              </p>
              <p>
                If you&apos;re not yet registered, <br />
                2.{" "}
                <a
                  href="https://www.bceid.ca/os/?7449"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register for your Business BCeID
                </a>{" "}
                <FaExternalLinkAlt />
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
