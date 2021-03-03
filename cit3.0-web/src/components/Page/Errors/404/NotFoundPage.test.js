import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NotFoundPage from "./NotFoundPage";

const history = createMemoryHistory();

describe("NotFoundPage", () => {
  it("renders correctly", () => {
    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
    );
    const notFoundPage = screen.getByTestId("NotFoundPage");
    expect(notFoundPage).toBeInTheDocument();
  });
});
