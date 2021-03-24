import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import OpportunityApprovalItem from "./OpportunityApprovalItem";
import { store } from "../../store";

const opportunity = {
  id: 4,
  address: "5555 Test St.",
  coords: [48.4527115, -123.3721727],
  approvalStatus: "NCOM",
  dateCreated: "2021-02-16T17:34:38.184663Z",
};

describe("<OpportunityApprovalItem />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        <OpportunityApprovalItem opportunity={opportunity} />
      </Provider>
    );

    const opportunityApprovalItem = screen.getByTestId(
      "OpportunityApprovalItem"
    );

    expect(opportunityApprovalItem).toBeInTheDocument();
  });
});
