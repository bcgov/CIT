import "./Header.scss";

import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBomb } from "react-icons/fa";
import _ from "lodash";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import UserProfile from "./UserProfile";
/* eslint-disable */
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const keycloak = useKeycloakWrapper();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClear = () => {
    errors.forEach((error) => dispatch(clear(error.name)));
    setShow(false);
  };

  const isNetworkError = (x) => x.type === "ERROR";
  const errors = useSelector((state) => {
    const errors = [];
    _.values(state).forEach((reducer) => {
      _.values(reducer)
        .filter((x) => x instanceof Object)
        .forEach((action) => {
          if (isNetworkError(action)) {
            errors.push(action);
          }
        });
    });
    return errors;
  });

  return (
    <header className="bcgov-header">
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
              width="156"
              height="43"
              alt="Go to the Government of British Columbia website"
            />
            <img
              className="bc-gov-icon shortIcon"
              src="/images/bcid-symbol-rev.svg"
              width="156"
              height="43"
              alt="Go to the Government of British Columbia website"
            />
          </a>
        </Navbar.Brand>
        <Nav className="title mr-auto">
          <Nav.Item>
            <div className="title longAppName">Community Information Tool</div>
            <div className="title shortAppName">CIT</div>
          </Nav.Item>
        </Nav>
        {keycloak.obj && <UserProfile />}
        <Nav className="other">
          {errors && errors.length ? (
            <FaBomb size={30} className="errors" onClick={handleShow} />
          ) : null}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
