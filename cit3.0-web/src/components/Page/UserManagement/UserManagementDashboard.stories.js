import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UserManagementDashboard from "./UserManagementDashboard";

export default {
  title: "UserManagementDashboard",
  component: UserManagementDashboard,
};

export const DashboardWithOpportunities = () => {
  const mock = new MockAdapter(axios);

  mock.onGet("/api/pipeline/opportunities").reply(200, {
    results: [
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
        approval_status: "EDIT",
        date_created: "2021-02-16T17:34:38.184663Z",
      },
    ],
  });
  return <UserManagementDashboard />;
};

export const DashboardWithoutUsers = () => {
  const mock = new MockAdapter(axios);

  mock.onGet("/api/pipeline/opportunities").reply(400);
  return <UserManagementDashboard />;
};
