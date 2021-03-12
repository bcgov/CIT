import React from "react";
import InputRangeWithTextboxes from "./InputRangeWithTextboxes";

export default {
  title: "Input Range With Textboxes",
  component: InputRangeWithTextboxes,
};

export const InputRangePlusTextboxes = () => {
  const inputRange = { max: 5000, min: 1000 };
  const units = "km";

  return (
    <div style={{ width: "40%" }}>
      <InputRangeWithTextboxes inputRange={inputRange} units={units} />
    </div>
  );
};
