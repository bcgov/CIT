import React from "react";
import OpportunityTable from "./OpportunityTable";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

export default {
  title: "OpportunityTable",
  component: OpportunityTable,
};

const tableData = [
  {
    id: 1,
    address: "1234 Test Pl.",
    point: "SRID=4326;POINT (90 -90)",
  },
  {
    id: 2,
    address: "5678 Test Ave.",
    point: "SRID=4326;POINT (20 -40)",
  },
  {
    id: 3,
    address: "9999 Test Rd.",
    point: "SRID=4326;POINT (20 -40)",
  },
];

export const TableWithData = () => <OpportunityTable tableData={tableData} />;
