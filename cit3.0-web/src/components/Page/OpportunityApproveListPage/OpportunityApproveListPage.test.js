import React from "react";
import axios from "axios";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import OpportunityApproveListPage from "./OpportunityApproveListPage";
import { store } from "../../../store";

const history = createMemoryHistory();

afterEach(cleanup);
describe("<OpportunityApproveListPage />", () => {
  test("it should mount", () => {
    axios.get.mockResolvedValueOnce({
      statues: [],
      regional_districts: [],
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityApproveListPage />
        </Router>
      </Provider>
    );

    const opportunityApproveListPage = screen.getByTestId(
      "OpportunityApproveListPage"
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(opportunityApproveListPage).toBeInTheDocument();
  });
});
