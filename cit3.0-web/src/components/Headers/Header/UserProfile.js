import React from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { Button } from "shared-components";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";

/** Component that allows the user to logout, and gives information on current user's agency/roles */
const UserProfile = () => {
  const keycloak = useKeycloakWrapper();
  // eslint-disable-next-line
  const displayName = keycloak.displayName
    ? keycloak.displayName
    : !!keycloak.firstName && !!keycloak.lastName
    ? `${keycloak.firstName} ${keycloak.lastName}`
    : "default";
  const configuration = useConfiguration();

  return (
    <>
      <Image className="avatar" src="/images/profile.svg" rounded />
      <div
        className="dropdown-style px-0"
        title={displayName}
        id="user-dropdown"
      >
        <NavDropdown.Item>
          {keycloak.obj.authenticated ? (
            <Button
              label={
                <>
                  {"Logout "}
                  <FaSignOutAlt />
                </>
              }
              onClick={() => {
                keycloak.obj.logout({
                  redirectUri: `${configuration.baseUrl}`,
                });
              }}
              styling="btn bcgov-button bcgov-normal-white"
            />
          ) : (
            <Button
              label={
                <>
                  {"Login "}
                  <FaSignInAlt />
                </>
              }
              onClick={() => {
                keycloak.obj.login({
                  redirectUri: `${configuration.baseUrl}${window.location.pathname}`,
                });
              }}
              styling="btn bcgov-button bcgov-normal-white"
            />
          )}
        </NavDropdown.Item>
      </div>
    </>
  );
};

export default UserProfile;
