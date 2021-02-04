import React from "react";
import Map from "./Map";

export default {
  title: "Map",
  component: Map,
};

const nearbyResources = {
  Hospitals: [
    {
      LINK:
        "http://www.healthlinkbc.ca/find/resource.asp?First=1&org=53965&agencynum=17690971&SiteResourceAgencyNum=17650858",
      CITY: "Duncan",
      EMAIL_ADDRESS: "",
      HOURS: "",
      LANGUAGE: "",
      LATITUDE: 48.785009,
      LC_REFERENCE: 17650858,
      LONGITUDE: -123.723323,
      PHONE_NUMBER: 2507372030,
      POSTAL_CODE: "V9L 1E5",
      PROVINCE: "BC",
      RG_NAME: "Island Health",
      RG_REFERENCE: 17650682,
      SL_REFERENCE: 17690973,
      STREET_DIRECTION: "",
      STREET_NAME: "",
      STREET_NUMBER: "3045 Gibbins Road",
      STREET_TYPE: "",
      SV_DESCRIPTION: "Provides community hospital services.",
      SV_NAME: "Cowichan District Hospital",
      SV_REFERENCE: 17690971,
      SV_TAXONOMY: "LL-3000",
      TAXONOMY_NAME: "Hospitals",
      WEBSITE:
        "https://www.islandhealth.ca/our-locations/hospitals-health-centre-locations/cowichan-district-hospital",
      WHEELCHAIR_ACCESSIBLE: "Y",
      _id: 57,
    },
  ],
  POST_SECONDARY: [
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
    },
  ],
};

const resourceIds = {
  Hospitals: "5ff82cf4-0448-4063-804a-7321f0f2b4c6",
  Schools: "5832eff2-3380-435e-911b-5ada41c1d30b",
  "Post Secondary Schools": "8e4e2a87-2d1d-4931-828e-6327b49f310e",
  Courts: "23aa0b75-2715-4ccb-9a36-9a608450dc2d",
  "Walk-In Clinics": "3ca6b086-c92b-4654-ae82-ff5723d00611",
  "Natural Resource Projects": "2b69cc4b-4076-4272-a5a0-1c731455e063",
  "Economic Projects": "b12cd4cc-b58b-4079-b630-a20b6df58e8d",
};

const coords = [49.2827, -123.1207];

// eslint-disable-next-line no-console
const aFunc = () => console.log("");

export const InvestmentsMap = () => (
  <div style={{ height: "800px" }}>
    <Map
      coords={coords}
      resourceIds={resourceIds}
      scrollWheelZoom
      nearbyResources={nearbyResources}
      setCoords={aFunc}
      setAddress={aFunc}
      setNearbyResources={aFunc}
    />
  </div>
);
