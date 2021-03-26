import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NumberRangeFilter from "./NumberRangeFilter";

const inputRange = { min: 0, max: 500000 };
const units = "ft²";
const description = "Size of Property (in acres)";
const label = "Parcel Size";
let isSelected = false;
const setIsSelected = (value) => {
  isSelected = value;
};

let inputRangeValue = { min: 0, max: 500000 };
const setInputRangeValue = (value) => {
  inputRangeValue = value;
};
const initialInputRangeValues = { min: 0, max: 500000 };
let displayRange = {};
const setDisplayRange = (value) => {
  displayRange = value;
};

afterEach(() => {
  isSelected = false;
  inputRangeValue = { min: 0, max: 500000 };
  displayRange = {};
});

describe("<NumberRangeFilter />", () => {
  test("it should mount", () => {
    render(
      <NumberRangeFilter
        inputRange={inputRange}
        units={units}
        description={description}
        label={label}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        inputRangeValue={inputRangeValue}
        setInputRangeValue={setInputRangeValue}
        initialInputRangeValues={initialInputRangeValues}
        displayRange={displayRange}
        setDisplayRange={setDisplayRange}
      />
    );

    const numberRangeFilter = screen.getByText(label);

    expect(numberRangeFilter).toBeInTheDocument();
  });

  test("it should show a modal when clicked", () => {
    render(
      <NumberRangeFilter
        inputRange={inputRange}
        units={units}
        description={description}
        label={label}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        inputRangeValue={inputRangeValue}
        setInputRangeValue={setInputRangeValue}
        initialInputRangeValues={initialInputRangeValues}
        displayRange={displayRange}
        setDisplayRange={setDisplayRange}
      />
    );

    const numberRangeFilterButton = screen.getByText(label);

    expect(numberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(numberRangeFilterButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
