import React, { useState } from "react";
import Radios from "./Radios";

export default {
  title: "Radios",
  component: Radios,
};

export const Radio = () => {
  const [value, setValue] = useState("Yes");
  const handleRadioChange = (name, label, v) => {
    setValue(label);
  };
  return (
    <Radios
      labels={["Yes", "No", "Unknown"]}
      handleRadioChange={handleRadioChange}
      name="Radios"
      value={value}
    />
  );
};
