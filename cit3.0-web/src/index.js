import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import getKeycloakEventHandler from "./utils/KeycloakEventHandler";
import App from "./App";
import "./index.css";
import { store } from "./store";
import AuthStateContextProvider from "./contexts/authStateContext";
import keycloakConfig from "./keycloak.json";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const keycloak = new Keycloak(keycloakConfig);

const Index = () => (
  <ReactKeycloakProvider
    authClient={keycloak}
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
