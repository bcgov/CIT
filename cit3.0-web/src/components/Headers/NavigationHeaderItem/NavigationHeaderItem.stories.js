import React from "react";
import NavigationHeaderItem from "./NavigationHeaderItem";

export default {
  title: "Navigation Header Item",
  component: NavigationHeaderItem,
};

export const NavigationHeaderItemDisplay = () => (
  <div className="py-4" style={{ backgroundColor: "#E0E0E0" }}>
    <NavigationHeaderItem label="Location" step={1} currentStep={1} />
  </div>
);
