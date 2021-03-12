import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CommunityOrPopulationProximityFilter from "./CommunityOrPopulationProximityFilter";

describe("<CommunityOrPopulationProximityFilter />", () => {
  test("it should mount", () => {
    render(<CommunityOrPopulationProximityFilter />);

    const communityOrPopulationProximityFilter = screen.getByText(
      "Hello filter"
    );

    expect(communityOrPopulationProximityFilter).toBeInTheDocument();
  });
});
