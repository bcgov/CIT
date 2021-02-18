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
  resourceIds: [],
  nearbyResources: {},
  municipalities: [
    {
      name: "Comox",
      link: "www.example.com",
      distance: 1,
      population: 10900,
    },
    {
      name: "Courtney & Surrounding",
      link: "www.example.com",
      distance: 3.5,
      population: 190,
    },
    {
      name: "Victoria",
      link: "www.example.com",
      distance: 177.89,
      population: 109000,
    },
  ],
  firstNationCommunity: {
    name: "Lyackson First Nation",
    link: "http://lyackson.bc.ca/",
    distance: 20,
    population: 200,
  },
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
      value: "Yes",
      type: "text",
    },
    waterSupply: {
      title: "Site servicing",
      subtitle: "- Water",
      name: "Yes",
      value: "300m3/hour",
      type: "capacity",
    },
    naturalGas: {
      title: "Site servicing",
      subtitle: "- Natural Gas",
      name: "No",
      value: "10m3/hour",
      type: "capacity",
    },
    sewer: {
      title: "Site servicing",
      subtitle: "- Sewer",
      name: "Yes",
      value: "1m3/hour",
      type: "capacity",
    },
    electrical: {
      title: "Power Transmission Lines",
      name: "BCHydro Trunk",
      value: "",
      type: "capacity",
    },
    nearHealth: {
      title: "Nearest Health Care Facility",
      name: "General Hospital",
      value: 11,
      type: "distance",
    },
    nearFire: {
      title: "Nearest First Responders",
      subtitle: "- Fire",
      name: "Firehouse #1",
      value: "",
      type: "distance",
    },
    nearAmbulance: {
      title: "Nearest First Responders",
      subtitle: "- Ambulance",
      name: "First Responder Hub",
      value: 6,
      type: "distance",
    },
    nearPolice: {
      title: "Nearest First Responders",
      subtitle: "- Police",
      name: "Station #2",
      value: 1.5,
      type: "distance",
    },
    nearCoastGuard: {
      title: "Nearest First Responders",
      subtitle: "- Coast Guard",
      name: "Intl. Port",
      value: 35,
      type: "distance",
    },
    nearSecondarySchool: {
      title: "Nearest Post-Secondary Institution",
      name: "High School",
      value: 10,
      type: "distance",
    },
  },
  transportation: {
    nearHighway: {
      title: "Nearest Highway",
      name: "Highway 1",
      value: 0.5,
      type: "distance",
    },
    nearAirport: {
      title: "Nearest Airport",
      name: "Comox Airport",
      value: 0.1,
      type: "distance",
    },
    nearRailway: {
      title: "Nearest Railway",
      name: "CN Rail",
      value: 15,
      type: "distance",
    },
    nearPort: {
      title: "Nearest Port",
      name: "Boat Dock",
      value: 47,
      type: "distance",
    },
    nearCustomsPort: {
      title: "Nearest Canada Customs Port of Entry",
      name: "Intl. Port",
      value: 35,
      type: "distance",
    },
  },
  physical: {
    nearElevation: {
      title: "Elevation at location",
      name: null,
      value: 100,
      type: "distance",
    },
    nearGround: {
      title: "Soil Name, Texture, Drainage",
      name: null,
      value: "Info here",
      type: "text",
    },
    nearLake: {
      title: "Access to water (nearest lake)",
      name: "Local Lake",
      value: 3,
      type: "distance",
    },
    nearRiver: {
      title: "Access to water (nearest river)",
      name: "Forest River",
      value: 5,
      type: "distance",
    },
  },
  siteInfo: {
    ownership: {
      title: "Ownership",
      value: "Crown",
      type: "text",
    },
    parcelSize: {
      title: "Parcel size",
      name: "Crown",
      value: "5",
      type: "size",
    },
    PID: {
      title: "Parcel size",
      value: "456-234-456",
      type: "text",
    },
  },
  userInfo: {
    propertyStatus: { title: "Sale or Lease", value: "", type: "text" },
    currentZoning: { title: "Current Zoning", value: "", type: "text" },
    futreZoning: { title: "Future Zoning", value: "", type: "text" },
    preferredDevelopment: {
      title: "Preferred Development",
      value: "",
      type: "text",
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
  /* eslint-disable no-param-reassign */
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
