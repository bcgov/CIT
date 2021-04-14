import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import axios from "axios";
import SearchFlyoutContent from "./SearchFlyoutContent";
import { store } from "../../store";

const setQuery = jest.fn();

const communities = {
  communities: [
    {
      id: 1166,
      place_name: "Alexis Creek Nation",
    },
    {
      id: 443,
      place_name: "Aleza Lake",
    },
    {
      id: 837,
      place_name: "Alice Arm",
    },
    {
      id: 1167,
      place_name: "Alkali Lake (Esk'etemc)",
    },
    {
      id: 310,
      place_name: "Allison Lake",
    },
    {
      id: 220,
      place_name: "Alpine Meadows",
    },
  ],
};

describe("<SearchFlyoutContent />", () => {
  test("it should mount", () => {
    axios.get.mockResolvedValueOnce({
      data: communities,
    });
    render(
      <Provider store={store}>
        <SearchFlyoutContent setQuery={setQuery} />
      </Provider>
    );

    const searchFlyoutContent = screen.getByText("General site details");

    expect(searchFlyoutContent).toBeInTheDocument();
  });

  test("it should validate the input in one of the number range filters", () => {
    const label = "Parcel Size";
    const inputRange = {
      max: 2000,
      min: 0,
    };

    render(
      <Provider store={store}>
        <SearchFlyoutContent setQuery={setQuery} />
      </Provider>
    );

    const numberRangeFilterButton = screen.getByText(label);
    expect(numberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(numberRangeFilterButton);

    const maxInputBox = screen.getByText(String(inputRange.max));
    const minInputBox = screen.getByText(String(inputRange.min));
    const clearButton = screen.getByText("Remove filter");

    // Min > Max validation
    fireEvent.change(maxInputBox, { target: { value: 1000 } });
    fireEvent.change(minInputBox, { target: { value: 2000 } });
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

  test("it should display selected values correctly", () => {
    const label = "Parcel Size";
    const inputRange = {
      max: 2000,
      min: 0,
    };
    const units = "acres";

    render(
      <Provider store={store}>
        <SearchFlyoutContent setQuery={setQuery} />
      </Provider>
    );

    const numberRangeFilterButton = screen.getByText(label);
    expect(numberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(numberRangeFilterButton);

    const maxInputBox = screen.getByText(String(inputRange.max));
    fireEvent.change(maxInputBox, { target: { value: 1000 } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(
      screen.getByText(`${label}: ${inputRange.min}-${"1000"} ${units}`)
    ).toBeInTheDocument();
  });

  test("it should display a slightly different label for distance number range filters", () => {
    const label = "Air Service";
    const inputRange = {
      max: 500,
      min: 0,
    };
    const units = "km";

    render(
      <Provider store={store}>
        <SearchFlyoutContent setQuery={setQuery} />
      </Provider>
    );

    const numberRangeFilterButton = screen.getByText(label);
    expect(numberRangeFilterButton).toBeInTheDocument();

    fireEvent.click(numberRangeFilterButton);

    const maxInputBox = screen.getByText(String(inputRange.max));
    fireEvent.change(maxInputBox, { target: { value: 300 } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(
      screen.getByText(`${label}: within ${inputRange.min}-${"300"} ${units}`)
    ).toBeInTheDocument();
  });
});
