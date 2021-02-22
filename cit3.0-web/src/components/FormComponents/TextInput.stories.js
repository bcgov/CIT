import React from "react";
import { action } from "@storybook/addon-actions";
import TextInput from "./TextInput";

export default {
  title: "Text Input",
  component: TextInput,
};

const value = "";

export const TextInputAsTextArea = () => (
  <TextInput
    heading="Opportunity Description"
    notes="Please note the information here will appear publicly"
    placeholder="Please enter a description here"
    rows={3}
    handleChange={action("change handled")}
    name="OppDesc"
  />
);

export const TextInputAsInput = () => (
  <TextInput
    heading="Business Contact Name"
    rows={1}
    handleChange={action("handled")}
    name="busName"
    value={value}
  />
);
