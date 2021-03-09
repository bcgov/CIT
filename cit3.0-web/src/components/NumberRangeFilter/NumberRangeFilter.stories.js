import React from "react";
import NumberRangeFilter from "./NumberRangeFilter";

export default {
  title: "Number Range Filter",
  component: NumberRangeFilter,
};

export const ParcelMapFilter = () => (
  <NumberRangeFilter
    inputRange={{ min: 0, max: 250000 }}
    units="acres"
    description="Size of Property (in acres)"
    label="Parcel Size"
  />
);

export const GrossFloorArea = () => (
  <NumberRangeFilter
    inputRange={{ min: 0, max: 50000 }}
    units="square feet"
    description="Size of Property (in square feet)"
    label="Gross Floor Area"
  />
);
