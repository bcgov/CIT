import React from "react";
import { createMemoryHistory } from "history";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { ADD_ACTIVATE_USER } from "../../../constants/actionTypes";
import Login from "./Login";

jest.mock("axios");
jest.mock("@react-keycloak/web");
const mockStore = configureMockStore([thunk]);

const store = mockStore({
  network: {
    [ADD_ACTIVATE_USER]: {},
  },
});

// boilerplate function used by most tests to wrap the Login component with a router.
const renderLogin = () => {
  const history = createMemoryHistory();
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Login />
      </Router>
    </Provider>
  );
};

describe("login", () => {
  afterEach(() => {
    cleanup();
  });
  // TODO: Implement snapshot comparisons
  // it("login renders correctly", () => {
  //   useKeycloak.mockReturnValue({ keycloak: { authenticated: false } });
  //   const history = createMemoryHistory();
  //   const tree = renderer
  //     .create(
  //       <Provider store={store}>
  //         <Router history={history}>
  //           <Login />
  //         </Router>
  //       </Provider>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it("authenticated users are redirected to the search", () => {
    useKeycloak.mockReturnValue({
      keycloak: {
        authenticated: true,
        userInfo: { groups: [] },
      },
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    expect(history.location.pathname).toBe("/search");
  });

  it("new users are sent to the guest page", () => {
    useKeycloak.mockReturnValue({
      keycloak: { authenticated: true, realmAccess: { roles: [{}] } },
    });
    const history = createMemoryHistory();
    const activatedAction = {
      isFetching: false,
      name: "test",
      type: "POST",
      status: 201,
    };
    // eslint-disable-next-line
    const store = mockStore({
      network: {
        activateUser: activatedAction,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    expect(history.location.pathname).toBe("/search");
  });

  it("a spinner is displayed if keycloak has not yet been initialized", () => {
    useKeycloak.mockReturnValue({ keycloak: undefined });
    const { container } = renderLogin();
    expect(container.firstChild).toHaveClass("spinner-border");
  });

  it("the login button calls keycloaks login() method", () => {
    const login = jest.fn();
    useKeycloak.mockReturnValue({
      keycloak: { login, authenticated: false },
    });

    const { getByText } = renderLogin();
    fireEvent.click(getByText(/Sign In/));

    expect(login.mock.calls.length).toBe(1);
  });
});
