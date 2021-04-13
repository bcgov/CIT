import "./Header.scss";

import React from "react";
import { useHistory } from "react-router";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import UserProfile from "./UserProfile";
import Roles from "../../../constants/roles";

const Header = () => {
  const keycloak = useKeycloakWrapper();
  const history = useHistory();

  return (
    <>
      <header className="bcgov-header" data-testid="Header">
        <Navbar expand className="App-header">
          <Navbar.Brand>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www2.gov.bc.ca/gov/content/home"
            >
              <img
                className="bc-gov-icon longIcon"
                src="/images/bcid-logo-rev-en.svg"
                width="175"
                height="43"
                alt="Go to the Government of British Columbia website"
              />
            </a>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Item>
              <div className="title">
                Community Investment Opportunities Tool
              </div>
            </Nav.Item>
          </Nav>
          {keycloak.obj && <UserProfile />}
        </Navbar>
      </header>
      {keycloak.obj.authenticated ? (
        <div className="navigation-container no-print">
          {keycloak.hasRole([Roles.ECONOMIC_DEVELOPMENT_OFFICER]) && (
            <Button
              variant="link"
              className="text-white"
              onClick={() => history.push("/dashboard")}
            >
              Dashboard
            </Button>
          )}
          {keycloak.hasRole([
            Roles.SUPER_ADMINISTRATOR,
            Roles.SYSTEM_ADMINISTRATOR,
          ]) && (
            <Button
              variant="link"
              className="text-white"
              onClick={() => history.push("/manage/opportunities/")}
            >
              Manage Opportunities
            </Button>
          )}
          {keycloak.hasRole([
            Roles.SUPER_ADMINISTRATOR,
            Roles.SYSTEM_ADMINISTRATOR,
          ]) && (
            <Button
              variant="link"
              className="text-white"
              onClick={() => history.push("/manage/users/")}
            >
              Manage Users
            </Button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Header;
