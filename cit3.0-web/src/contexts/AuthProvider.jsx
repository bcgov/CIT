import React, { createContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import Config from "../Config";
import { store } from "../store";
import { saveJwt, clearJwt } from "../store/reducers/JwtSlice";
import { setKeycloakReady } from "../store/reducers/keycloakReadySlice";

export const AuthContext = createContext({
  keycloak: null,
  isAuthenticated: false,
  initialized: false,
});

const keycloak = new Keycloak(Config.keycloakConfig);
// The below replaces KeycloakEventHandler.jsx
keycloak.onReady = () => {
  store.dispatch(setKeycloakReady(true));
};

keycloak.onAuthLogout = () => {
  store.dispatch(clearJwt());
};

keycloak.onAuthSuccess = () => {
  if (keycloak.token) {
    store.dispatch(saveJwt(keycloak.token));
  }
};
keycloak.onAuthRefreshSuccess = () => {
  if (keycloak.token) {
    store.dispatch(saveJwt(keycloak.token));
  }
};
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initOptions = {
      pkceMethod: "S256",
      checkLoginIframe: false,
    };

    keycloak
      .init(initOptions)
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setInitialized(true);
      })
      .catch((e) => {
        setInitialized(true); // Even if it fails, we should mark it as initialized
      });
    console;
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).catch(() => keycloak.logout());
    };
  }, []);

  return (
    <AuthContext.Provider value={{ keycloak, isAuthenticated, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
