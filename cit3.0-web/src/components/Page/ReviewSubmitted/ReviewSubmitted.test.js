import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import ReviewSubmitted from "./ReviewSubmitted";
import { store } from "../../../store";

describe("<ReviewSubmitted />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        <ReviewSubmitted />
      </Provider>
    );

    const reviewSubmitted = screen.getByTestId("ReviewSubmitted");

    expect(reviewSubmitted).toBeInTheDocument();
  });
});
