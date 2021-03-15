import { act, render } from "@testing-library/react";
import axios from "axios";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import Keycloak from "keycloak-js";
import { createMemoryHistory } from "history";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { store } from "./store";
import App from "./App";
import keycloakConfig from "./keycloak.json";

const keycloak = new Keycloak(keycloakConfig);

test("renders text in header", async () => {
  const promise = Promise.resolve();

  axios.get.mockResolvedValueOnce({
    data: {
      results: [],
    },
  });
  const history = createMemoryHistory();
  const { getByText } = render(
    <ReactKeycloakProvider authClient={keycloak}>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </ReactKeycloakProvider>
  );
  const linkElement = getByText(/Community Investment Tool/i);
  expect(linkElement).toBeInTheDocument();
  await act(async () => promise);
});
