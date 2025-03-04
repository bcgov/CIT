import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";
// import Keycloak from "keycloak-js";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import getKeycloakEventHandler from "./utils/KeycloakEventHandler";
import App from "./App";
import Config from "./Config";
import "./index.css";
import { store } from "./store";
import AuthStateContextProvider from "./contexts/authStateContext";
import AuthProvider from "./contexts/AuthProvider";

axios.defaults.baseURL = Config.apiUrl;
// const keycloak = new Keycloak(Config.keycloakConfig);
// const keycloakProviderInitConfig = {
//   pkceMethod: "S256",
//   checkLoginIframe: false,
// };
const container = document.getElementById("root");
const root = createRoot(container);

// const Index = () => <App />;

const Index = () => (
  <AuthProvider>
    <Provider store={store}>
      <AuthStateContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthStateContextProvider>
    </Provider>
  </AuthProvider>
);

root.render(<Index />);
