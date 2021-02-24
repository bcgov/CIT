import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import ReviewAndSubmitCallout from "./ReviewAndSubmitCallout";
import { store } from "../../store";

describe("<ReviewAndSubmitCallout />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        <ReviewAndSubmitCallout />
      </Provider>
    );

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout).toBeInTheDocument();
  });

  test("it should have a submit button", () => {
    render(
      <Provider store={store}>
        <ReviewAndSubmitCallout />
      </Provider>
    );

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout.querySelector("#cancel")).toBeDefined();
  });

  test("it should have a cancel button", () => {
    render(
      <Provider store={store}>
        <ReviewAndSubmitCallout />
      </Provider>
    );

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout.querySelector("#submit")).toBeDefined();
  });

  test("it should have a back button", () => {
    render(
      <Provider store={store}>
        <ReviewAndSubmitCallout />
      </Provider>
    );

    const reviewAndSubmitCallout = screen.getByTestId("ReviewAndSubmitCallout");

    expect(reviewAndSubmitCallout.querySelector("#back")).toBeDefined();
  });
});
