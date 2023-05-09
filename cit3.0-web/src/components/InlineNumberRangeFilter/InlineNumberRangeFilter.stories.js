import React, { useState } from "react";
import InlineNumberRangeFilter from "./InlineNumberRangeFilter";

export default {
  title: "Number Range Filter",
  component: InlineNumberRangeFilter,
};

export const ParcelMapFilter = () => {
  const parcelSizeInitial = {
    max: 2000,
    min: 0,
  };
  const [parcelSizeIsSelected, setParcelSizeIsSelected] = useState(false);
  const [parcelSizeInputRange, setParcelSizeInputRange] = useState(
    parcelSizeInitial
  );
  const [parcelSizeDisplayRange, setParcelSizeDisplayRange] = useState(
    parcelSizeInitial
  );
  const [resetRangeInput, setResetRangeInput] = useState(false);

  return (
    <InlineNumberRangeFilter
      inputRange={{ min: 0, max: 2000 }}
      units="acres"
      description="Size of Property (in acres)"
      label="Parcel Size"
      isSelected={parcelSizeIsSelected}
      setIsSelected={setParcelSizeIsSelected}
      inputRangeValue={parcelSizeInputRange}
      setInputRangeValue={setParcelSizeInputRange}
      initialInputRangeValues={parcelSizeInitial}
      resetRangeInput={resetRangeInput}
      displayRange={parcelSizeDisplayRange}
      setDisplayRange={setParcelSizeDisplayRange}
    />
  );
};
