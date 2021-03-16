import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchFlyoutContent from "./SearchFlyoutContent";

describe("<SearchFlyoutContent />", () => {
  test("it should mount", () => {
    render(<SearchFlyoutContent />);

    const searchFlyoutContent = screen.getByText("General site details");

    expect(searchFlyoutContent).toBeInTheDocument();
  });
});
