import { describe, test, expect, vi } from "vitest"; // Import Vitest functions
import { act, render } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for React Router v6
import { Provider } from "react-redux";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { store } from "./store";
import App from "./App";

// Mock Axios
vi.mock("axios");

//TODO: add config or mock for keycloak
const keycloak = new Keycloak(keycloakConfig);

describe("App Component", () => {
  test("renders text in header", async () => {
    axios.get.mockResolvedValueOnce({ data: { results: [] } });

    await act(async () => {
      const { getByText } = render(
        <ReactKeycloakProvider authClient={keycloak}>
          <Provider store={store}>
            <MemoryRouter>
              <App />
            </MemoryRouter>
          </Provider>
        </ReactKeycloakProvider>,
      );

      const linkElement = getByText(/Community Information Tool/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
