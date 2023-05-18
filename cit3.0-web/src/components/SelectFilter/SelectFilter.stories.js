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
    // {
    //   label: "Residential",
    //   isSelected: false,
    // },
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

  const [zoningIsSelected, setZoningIsSelected] = useState(false);
  const [zoningQueryFilters, setZoningQueryFilters] = useState({});

  return (
    <SelectFilter
      label="Zoning"
      filters={zoningFilters}
      setFilters={setZoningFilters}
      isSelected={zoningIsSelected}
      setIsSelected={setZoningIsSelected}
      setQueryFilters={setZoningQueryFilters}
    />
  );
};
