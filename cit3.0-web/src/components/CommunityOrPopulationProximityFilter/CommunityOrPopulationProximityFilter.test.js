import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "../../store";
import CommunityOrPopulationProximityFilter from "./CommunityOrPopulationProximityFilter";

const label = "Proximity to community/population";

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

describe("<CommunityOrPopulationProximityFilter />", () => {
  test("it should mount", () => {
    axios.get.mockResolvedValueOnce({
      data: communities,
    });
    render(
      <Provider store={store}>
        <CommunityOrPopulationProximityFilter
          inputRange={{ min: 0, max: 500 }}
          units="km"
          label={label}
        />
      </Provider>
    );

    const communityOrPopulationProximityFilter = screen.getByText(label);

    expect(communityOrPopulationProximityFilter).toBeInTheDocument();
  });
});
