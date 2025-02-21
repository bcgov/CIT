import { Button } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import useKeycloakWrapper from "../../../hooks/useKeycloakWrapper";
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
  const isDashboard = () => {
    if (location.pathname.includes("/cit-dashboard/public")) {
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
            label="Logout"
            onClick={() => {
              keycloak.obj.logout({
                redirectUri: `${configuration.baseUrl}/cit-dashboard`,
              });
            }}
            styling="btn bcgov-button bcgov-normal-white"
          >
            <>
              {"Logout "}
              <FaSignOutAlt />
            </>
          </Button>
        ) : (
          <Button
            label="Login"
            onClick={async () => {
              if (!isDashboard()) {
                const loginWithIdir = await keycloak.obj.createLoginUrl({
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
                const loginWithIdir = await keycloak.obj.createLoginUrl({
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
          >
            <>
              {"Login "}
              <FaSignInAlt />
            </>
          </Button>
        )}
      </div>
    </>
  );
};

export default UserProfile;
