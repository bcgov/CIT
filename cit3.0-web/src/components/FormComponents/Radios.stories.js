import React from "react";
import { action } from "@storybook/addon-actions";
import Radios from "./Radios";

export default {
  title: "Radios",
  component: Radios,
};

export const Radio = () => (
  <Radios
    labels={["Yes", "No", "Unknown"]}
    handleRadioChange={action("change handled")}
    name="Radios"
  />
);
