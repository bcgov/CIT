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
    point: "SRID=4326;POINT (48.4774108 -123.8687427)",
  },
  {
    id: 2,
    address: "5678 Test Ave.",
    point: "SRID=4326;POINT (48.452708 -123.369984)",
  },
  {
    id: 3,
    address: "9999 Test Rd.",
    point: "SRID=4326;POINT (48.4527115 -123.3721727)",
  },
];

export const TableWithData = () => <OpportunityTable tableData={tableData} />;
