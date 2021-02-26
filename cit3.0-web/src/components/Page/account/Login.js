import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Jumbotron,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from "../../../hooks/use-query";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";

// @todo: Move to actions / status sources
const NEW_CIT_USER = 201;
const ADD_ACTIVATE_USER = "activateUser";

// check to see if user is using Internet Explorer
// as their browser
const usingIE = () => {
  const { userAgent } = window.navigator;
  const isOldIE = userAgent.indexOf("MSIE "); // tag used for IE 10 or older
  const isIE11 = userAgent.indexOf("Trident/"); // tag used for IE11
  if (isOldIE > 0 || isIE11 > 0) return true;
  return false;
};

const Login = () => {
  const { redirect } = useQuery();
  const [showInstruction, setShowInstruction] = useState(false);
  const keyCloakWrapper = useKeycloakWrapper();
  const keycloak = keyCloakWrapper.obj;
  const isIE = usingIE();
  const activated = useSelector((state) => state.network[ADD_ACTIVATE_USER]);
  if (!keycloak) {
    return <Spinner animation="border" />;
  }
  if (keycloak && keycloak.authenticated) {
    if (
      (activated && activated.status === NEW_CIT_USER) ||
      (keyCloakWrapper &&
        keyCloakWrapper.roles &&
        !keyCloakWrapper.roles.length)
    ) {
      return <Redirect to={{ pathname: "/access/request" }} />;
    }
    return <Redirect to={redirect || "/mapview"} />;
  }
  if (isIE) {
    return <Redirect to={{ pathname: "/ienotsupported" }} />;
  }
  return (
    <Container className="login" fluid>
      <Container className="unauth" fluid>
        <h1>Search and visualize government property information</h1>
        <Row className="sign-in">
          <Col xs={1} md={3} />
          <Col xs={16} md={6} className="block">
            <h6>
              CIT enables you to search opportunities owned by the Government of
              British Columbia
            </h6>
            <p>
              The data provided can assist your agency in making informed,
              timely, and strategic decisions on the optimal use of real
              property assets on behalf of the people and priorities of British
              Columbia.
            </p>
            <Button variant="primary" onClick={() => keycloak.login()}>
              Sign In
            </Button>
            <p>
              Sign into CIT with your government issued IDIR or with your
              Business BCeID.
            </p>
            <Row className="bceid">
              <Button
                variant="link"
                onClick={() => setShowInstruction(!showInstruction)}
              >
                Don&apos;t have a Business BCeID?
              </Button>
            </Row>
            <Row>
              {showInstruction && (
                <Jumbotron>
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
                      href="https://www.bceid.ca/os/?7169"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register for your Business BCeID
                    </a>{" "}
                    <FaExternalLinkAlt />
                  </p>
                </Jumbotron>
              )}
            </Row>
          </Col>
          <Col xs={1} md={3} />
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
