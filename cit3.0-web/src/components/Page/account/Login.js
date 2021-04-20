import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Spinner, Jumbotron } from "react-bootstrap";
import { Button } from "shared-components";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from "../../../hooks/use-query";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";

// @todo: Move to actions / status sources
// const NEW_CIT_USER = 201;

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
  const keyCloakWrapper = useKeycloakWrapper();
  const keycloak = keyCloakWrapper.obj;
  const isIE = usingIE();
  if (!keycloak) {
    return <Spinner animation="border" />;
  }
  if (keycloak && keycloak.authenticated) {
    return <Redirect to={redirect || "/investmentopportunities/dashboard"} />;
  }
  if (isIE) {
    return <Redirect to={{ pathname: "/ienotsupported" }} />;
  }
  return (
    <Container className="login" fluid>
      <Container className="unauth" fluid>
        <h2 className="my-4">Login to Community Information Tool</h2>
        <Row className="sign-in">
          <Col>
            <Jumbotron className="pl-0" style={{ background: "transparent" }}>
              <h3 className="mb-4">
                Create and manage investment opportunities
              </h3>
              <p className="mb-4">
                The data provided can assist your agency in making informed,
                timely, and strategic decisions on the optimal use of real
                community assets on behalf of the people and priorities of
                British Columbia.
              </p>
              <hr className="hr-bold" />
              <Button
                label="Sign In"
                styling="bcgov-button bcgov-normal-blue btn mb-4"
                onClick={() => keycloak.login()}
              />
              <p>
                Sign into CIT with your government issued IDIR or with your
                Business BCeID.
              </p>
            </Jumbotron>
          </Col>
          <Col md>
            <Jumbotron>
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
                  href="https://www.bceid.ca/os/?7169"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register for your Business BCeID
                </a>{" "}
                <FaExternalLinkAlt />
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
