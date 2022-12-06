import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import getKeycloakEventHandler from "./utils/KeycloakEventHandler";
import App from "./App";
import Config from "./Config";
import "./index.css";
import { store } from "./store";
import AuthStateContextProvider from "./contexts/authStateContext";

axios.defaults.baseURL = Config.apiUrl;
const keycloak = new Keycloak(Config.keycloakConfig);
const Index = () => (
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ pkceMethod: "256",
                   checkLoginIframe: false,
                   onLoad: "login-required"}}
    onEvent={getKeycloakEventHandler(keycloak)}
  >
    <Provider store={store}>
      <AuthStateContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthStateContextProvider>
    </Provider>
  </ReactKeycloakProvider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
