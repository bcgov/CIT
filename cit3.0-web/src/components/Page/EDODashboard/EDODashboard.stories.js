import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import EDODashboard from "./EDODashboard";

export default {
  title: "EDODashboard",
  component: EDODashboard,
};

export const DashboardWithOpportunities = () => {
  const mock = new MockAdapter(axios);

  mock.onGet("/api/pipeline/opportunities").reply(200, {
    results: [
      {
        id: 1,
        address: "1234 Test Pl.",
        point: "SRID=4326;POINT (-123.8687427 48.4774108)",
        approval_status: "Pending Review",
      },
      {
        id: 2,
        address: "5678 Test Ave.",
        point: "SRID=4326;POINT (-123.369984 48.452708)",
        approval_status: "Published",
      },
      {
        id: 3,
        address: "9999 Test Rd.",
        point: "SRID=4326;POINT (-123.3721727 48.4527115)",
        approval_status: "Needs to be edited",
      },
    ],
  });
  return <EDODashboard />;
};

export const DashboardWithoutOpportunities = () => {
  const mock = new MockAdapter(axios);

  mock.onGet("/api/pipeline/opportunities").reply(400);
  return <EDODashboard />;
};
