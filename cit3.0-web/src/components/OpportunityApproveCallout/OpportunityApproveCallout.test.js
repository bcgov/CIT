import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { store } from "../../store";
import OpportunityApproveCallout from "./OpportunityApproveCallout";

const history = createMemoryHistory();

describe("<OpportunityApproveCallout />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OpportunityApproveCallout
            privateNote=""
            publicNote=""
            currentStatus="PEND"
            approvalStatuses={[
              { status_name: "Published", status_code: "PUBL" },
            ]}
            onStatusChange={() => {}}
          />
        </Router>
      </Provider>
    );

    const opportunityApproveCallout = screen.getByTestId(
      "OpportunityApproveCallout"
    );

    expect(opportunityApproveCallout).toBeInTheDocument();
  });
});
