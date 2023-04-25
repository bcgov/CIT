import "./Header.scss";

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import UserProfile from "./UserProfile";
import Roles from "../../../constants/roles";

const Header = () => {
  const keycloak = useKeycloakWrapper();
  const history = useHistory();
  const location = useLocation();
  const [isPowerBI, setIsPowerBI] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const title = () => {
    if (location.pathname.includes("/investmentopportunities")) {
      return "Community Investment Opportunities Tool";
    }
    if (location.pathname.includes("/manage/users/")) {
      return "Community Investment Opportunities Tool";
    }
    if (location.pathname.includes("/cit-dashboard")) {
      return "Community Information Tool";
    }
    if (location.pathname.includes("/userstory")) {
      return "Community Information Tool";
    }
    return "";
  };

  useEffect(() => {
    if (
      location.pathname.includes("/investmentopportunities") ||
      location.pathname.includes("/manage/users/")
    ) {
      setIsPowerBI(false);
    } else {
      setIsPowerBI(true);
    }
  });

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
              <Link
                className="text-white main-header-text"
                to={
                  isPowerBI
                    ? "/cit-dashboard/home"
                    : "/investmentopportunities/home"
                }
              >
                <div className="title">{title()}</div>
              </Link>
            </Nav.Item>
          </Nav>
          {keycloak.obj && <UserProfile />}
        </Navbar>
      </header>
      {keycloak.obj.authenticated && !isPowerBI ? (
        <div className="navigation-container no-print">
          <Button
            variant="link"
            className="text-white"
            onClick={() => history.push("/investmentopportunities/dashboard")}
          >
            Dashboard
          </Button>
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
          {isAvailable &&
            keycloak.hasRole([
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
