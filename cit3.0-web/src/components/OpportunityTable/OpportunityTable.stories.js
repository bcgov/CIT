import React from "react";
import OpportunityTable from "./OpportunityTable";

export default {
  title: "OpportunityTable",
  component: OpportunityTable,
};

const tableData = [
  {
    id: 1,
    address: "1234 Test Pl.",
    point: "SRID=4326;POINT (-123.8687427 48.4774108)",
    approval_status: "PEND",
    date_created: "2021-02-16T17:34:38.184663Z",
  },
  {
    id: 2,
    address: "5678 Test Ave.",
    point: "SRID=4326;POINT (-123.369984 48.452708)",
    approval_status: "PUBL",
    date_created: "2021-02-16T17:34:38.184663Z",
  },
  {
    id: 3,
    address: "9999 Test Rd.",
    point: "SRID=4326;POINT (-123.3721727 48.4527115)",
    approval_status: "NCOM",
    date_created: "2021-02-16T17:34:38.184663Z",
  },
];

export const TableWithData = () => <OpportunityTable tableData={tableData} />;
