import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import OpportunityApprovePage from "./OpportunityApprovePage";
import { store } from "../../../store";

const history = createMemoryHistory();

describe("<OpportunityApprovePage />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityApprovePage />
        </Router>
      </Provider>
    );

    const opportunityApprovePage = screen.getByTestId("OpportunityApprovePage");

    expect(opportunityApprovePage).toBeInTheDocument();
  });
});
