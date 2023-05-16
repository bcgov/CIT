import React, { useState, useEffect } from "react";
import { Button } from "shared-components";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useKeycloakWrapper } from "../../../hooks/useKeycloakWrapper";
import useConfiguration from "../../../hooks/useConfiguration";

/** Component that allows the user to logout, and gives information on current user's agency/roles */
const UserProfile = () => {
  const keycloak = useKeycloakWrapper();

  const fallbacDisplayName =
    !!keycloak.firstName && !!keycloak.lastName
      ? `${keycloak.firstName} ${keycloak.lastName}`
      : "default";

  const displayName = keycloak.displayName
    ? keycloak.displayName
    : fallbacDisplayName;

  const configuration = useConfiguration();
  const [isPowerBI, setIsPowerBI] = useState(null);

  useEffect(() => {
    if (location.pathname.includes("/cit-dashboard")) {
      setIsPowerBI(true);
    } else {
      setIsPowerBI(false);
    }
  }, []);

  const isDashboard = () => {
    if (isPowerBI && location.pathname.includes("/cit-dashboard/public")) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div
        className="dropdown-style px-0"
        title={displayName}
        id="user-dropdown"
      >
        {keycloak.obj.authenticated ? (
          <Button
            label={
              <>
                {"Logout "}
                <FaSignOutAlt />
              </>
            }
            onClick={() => {
              if (isPowerBI) {
                keycloak.obj.logout({
                  redirectUri: `${configuration.baseUrl}/cit-dashboard`,
                });
              } else {
                keycloak.obj.logout({
                  redirectUri: `${configuration.baseUrl}/investmentopportunities/home`,
                });
              }
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
              if (isPowerBI && !isDashboard()) {
                const loginWithIdir = keycloak.obj.createLoginUrl({
                  idpHint: "idir",
                  redirectUri: encodeURI(
                    `${configuration.baseUrl}${window.location.pathname}`
                  ),
                });
                window.location.href = loginWithIdir;
              } else if (isDashboard()) {
                const current = window.location.href.replace(
                  "public",
                  "internal"
                );
                const loginWithIdir = keycloak.obj.createLoginUrl({
                  idpHint: "idir",
                  redirectUri: current,
                });
                window.location.href = loginWithIdir;
              } else {
                keycloak.obj.login({
                  redirectUri: `${configuration.baseUrl}${window.location.pathname}`,
                });
              }
            }}
            styling="btn bcgov-button bcgov-normal-white"
          />
        )}
      </div>
    </>
  );
};

export default UserProfile;
