import React from "react";
import Map from "./Map";

export default {
  title: "Map",
  component: Map,
};

const coords = [48.452708, -123.369984];

export const OpportunitiesMap = () => (
  <div style={{ height: "800px" }}>
    <Map coords={coords} scrollWheelZoom isInteractive />
  </div>
);

export const NoninteractiveOpportunitiesMap = () => (
  <div style={{ height: "800px" }}>
    <Map coords={coords} scrollWheelZoom isInteractive={false} />
  </div>
);
