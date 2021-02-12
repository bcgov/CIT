import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReviewAndSubmitCallout from "./ReviewAndSubmitCallout";

describe("<ReviewAndSubmitCallout />", () => {
  test("it should mount", () => {
    render(<ReviewAndSubmitCallout />);

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout).toBeInTheDocument();
  });

  test("it should have a submit button", () => {
    render(<ReviewAndSubmitCallout />);

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout.querySelector("#cancel")).toBeDefined();
  });

  test("it should have a cancel button", () => {
    render(<ReviewAndSubmitCallout />);

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout.querySelector("#submit")).toBeDefined();
  });

  test("it should have a back button", () => {
    render(<ReviewAndSubmitCallout />);

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout.querySelector("#back")).toBeDefined();
  });
});
