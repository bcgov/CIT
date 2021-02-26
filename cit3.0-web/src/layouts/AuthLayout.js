import React from "react";
import Proptypes from "prop-types";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { AuthStateContext } from "../contexts/authStateContext";
import { useKeycloakWrapper } from "../hooks/useKeycloakWrapper";
import PublicLayout from "./PublicLayout";

const AuthLayout = ({ children }) => {
  const keycloak = useKeycloakWrapper();
  return (
    <AuthStateContext.Consumer>
      {(context) => {
        if (!context.ready) {
          return <Spinner animation="border" />;
        }

        return (
          <PublicLayout>
            {keycloak && !!keycloak.authenticated && (
              <Container fluid className="App-navbar px-0">
                <Container className="px-0">Secrets</Container>
              </Container>
            )}
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
      }}
    </AuthStateContext.Consumer>
  );
};

AuthLayout.propTypes = {
  children: Proptypes.symbol.isRequired,
};

export default AuthLayout;
