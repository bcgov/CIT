import React, { useState } from "react";
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

export const CommunityOrPopulationFilter = () => {
  const proximityToCommunityOrPopulationInitial = {
    max: 500,
    min: 0,
  };
  const proximityCurrentCommunityInitial = null;
  const proximityCurrentPopulationInitial = null;
  const [
    proximityToCommunityOrPopulationIsSelected,
    setProximityToCommunityOrPopulationIsSelected,
  ] = useState(false);
  const [
    proximityToCommunityOrPopulationInputRange,
    setProximityToCommunityOrPopulationInputRange,
  ] = useState(proximityToCommunityOrPopulationInitial);
  const [
    proximityToCommunityOrPopulationDisplayRange,
    setproximityToCommunityOrPopulationDisplayRange,
  ] = useState(proximityToCommunityOrPopulationInitial);
  const [proximityCurrentCommunity, setProximityCurrentCommunity] = useState(
    proximityCurrentCommunityInitial
  );
  const [proximityCurrentPopulation, setProximityCurrentPopulation] = useState(
    proximityCurrentPopulationInitial
  );

  const [resetRangeInput, setResetRangeInput] = useState(false);
  return (
    <CommunityOrPopulationProximityFilter
      inputRange={proximityToCommunityOrPopulationInitial}
      units="km"
      label="Proximity to community/population"
      isSelected={proximityToCommunityOrPopulationIsSelected}
      setIsSelected={setProximityToCommunityOrPopulationIsSelected}
      inputRangeValue={proximityToCommunityOrPopulationInputRange}
      setInputRangeValue={setProximityToCommunityOrPopulationInputRange}
      initialInputRangeValues={proximityToCommunityOrPopulationInitial}
      resetRangeInput={resetRangeInput}
      displayRange={proximityToCommunityOrPopulationDisplayRange}
      setDisplayRange={setproximityToCommunityOrPopulationDisplayRange}
      currentCommunity={proximityCurrentCommunity}
      setCurrentCommunity={setProximityCurrentCommunity}
      currentPopulation={proximityCurrentPopulation}
      setCurrentPopulation={setProximityCurrentPopulation}
    />
  );
};
