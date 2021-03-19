import React from "react";
import { storiesOf } from "@storybook/react";
import { useDispatch } from "react-redux";
import OpportunityDeletePage from "./OpportunityDeletePage";
import { setOpportunity } from "../../../store/actions/opportunity";

storiesOf("OpportunityDeletePage", module).add("default", () => {
  const dispatch = useDispatch();
  dispatch(
    setOpportunity({
      name: "My Sample Opportunity",
      address: "123 Main St.",
      coords: [54.1722, -124.1207],
      approvalStatus: "PEND",
      businessContactName: "Jon",
      businessContactEmail: "jon@example.net",
      publicNote: "",
      privateNote: "",
      lastAdmin: "Zac",
      dateCreated: "2020-01-01",
      dateUpdated: "",
      datePublished: null,
      resourceIds: {
        Hospitals: "5ff82cf4-0448-4063-804a-7321f0f2b4c6",
        Schools: "5832eff2-3380-435e-911b-5ada41c1d30b",
        "Post Secondary Schools": "8e4e2a87-2d1d-4931-828e-6327b49f310e",
        Courts: "23aa0b75-2715-4ccb-9a36-9a608450dc2d",
        "Walk-In Clinics": "3ca6b086-c92b-4654-ae82-ff5723d00611",
        "Natural Resource Projects": "2b69cc4b-4076-4272-a5a0-1c731455e063",
        "Economic Projects": "b12cd4cc-b58b-4079-b630-a20b6df58e8d",
      },
      nearbyResources: {},
      municipalities: [
        {
          name: "Comox",
          link: "http://www.example.com",
          distance: 1,
          population: 10900,
        },
        {
          name: "Courtney & Surrounding",
          link: "http://www.example.com",
          distance: 3.5,
          population: 190,
        },
        {
          name: "Victoria",
          link: "http://www.example.com",
          distance: 177.89,
          population: 109000,
        },
      ],
      firstNationCommunities: [
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
      ],
      services: {
        networkAvg: {
          title: "Network Connectivity",
          subtitle: "- Speed average",
          value: "20 Mbps",
          type: "paragraph",
        },
        networkAtRoad: {
          title: "Network Connectivity",
          subtitle: "- Speed at nearest road",
          value: "25 Mbps",
          type: "paragraph",
        },
        roadAccess: {
          title: "Site servicing",
          subtitle: "- Road Access",
          name: "Unknown",
          type: "text",
        },
        waterSupply: {
          title: "Site servicing",
          subtitle: "- Water",
          name: "No",
          value: 0,
          type: "capacity",
          suffix: "m³/hour",
        },
        naturalGas: {
          title: "Site servicing",
          subtitle: "- Natural Gas",
          name: "Yes",
          value: 100,
          type: "pressure",
          suffix: "MMBTU/hour",
        },
        sewer: {
          title: "Site servicing",
          subtitle: "- Sewer",
          name: "Yes",
          value: 10,
          type: "capacity",
          suffix: "m³/hour",
        },
        electrical: {
          title: "Site servicing",
          subtitle: "- Electrical",
          name: "Unknown",
          value: 0,
          type: "capacity",
          suffix: "MW",
        },
        transmission: {
          title: "Power Transmission Lines",
          name: "Yes",
          value: 34,
          type: "distance",
          suffix: "km",
        },
        nearResearchCenter: {
          title: "Research Center within 100km",
          name: "Yes",
          value: 10,
          type: "distance",
          suffix: "km",
        },
        nearHealth: {
          title: "Health Care Facility within 100km",
          name: "Yes",
          value: 11,
          type: "distance",
          suffix: "km",
        },
        nearFire: {
          title: "First Responders within 100km",
          subtitle: "- Fire",
          name: "Yes",
          value: 1,
          type: "distance",
          suffix: "km",
        },
        nearAmbulance: {
          title: "First Responders within 100km",
          subtitle: "- Ambulance",
          name: "Yes",
          value: 6,
          type: "distance",
          suffix: "km",
        },
        nearPolice: {
          title: "First Responders within 100km",
          subtitle: "- Police",
          name: "No",
          value: 0,
          type: "distance",
          suffix: "km",
        },
        nearCoastGuard: {
          title: "First Responders within 100km",
          subtitle: "- Coast Guard",
          name: "Yes",
          value: 35,
          type: "distance",
          suffix: "km",
        },
        nearSecondarySchool: {
          title: "Post-Secondary Education Facility within 100km",
          name: "Yes",
          value: 10,
          type: "distance",
          suffix: "km",
        },
      },
      transportation: {
        nearHighway: {
          title: "Nearest Highway",
          name: "Highway 1",
          value: 0.5,
          type: "distance",
          suffix: "km",
        },
        nearAirport: {
          title: "Nearest Airport",
          name: "Comox Airport",
          value: 0.1,
          type: "distance",
          suffix: "km",
        },
        nearRailway: {
          title: "Nearest Railway",
          name: "CN Rail",
          value: 15,
          type: "distance",
          suffix: "km",
        },
        nearPort: {
          title: "Nearest Port",
          name: "Boat Dock",
          value: 47,
          type: "distance",
          suffix: "km",
        },
        nearCustomsPort: {
          title: "Nearest Canada Customs Port of Entry",
          name: "Intl. Port",
          value: 35,
          type: "distance",
          suffix: "km",
        },
      },
      physical: {
        nearElevation: {
          title: "Elevation at location",
          name: null,
          value: 100,
          type: "height",
          suffix: "m",
        },
        nearGround: {
          title: "Soil Name, Texture, Drainage",
          name: null,
          value: "Info here",
          type: "text",
        },
        nearLake: {
          title: "Nearest lake",
          name: "Local Lake",
          value: 3,
          type: "distance",
          suffix: "km",
        },
        nearRiver: {
          title: "Nearest river",
          name: "Forest River",
          value: 5,
          type: "distance",
          suffix: "km",
        },
      },
      siteInfo: {
        parcelOwnership: {
          title: "Ownership",
          name: "Private",
          type: "text",
        },
        parcelSize: {
          title: "Parcel size",
          value: 5,
          type: "size",
          suffix: "acres",
        },
        PID: {
          title: "PID",
          value: "123456789",
          type: "paragraph",
        },
        geometry: {
          title: "Polygon",
          type: "Polygon",
          coordinates: null,
          hidden: true,
        },
        siteId: {
          title: "Site ID",
          value: null,
          type: "text",
          hidden: true,
        },
      },
      userInfo: {
        saleOrLease: { title: "Sale or Lease", value: "", type: "select" },
        currentZone: { title: "Current Zoning", value: "", type: "select" },
        futureZone: { title: "Future Zoning", value: "", type: "select" },
        preferredDevelopment: {
          title: "Preferred Development",
          value: "",
          type: "multi",
        },
        opportunityDescription: {
          title: "Oppotunity Description",
          value:
            "This is a paragraph for testing the story in some moajor or minor ways. Enjoy this sentence.",
          type: "paragraph",
        },
        environmentalInformation: {
          title: "Environmental Information",
          value:
            "This is a environmental info blob for testing the story in some moajor or minor ways. Enjoy this sentence.",
          type: "paragraph",
        },
        communityLink: {
          title: "Visit Community website",
          value: "https://google.ca",
          type: "link",
        },
        opportunityLink: {
          title: "View listing for this Opportunity",
          value: "https://google.ca",
          type: "link",
        },
      },
    })
  );
  return <OpportunityDeletePage />;
});