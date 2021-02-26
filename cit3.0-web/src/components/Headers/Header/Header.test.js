import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Header from "./Header";

jest.mock("@react-keycloak/web");
afterEach(() => {
  cleanup();
});

it("User displays default if no user name information found", () => {
  useKeycloak.mockReturnValue({
    keycloak: {
      subject: "test",
      authenticated: true,
      userInfo: {
        roles: [],
      },
    },
  });

  const { getByText } = render(<Header />);
  const name = getByText("default");
  expect(name).toBeVisible();
});

describe("UserProfile user name display", () => {
  it("Displays keycloak display name if available", () => {
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

    const { getByText } = render(<Header />);
    const name = getByText("display name");
    expect(name).toBeVisible();
  });

  it("Displays first last name if no display name", () => {
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

    const { getByText } = render(<Header />);
    const name = getByText("firstName lastName");
    expect(name).toBeVisible();
  });

  it("displays appropriate agency", () => {
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
    const { getByText } = render(<Header />);
    fireEvent.click(getByText(/test user/i));
    expect(getByText(/agencyVal/i)).toBeInTheDocument();
  });
});
