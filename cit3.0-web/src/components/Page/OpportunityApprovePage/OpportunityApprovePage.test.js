import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import OpportunityApprovePage from "./OpportunityApprovePage";
import { store } from "../../../store";

const location = {
  state: {},
};
describe("<OpportunityApprovePage />", () => {
  test("it should mount", () => {
    const history = createMemoryHistory();
    const route = "/place-name-1";
    history.push(route);

    axios.get.mockResolvedValue({
      id: 1,
      opportunity_address: "1234 Test Pl.",
      point: "SRID=3005;POINT (-123.8687427 48.4774108)",
      approval_status: "PEND",
      date_created: "2021-02-16T17:34:38.184663Z",
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityApprovePage location={location} id={1} />
        </Router>
      </Provider>
    );

    const opportunityApprovePage = screen.getByTestId("OpportunityApprovePage");

    expect(opportunityApprovePage).toBeInTheDocument();
  });
});
