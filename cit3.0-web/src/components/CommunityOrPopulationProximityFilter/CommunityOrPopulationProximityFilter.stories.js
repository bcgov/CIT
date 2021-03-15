import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CommunityOrPopulationProximityFilter from "./CommunityOrPopulationProximityFilter";

export default {
  title: "Community Or Population Proximity Filter",
  component: CommunityOrPopulationProximityFilter,
};

const mock = new MockAdapter(axios);

mock.onGet("/api/opportunity/options/").reply(200, {
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
});

export const CommunityOrPopulationFilter = () => (
  <CommunityOrPopulationProximityFilter
    inputRange={{ min: 0, max: 500 }}
    units="km"
    label="Proximity to community/population"
  />
);
