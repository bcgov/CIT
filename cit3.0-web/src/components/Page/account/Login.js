import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Spinner, Jumbotron } from "react-bootstrap";
import { Button } from "shared-components";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from "../../../hooks/use-query";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";
import "./login.css";

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
  const configuration = useConfiguration();

  const handleLogin = () => {
    if (window.location.href.includes("cit-dashboard")) {
      const loginWithIdir = keycloak.createLoginUrl({
        idpHint: "idir",
        redirectUri: encodeURI(`${configuration.baseUrl}/cit-dashboard/home`),
      });
      window.location.href = loginWithIdir;
    }
    if (window.location.href.includes("userstory")) {
      const loginWithIdir = keycloak.createLoginUrl({
        idpHint: "idir",
        redirectUri: window.location.href,
      });
      window.location.href = loginWithIdir;
    } else {
      keycloak.login();
    }
  };
  return (
    <Container className="login" fluid>
      <Container className="unauth" fluid>
        <Row className="sign-in">
          <Col>
            <Jumbotron className="pl-0" style={{ background: "transparent" }}>
              <h2 className="my-4">Community Investment Opportunities Tool</h2>
              <p className="mb-4">
                Sign-in to promote properties available for sale or lease in
                your community and the tool will automatically add key location
                information to support site selection decisions.
              </p>
              <p>Sign into the tool with your Business BCeID.</p>
              <Button
                className="BC-Gov-SecondaryButton"
                label="Sign In"
                styling="bcgov-button bcgov-normal-blue btn mb-4"
                onClick={handleLogin}
              />
            </Jumbotron>
          </Col>
          <Col md>
            <Jumbotron>
              <h3 className="mb-4">Don&apos;t have a Business BCeID?</h3>
              <ol>
                <li>
                  Search to see if your entity is{" "}
                  <a
                    href="https://www.bceid.ca/directories/whitepages"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    already registered
                  </a>{" "}
                  <FaExternalLinkAlt />
                </li>
                <li>
                  If you&apos;re not yet registered, <br />
                  <a
                    href="https://www.bceid.ca/os/?7449"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register for your Business BCeID
                  </a>{" "}
                  <FaExternalLinkAlt />
                </li>
              </ol>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
