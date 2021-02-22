import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import ReviewOpportunity from "./ReviewOpportunity";
import { store } from "../../../store";

const location = {
  state: {},
};

describe("<ReviewOpportunity />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        <ReviewOpportunity location={location} />
      </Provider>
    );

    const reviewOpportunity = screen.getByTestId("ReviewOpportunity");

    expect(reviewOpportunity).toBeInTheDocument();
  });
});
