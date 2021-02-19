import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReviewSubmitted from "./ReviewSubmitted";

describe("<ReviewSubmitted />", () => {
  test("it should mount", () => {
    render(<ReviewSubmitted />);

    const reviewSubmitted = screen.getByTestId("ReviewSubmitted");

    expect(reviewSubmitted).toBeInTheDocument();
  });
});
