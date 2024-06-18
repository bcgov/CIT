import "./Header.scss";

import { Navbar, Nav } from "react-bootstrap";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import UserProfile from "./UserProfile";

const Header = () => {
  const keycloak = useKeycloakWrapper();
  const title = "Community Information Tool";

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
              <div className="title">{title}</div>
            </Nav.Item>
          </Nav>
          {keycloak.obj && <UserProfile />}
        </Navbar>
      </header>
    </>
  );
};

export default Header;
