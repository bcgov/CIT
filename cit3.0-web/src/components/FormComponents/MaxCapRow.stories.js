import React from "react";
import { action } from "@storybook/addon-actions";
import MaxCapRow from "./MaxCapRow";

export default {
  title: "MaximumCapacityRow",
  component: MaxCapRow,
};

export const MaximumCapacityRowWithDefaultUnits = () => (
  <MaxCapRow handleChange={action("change handled")} name="maxCap" />
);

export const MaximumCapacityRowWithUnits = () => (
  <MaxCapRow
    units="MMBTU/hour"
    handleChange={action("change handled")}
    name="maxCap"
  />
);
