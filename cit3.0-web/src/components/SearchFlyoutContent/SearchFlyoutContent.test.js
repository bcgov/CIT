import React from "react";
import { render, screen } from "@testing-library/react";
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
});
