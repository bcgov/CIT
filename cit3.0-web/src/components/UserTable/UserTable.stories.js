import React from "react";
import UserTable from "./UserTable";

export default {
  title: "UserTable",
  component: UserTable,
};

const tableData = [
  {
    municipalities: [],
    regional_districts: [
      {
        id: 12,
        name: "Squamish-Lillooet Regional District",
      },
    ],
    id: 2,
    name: "John Smith",
    email: "John.Smith@Test.ca",
    date_created: "2021-Mar-25",
  },
  {
    municipalities: [
      {
        id: 15,
        name: "Whistler",
      },
    ],
    regional_districts: [
      {
        id: 22,
        name: "Comox Valley Regional District",
      },
    ],
    id: 1,
    name: "Jane Doe",
    email: "Jane.Doe@test.com",
    date_created: "2021-Mar-25",
  },
];

export const TableWithData = () => <UserTable tableData={tableData} />;
