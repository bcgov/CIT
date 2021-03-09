import { useState } from "react";
import SelectFilter from "./SelectFilter";

export default {
  title: "Select Filter",
  component: SelectFilter,
};

export const ZoningFilter = () => {
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

  return (
    <SelectFilter
      label="Zoning"
      filters={zoningFilters}
      setFilters={setZoningFilters}
    />
  );
};

export const ConnectivityFilter = () => {
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
    <SelectFilter
      label="Connectivity"
      filters={connectivityFilters}
      setFilters={setConnectivityFilters}
    />
  );
};
