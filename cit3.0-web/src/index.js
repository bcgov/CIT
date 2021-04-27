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
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

axios.defaults.baseURL = Config.apiUrl;
const keycloak = new Keycloak(Config.keycloakConfig);

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
