import React from "react";
import NavigationHeader from "./NavigationHeader";

export default {
  title: "Navigation Header",
  component: NavigationHeader,
};

const navItems = [
  "Location",
  "Property Details",
  "Additional Info",
  "Review & Submit",
];

export const NavigationHeaderDisplay = () => (
  <NavigationHeader navItems={navItems} />
);
