import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import AccessDenied from "./AccessDenied";

const history = createMemoryHistory();

describe("AccessDenied", () => {
  it("renders correctly", () => {
    render(
      <Router history={history}>
        <AccessDenied />
      </Router>
    );
    const AccessDeniedPage = screen.getByTestId("AccessDeniedPage");
    expect(AccessDeniedPage).toBeInTheDocument();
  });
});
