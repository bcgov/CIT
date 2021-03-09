import React from "react";
import { render, screen } from "@testing-library/react";
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
});
