import React from "react";
import { createMemoryHistory } from "history";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import useConfiguration from "../../../hooks/useConfiguration";
import { LogoutPage } from "./Logout";

jest.mock("@react-keycloak/web");
jest.mock("../../../hooks/useConfiguration");

describe("logout", () => {
  const history = createMemoryHistory();
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { replace: jest.fn() };
  });

  // eslint-disable-next-line
  afterAll(() => (window.location = location));

  afterEach(() => {
    cleanup();
  });

  it("should redirect to login page", () => {
    useKeycloak.mockReturnValue({ keycloak: { authenticated: false } });
    useConfiguration.mockReturnValue({ siteMinderLogoutUrl: undefined });

    render(
      <Router history={history}>
        <LogoutPage />
      </Router>
    );

    expect(history.location.pathname).toBe("/");
  });
});
