import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useKeycloak } from "@react-keycloak/web";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";

jest.mock("@react-keycloak/web");
afterEach(() => {
  cleanup();
});

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({});

test("header renders correctly", () => {
  useKeycloak.mockReturnValue({ keycloak: { authenticated: false } });
  render(
    <Provider store={store}>
      <Router history={history}>
        <Header />
      </Router>
    </Provider>
  );
  const headerEl = screen.getByTestId("Header");
  expect(headerEl).toBeInTheDocument();
});

xit("User displays default if no user name information found", () => {
  useKeycloak.mockReturnValue({
    keycloak: {
      subject: "test",
      authenticated: true,
      userInfo: {
        roles: [],
      },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Header />
      </Router>
    </Provider>
  );
  const name = getByText("default");
  expect(name).toBeVisible();
});

describe("UserProfile user name display", () => {
  xit("Displays keycloak display name if available", () => {
    useKeycloak.mockReturnValue({
      keycloak: {
        subject: "test",
        authenticated: true,
        userInfo: {
          name: "display name",
          firstName: "name",
          roles: [],
        },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    );
    const name = getByText("display name");
    expect(name).toBeVisible();
  });

  xit("Displays first last name if no display name", () => {
    useKeycloak.mockReturnValue({
      keycloak: {
        subject: "test",
        authenticated: true,
        userInfo: {
          roles: [],
          firstName: "firstName",
          lastName: "lastName",
        },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    );
    const name = getByText("firstName lastName");
    expect(name).toBeVisible();
  });

  xit("displays appropriate agency", () => {
    useKeycloak.mockReturnValue({
      keycloak: {
        subject: "test",
        authenticated: true,
        userInfo: {
          agencies: ["1"],
          firstName: "test",
          lastName: "user",
        },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    );
    fireEvent.click(getByText(/test user/i));
    expect(getByText(/agencyVal/i)).toBeInTheDocument();
  });
});
