import React from "react";
import { action } from "@storybook/addon-actions";
import AddressSearchBar from "./AddressSearchBar";

export default {
  title: "Address Search Bar",
  component: AddressSearchBar,
};

export const SearchBar = () => (
  <AddressSearchBar
    setAddress={() => action("setAddress")}
    getCoords={() => action("coordsReceived")}
  />
);
