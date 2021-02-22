import {
  ADD_ADDRESS,
  ADD_COORDS,
  ADD_BUSINESS_CONTACT,
  ADD_RESOUCE_IDS,
  ADD_NEARBY_RESOUCES,
  RESET_OPPORTUNITY,
  ADD_SITE_INFO,
  ADD_USER_INFO,
  ADD_NAME,
  ADD_SERVICE,
  ADD_SERVICE_CAPACITY,
} from "../constants/action-types";

/**
 * Initial opportunity model
 * @todo remove/update initial coords
 * @todo remove initial municipalities
 * @todo remove/update services
 * @todo remove/update transportation
 * @todo remove/update physical
 * @todo remove/update siteInfo
 */
const OPPORTUNITY_MODEL = {
  name: "",
  address: "",
  coords: [54.1722, -124.1207],
  businessContact: {
    name: "",
    email: "",
    shared: false,
  },
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
      type: "text",
    },
    networkAtRoad: {
      title: "Network Connectivity",
      subtitle: "- Speed at nearest road",
      value: "25 Mbps",
      type: "text",
    },
    roadAccess: {
      title: "Site servicing",
      subtitle: "- Road Access",
      name: "Yes",
      type: "text",
    },
    waterSupply: {
      title: "Site servicing",
      subtitle: "- Water",
      name: "Yes",
      value: 3003,
      type: "capacity",
      suffix: "m³/hour",
    },
    naturalGas: {
      title: "Site servicing",
      subtitle: "- Natural Gas",
      name: "No",
      value: 10,
      type: "pressure",
      suffix: "MMBTU/hour",
    },
    sewer: {
      title: "Site servicing",
      subtitle: "- Sewer",
      name: "Yes",
      value: 1,
      type: "capacity",
      suffix: "m³/hour",
    },
    electrical: {
      title: "Site servicing",
      subtitle: "- Electrical",
      name: "Yes",
      value: 1,
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
      title: "Nearest Research Center",
      name: "Yes",
      value: 10,
      type: "distance",
      suffix: "km",
    },
    nearHealth: {
      title: "Nearest Health Care Facility",
      name: "Yes",
      value: 11,
      type: "distance",
      suffix: "km",
    },
    nearFire: {
      title: "Nearest First Responders",
      subtitle: "- Fire",
      name: "Yes",
      value: 1,
      type: "distance",
      suffix: "km",
    },
    nearAmbulance: {
      title: "Nearest First Responders",
      subtitle: "- Ambulance",
      name: "Yes",
      value: 6,
      type: "distance",
      suffix: "km",
    },
    nearPolice: {
      title: "Nearest First Responders",
      subtitle: "- Police",
      name: "No",
      value: 0,
      type: "distance",
      suffix: "km",
    },
    nearCoastGuard: {
      title: "Nearest First Responders",
      subtitle: "- Coast Guard",
      name: "Yes",
      value: 35,
      type: "distance",
      suffix: "km",
    },
    nearSecondarySchool: {
      title: "Nearest Post-Secondary Institution",
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
    ownership: {
      title: "Ownership",
      name: "Crown",
      type: "text",
    },
    parcelSize: {
      title: "Parcel size",
      value: "5",
      type: "size",
      suffix: "ha",
    },
    PID: {
      title: "PID",
      value: "456-234-456",
      type: "text",
    },
  },
  userInfo: {
    saleOrLease: { title: "Sale or Lease", value: "", type: "text" },
    currentZone: { title: "Current Zoning", value: "", type: "text" },
    futureZone: { title: "Future Zoning", value: "", type: "text" },
    preferred: {
      title: "Preferred Development",
      value: "",
      type: "multi",
    },
    oppDesc: { title: "Oppotunity Description", value: "", type: "paragraph" },
    envInfo: {
      title: "Environmental Information",
      value: "",
      type: "paragraph",
    },
    commLink: { title: "Visit Community website", value: "", type: "link" },
    listingLink: {
      title: "View listing for this Opportunity",
      value: "",
      type: "link",
    },
  },
};

/**
 * Opportunity get/reset actions get processed
 *
 * @param {Object} state set to initial state, then contains the current state
 * @param {String} action.type incoming action type
 * @param {String} action.payload incoming action payload, varying on opportunity field
 */
export default function opportunity(state = OPPORTUNITY_MODEL, action) {
  /* eslint-disable no-param-reassign, no-console */
  switch (action.type) {
    case RESET_OPPORTUNITY:
      state = OPPORTUNITY_MODEL;
      break;
    case ADD_ADDRESS:
      state.address = action.payload;
      break;
    case ADD_COORDS:
      state.coords = action.payload;
      break;
    case ADD_BUSINESS_CONTACT:
      state.businessContact = { ...state.businessContact, ...action.payload };
      break;
    case ADD_SITE_INFO:
      state.siteInfo = { ...state.siteInfo, ...action.payload };
      break;
    case ADD_USER_INFO:
      state.userInfo[action.payload.key].value = action.payload.value;
      break;
    case ADD_SERVICE:
      state.services[action.payload.key].name = action.payload.value;
      break;
    case ADD_SERVICE_CAPACITY:
      state.services[action.payload.key].value = action.payload.capacity;
      break;
    case ADD_NAME:
      state.name = action.payload;
      break;
    case ADD_RESOUCE_IDS:
      state.resourceIds = action.payload;
      break;
    case ADD_NEARBY_RESOUCES:
      state.nearbyResources = action.payload;
      break;
    default:
      console.error("Invalid action performed on opportunities store", action);
  }
  return state;
}
