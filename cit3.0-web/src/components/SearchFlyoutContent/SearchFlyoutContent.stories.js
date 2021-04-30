import React, { useState } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SearchFlyoutContent from "./SearchFlyoutContent";

export default {
  title: "Search Flyout Content",
  component: SearchFlyoutContent,
};

export const SearchContent = () => {
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

  const [query, setQuery] = useState("");
  return <SearchFlyoutContent setQuery={setQuery} />;
};
