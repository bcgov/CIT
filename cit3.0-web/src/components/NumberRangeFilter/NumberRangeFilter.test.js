import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NumberRangeFilter from "./NumberRangeFilter";

const inputRange = { min: 0, max: 500000 };
const units = "ft²";
const description = "Size of Property (in acres)";
const label = "Parcel Size";

describe("<NumberRangeFilter />", () => {
  test("it should mount", () => {
    render(
      <NumberRangeFilter
        inputRange={inputRange}
        units={units}
        description={description}
        label={label}
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
      />
    );

    const numberRangeFilterButton = screen.getByText(label);

    expect(numberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(numberRangeFilterButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("it should display selected values correctly", () => {
    render(
      <NumberRangeFilter
        inputRange={inputRange}
        units={units}
        description={description}
        label={label}
      />
    );

    const numberRangeFilterButton = screen.getByText(label);
    expect(numberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(numberRangeFilterButton);

    const maxInputBox = screen.getByText(String(inputRange.max));
    fireEvent.change(maxInputBox, { target: { value: 5000 } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(
      screen.getByText(`${label}: ${inputRange.min}-${"5000"} ${units}`)
    ).toBeInTheDocument();
  });

  test("it should validate the input", () => {
    render(
      <NumberRangeFilter
        inputRange={inputRange}
        units={units}
        description={description}
        label={label}
      />
    );

    const numberRangeFilterButton = screen.getByText(label);
    expect(numberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(numberRangeFilterButton);

    const maxInputBox = screen.getByText(String(inputRange.max));
    const minInputBox = screen.getByText(String(inputRange.min));
    const clearButton = screen.getByText("Clear");

    // Non-number validation
    fireEvent.change(maxInputBox, { target: { value: "badvalue" } });
    expect(screen.getByText("Invalid max number")).toBeInTheDocument();
    fireEvent.change(minInputBox, { target: { value: "badvalue" } });
    expect(screen.getByText("Invalid min number")).toBeInTheDocument();
    fireEvent.click(clearButton);

    // Min > Max validation
    fireEvent.change(maxInputBox, { target: { value: 3000 } });
    fireEvent.change(minInputBox, { target: { value: 4000 } });
    expect(screen.getByText("Invalid min number")).toBeInTheDocument();
    fireEvent.click(clearButton);

    // Max < Min validation
    fireEvent.change(minInputBox, { target: { value: 2000 } });
    fireEvent.change(maxInputBox, { target: { value: 1000 } });
    expect(screen.getByText("Invalid max number")).toBeInTheDocument();
    fireEvent.click(clearButton);

    // input Max > Max value of input range
    fireEvent.change(minInputBox, { target: { value: -5 } });
    expect(screen.getByText("Invalid min number")).toBeInTheDocument();
    fireEvent.click(clearButton);

    // input Min < Min value of input range
    fireEvent.change(maxInputBox, { target: { value: 5000000 } });
    expect(screen.getByText("Invalid max number")).toBeInTheDocument();
    fireEvent.click(clearButton);
  });
});
