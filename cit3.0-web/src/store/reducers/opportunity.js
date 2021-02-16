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
    "Network Connectivity": {
      "- Speed average": "20 Mbps",
      "- Speed at nearest road": "23 Mbps",
    },
    "Power Transmission Lines": "BCHydro Trunk - 10m",
    "Site servicing": {
      "- Road Access": "Yes",
      "- Sewer": "Yes",
      "- Water": "Yes",
      "- Natural Gas": "No",
    },
    "Nearest Health Care Facility": "Drop-in Clinic - 3km",
    "Nearest First Responders": {
      "- Fire": "Firehouse #1 - 3km",
      "- Ambulance": "First Responder Hub - 4km",
      "- Police": "Station 2 - 2km",
      "- Coast Guard": "Intl. Port - 10km",
    },
    "Nearest Post-Secondary Institution": "Junior High School - 7km",
  },
  transportation: {
    "Nearest Highway": "Highway 1 - 50m",
    "Nearest Airport": "Main Airport - 5km",
    "Nearest Railway": "CN Rail - 15km",
    "Nearest Port": "Boat Dock - 47km",
    "Nearest Canada Customs Port of Entry": "Intl. Port - 35km",
  },
  physical: {
    "Elevation at location": "100m",
    "Soil Name, Texture, Drainage": "Info here",
    "Access to water (nearest lake)": "3km",
    "Access to water (nearest river)": "5km",
  },
  siteInfo: {
    Ownership: "Crown",
    "Parcel size": "5 ha",
    PID: "456fdsagjio438u9g",
  },
  userInfo: {
    "Sale or Lease": "",
    "Current Zoning": "",
    "Future Zoning": "",
    "Preferred Development": "",
    "Opportunity Description":
      "This is a great area for a light industrial venture. There is an awesome local life style for employees.",
    "Environmental Information":
      "There is no soil pollution. A river near by is used for road runoff.",
    "Visit Community website": "www.example.net",
    "View listing for this Opportunity": "www.example.net",
  },
  // userInfo: {
  //   propertyStatus: { name: "Sale or Lease", value: "" },
  //   currentZoning: { name: "Current Zoning", value: "" },
  //   futreZoning: { name: "Future Zoning", value: "" },
  //   preferredDevelopment: { name: "Preferred Development", value: "" },
  //   opDesc: { name: "Oppotunity Description", value: "" },
  //   envInfo: { name: "Environmental Information", value: "" },
  //   commWebsite: { name: "Visit Community website", value: "" },
  //   listing: { name: "View listing for this Opportunity", value: "" },
  // },
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
      state.userInfo = { ...state.userInfo, ...action.payload };
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
      console.error("Invalid action performed on opportunities store");
  }
  return state;
}
