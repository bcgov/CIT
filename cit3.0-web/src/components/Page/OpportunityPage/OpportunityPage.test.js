import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import OpportunityPage from "./OpportunityPage";

describe("<OpportunityPage />", () => {
  test("it should mount", () => {
    render(<OpportunityPage />);

    const opportunityPage = screen.getByTestId("OpportunityPage");

    expect(opportunityPage).toBeInTheDocument();
  });
});
