import React from "react";
import { storiesOf } from "@storybook/react";
import LocationsPanel from "./LocationsPanel";

const coords = [-123.723323, 48.785009];

const munis = [
  { name: "Duncan", link: "www.example.com", distance: 1.23, population: 101 },
  { name: "Duncan", link: "www.example.com", distance: 4.56, population: 1001 },
  {
    name: "Duncan",
    link: "www.example.com",
    distance: 7.89,
    population: 10001,
  },
];
const firstNationCommunities = [
  {
    name: "Lyackson First Nation",
    link: "http://lyackson.bc.ca/",
    distance: 20,
    population: 200,
  },
  {
    name: "Lyackson First Nation",
    link: "http://lyackson.bc.ca/",
    distance: 20,
    population: 200,
  },
];

storiesOf("LocationsPanel", module).add("default", () => (
  <LocationsPanel
    address="3045 Gibbins Road, Duncan, BC"
    coords={coords}
    municipalities={munis}
    firstNationCommunities={firstNationCommunities}
  />
));
