import { useState } from "react";
import InlineSelectFilter from "./InlineSelectFilter";

export default {
  title: "Select Filter",
  component: InlineSelectFilter,
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
    <InlineSelectFilter
      label="Zoning"
      filters={zoningFilters}
      setFilters={setZoningFilters}
      isSelected={zoningIsSelected}
      setIsSelected={setZoningIsSelected}
      setQueryFilters={setZoningQueryFilters}
    />
  );
};
