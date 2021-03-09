import { useState } from "react";
import NumberRangeFilter from "../NumberRangeFilter/NumberRangeFilter";
import SelectFilter from "../SelectFilter/SelectFilter";
import "./SearchFlyoutContent.scss";

export default function SearchFlyoutContent() {
  const [zoningFilters, setZoningFilters] = useState([
    {
      label: "Commercial",
      isSelected: false,
    },
    {
      label: "Residential",
      isSelected: false,
    },
    {
      label: "Agriculture",
      isSelected: false,
    },
    {
      label: "Industrial-light",
      isSelected: false,
    },
    {
      label: "Industrial-heavy",
      isSelected: false,
    },
  ]);

  const [connectivityFilters, setConnectivityFilters] = useState([
    {
      label: "50/10 mbps",
      isSelected: false,
    },
    {
      label: "25/5 mbps",
      isSelected: false,
    },
    {
      label: "10/2 mbps",
      isSelected: false,
    },
    {
      label: "5/1 mbps",
      isSelected: false,
    },
  ]);

  return (
    <div className="search-flyout-content">
      <h2>Filter your search</h2>
      <h3>General site details</h3>
      <NumberRangeFilter
        inputRange={{ min: 0, max: 250000 }}
        units="acres"
        description="Size of Property (in acres)"
        label="Parcel Size"
      />
      <NumberRangeFilter
        inputRange={{ min: 0, max: 50000 }}
        units="ft²"
        description="Size of Property (in ft²)"
        label="Gross Floor Area"
      />
      <SelectFilter
        label="Zoning"
        filters={zoningFilters}
        setFilters={setZoningFilters}
      />
      <SelectFilter
        label="Connectivity"
        filters={connectivityFilters}
        setFilters={setConnectivityFilters}
      />
      <h3>Site Servicing</h3>
      {/* <Switch
      checked={waterSwitchValue}
      onChange={updateWaterSwitchValue(waterSwitchValue)}
      /> */}
      <h3>Transportation</h3>
      <h3>Demographics</h3>
      <h3>Advanced Education &amp; Research</h3>
    </div>
  );
}
