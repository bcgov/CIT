import React, { useState } from "react";
import InputRangeWithTextboxes from "./InputRangeWithTextboxes";

export default {
  title: "Input Range With Textboxes",
  component: InputRangeWithTextboxes,
};

export const InputRangePlusTextboxes = () => {
  const inputRange = {
    max: 50000,
    min: 0,
  };
  const [inputRangeValue, setInputRangeValue] = useState({
    min: inputRange.min,
    max: inputRange.max,
  });
  const [minInput, setMinInput] = useState(inputRange.min);
  const [maxInput, setMaxInput] = useState(inputRange.max);
  const [validMax, setValidMax] = useState(true);
  const [validMin, setValidMin] = useState(true);
  const units = "km";

  return (
    <div style={{ width: "40%" }}>
      <InputRangeWithTextboxes
        inputRange={inputRange}
        units={units}
        minInput={minInput}
        setMinInput={setMinInput}
        maxInput={maxInput}
        setMaxInput={setMaxInput}
        inputRangeValue={inputRangeValue}
        setInputRangeValue={setInputRangeValue}
        validMax={validMax}
        validMin={validMin}
        setValidMax={setValidMax}
        setValidMin={setValidMin}
      />{" "}
    </div>
  );
};
