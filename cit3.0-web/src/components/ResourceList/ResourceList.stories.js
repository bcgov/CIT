import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ResourceList from "./ResourceList";

export default {
  title: "ResourceList",
  component: ResourceList,
};

const resources = {
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
      distance: 1,
    },
  ],
  "Post Secondary Schools": [
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
  ],
};

export const ResourceListContainer = () => (
  <>
    <ResourceList resources={resources} />
  </>
);
