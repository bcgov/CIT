import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Resource from "./Resource";

export default {
  title: "Resource",
  component: Resource,
};

const resource = "Post Secondary Schools";

const resourceData = [
  {
    Address: "4461 Interurban Rd",
    City: "Victoria",
    "Economic Development Region": "Vancouver Island/Coast",
    Institution: "Camosun College",
    "Institution Type": "Public Post-Secondary",
    Latitude: 48.490802,
    Location: "Interurban Campus",
    "Location Description": "Campus",
    Longitude: -123.416497,
    _id: 7,
    distance: 2,
  },
];

export const nearbyResource = () => (
  <Resource resource={resource} resourceData={resourceData} />
);
