import React, { createContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import Config from "../Config";

export const AuthContext = createContext({
  keycloak: null,
  isAuthenticated: false,
  initialized: false,
});

const keycloak = new Keycloak(Config.keycloakConfig);

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
        console.log("error with keycloak init");
        setInitialized(true); // Even if it fails, we should mark it as initialized
      });

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
