import React from "react";
import { describe, test, expect } from "vitest"; // Import from Vitest
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import matchers if not using `globals: true`
import PowerBiReport from "./PowerBiReport";

describe("<PowerBiReport />", () => {
  test("it should mount", () => {
    render(<PowerBiReport />);

    const powerBiReport = screen.getByTestId("PowerBiReport");

    expect(powerBiReport).toBeInTheDocument();
  });
});
