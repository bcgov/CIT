import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InputRangeWithTextboxes from "./InputRangeWithTextboxes";

const inputRange = { min: 0, max: 50000 };
const units = "km";
let minInput = inputRange.min;
const setMinInput = (value) => {
  minInput = value;
};
let maxInput;
const setMaxInput = (value) => {
  maxInput = value;
};
const inputRangeValue = { min: 0, max: 50000 };
const setInputRangeValue = (value) => {
  inputRangeValue.min = value.min;
  inputRangeValue.max = value.max;
};

describe("<InputRangeWithTextboxes />", () => {
  test("it should mount", () => {
    render(
      <InputRangeWithTextboxes
        inputRange={inputRange}
        units={units}
        minInput={minInput}
        setMinInput={setMinInput}
        maxInput={maxInput}
        setMaxInput={setMaxInput}
        inputRangeValue={inputRangeValue}
        setInputRangeValue={setInputRangeValue}
      />
    );

    const inputRangeWithTextboxes = screen.getByText(minInput);

    expect(inputRangeWithTextboxes).toBeInTheDocument();
  });
});
