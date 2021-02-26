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
    const loadUserInfo = async () => {
      console.log(keycloak);
      if (keycloak.obj) {
        const user = await keycloak.obj.loadUserInfo();
        setUserInfo(user);
      }
    };

    loadUserInfo();
  }, [keycloak.obj]);

  return (
    <AuthStateContext.Provider
      value={{
        // if user info is not available when authenticated, then the auth state is not ready
        ready:
          keycloakReady &&
          keycloak.obj &&
          (!keycloak.obj.authenticated ||
            (keycloak.obj.authenticated && !!userInfo)),
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

AuthStateContextProvider.propTypes = { children: Proptypes.shape().isRequired };

export default AuthStateContextProvider;
