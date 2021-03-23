import * as React from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";
import { useKeycloakWrapper } from "../hooks/useKeycloakWrapper";

export const AuthStateContext = React.createContext({
  ready: false,
});

const AuthStateContextProvider = ({ children }) => {
  const keycloak = useKeycloakWrapper();
  const [userInfo, setUserInfo] = React.useState(null);
  const keycloakReady = useSelector((state) => state.keycloakReady);

  React.useEffect(() => {
    if (keycloak.obj && keycloak.obj.authenticated) {
      const loadUserInfo = () => {
        keycloak.obj
          .loadUserInfo()
          .then((user) => {
            setUserInfo(user);
          })
          .catch((e) => {
            // eslint-disable-next-line
            console.error(e);
          });
      };
      loadUserInfo();
    }
  }, [keycloakReady]);

  return (
    <AuthStateContext.Provider
      value={{
        // if user info is not available when authenticated, then the auth state is not ready
        ready:
          keycloakReady &&
          keycloak.obj &&
          (!keycloak.obj.authenticated ||
            (keycloak.obj.authenticated && !!keycloak.obj.userInfo)),
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

AuthStateContextProvider.propTypes = { children: Proptypes.shape().isRequired };

export default AuthStateContextProvider;
