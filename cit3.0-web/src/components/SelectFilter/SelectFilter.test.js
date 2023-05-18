import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SelectFilter from "./SelectFilter";

const zoningFilters = [
  {
    label: "Commercial",
    isSelected: false,
  },
  // {
  //   label: "Residential",
  //   isSelected: false,
  // },
  {
    label: "Agriculture",
    isSelected: false,
  },
  {
    label: "Industrial-light",
    isSelected: false,
  },
  {
    label: "Industrial-heavy",
    isSelected: false,
  },
];

const setZoningFilters = jest.fn();

describe("<SelectFilter />", () => {
  test("it should mount", () => {
    render(
      <SelectFilter
        label="Zoning"
        filters={zoningFilters}
        setFilters={setZoningFilters}
      />
    );

    const selectFilter = screen.getByText("Zoning");

    expect(selectFilter).toBeInTheDocument();
  });

  test("it should show a modal when clicked", () => {
    render(
      <SelectFilter
        label="Zoning"
        filters={zoningFilters}
        setFilters={setZoningFilters}
      />
    );

    const selectFilterButton = screen.getByText("Zoning");

    expect(selectFilterButton).toBeInTheDocument();

    fireEvent.click(selectFilterButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
