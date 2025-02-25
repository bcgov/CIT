import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // Import from vitest
import CompareReport from "./CompareReport";

describe("<CompareReport />", () => {
  it("should mount", () => {
    render(<CompareReport />);

    const compareReport = screen.getByTestId("CompareReport");

    expect(compareReport).toBeInTheDocument();
  });
});
