import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LocationsPanel from "./LocationsPanel";

describe("<LocationsPanel />", () => {
  test("it should mount", () => {
    render(<LocationsPanel />);

    const locationsPanel = screen.getByTestId("LocationsPanel");

    expect(locationsPanel).toBeInTheDocument();
  });
});
