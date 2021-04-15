import "./Header.scss";

import React from "react";
import { useHistory, useLocation } from "react-router";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import UserProfile from "./UserProfile";
import Roles from "../../../constants/roles";

const Header = () => {
  const keycloak = useKeycloakWrapper();
  const history = useHistory();
  const location = useLocation();

  const title = () => {
    if (location.pathname.includes("/investmentopportunities")) {
      return "Community Investment Opportunities Tool";
    }
    if (location.pathname.includes("/dashboard")) {
      return "Community Insights Tool";
    }
    return "";
  };

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
              <div className="title">{title()}</div>
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
              onClick={() => history.push("/investmentopportunities/dashboard")}
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
              onClick={() => history.push("/manage/investmentopportunities/")}
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
