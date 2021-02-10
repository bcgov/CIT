import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import EDODashboard from "./EDODashboard";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

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
    ],
  });
  return <EDODashboard />;
};

export const DashboardWithoutOpportunities = () => {
  const mock = new MockAdapter(axios);

  mock.onGet("/api/pipeline/opportunities").reply(400);
  return <EDODashboard />;
};
