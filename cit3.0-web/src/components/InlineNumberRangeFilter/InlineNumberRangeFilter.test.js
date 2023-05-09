import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InlineNumberRangeFilter from "./InlineNumberRangeFilter";

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

describe("<InlineNumberRangeFilter />", () => {
  test("it should mount", () => {
    render(
      <InlineNumberRangeFilter
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

    const InlineNumberRangeFilter = screen.getByText(label);

    expect(InlineNumberRangeFilter).toBeInTheDocument();
  });

  test("it should show a modal when clicked", () => {
    render(
      <InlineNumberRangeFilter
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

    const InlineNumberRangeFilterButton = screen.getByText(label);

    expect(InlineNumberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(InlineNumberRangeFilterButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
