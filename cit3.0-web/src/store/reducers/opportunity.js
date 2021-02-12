import {
  ADD_ADDRESS,
  ADD_COORDS,
  ADD_BUSINESS_CONTACT,
  ADD_RESOUCE_IDS,
  ADD_NEARBY_RESOUCES,
  RESET_OPPORTUNITY,
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
  address: "",
  coords: [54.1722, -124.1207],
  businessContact: {
    name: "asd",
    email: "asd",
  },
  resourceIds: [],
  nearByResources: {},
  municipalities: [
    { name: "Duncan", link: "www.example.com", distance: 1.23 },
    { name: "Duncan", link: "www.example.com", distance: 4.56 },
    { name: "Duncan", link: "www.example.com", distance: 7.89 },
  ],
  services: {
    "Network Connectivity": {
      "- Speed average": "20 Mbps",
      "- Speed at nearest road": "23 Mbps",
    },
    "Nearest Post-Secondary Institution": "7km",
    "Power Transmission Lines": "stuff",
    "Nearest Health Care Facility": "3km",
    "Nearest First Responders": {
      "- Fire": "3km",
      "- Ambulance": "4km",
      "- Police": "2km",
      "- Coast Guard": "10km",
    },
  },
  transportation: {
    "Nearest Highway": "50m",
    "Nearest Airport": "5km",
    "Nearest railway": "15km",
    "Nearest Port": " 47km",
    "Nearest Canada Customs Port of Entry": "35km",
  },
  physical: {
    "Elevation at location": "100m",
    "Soil Name, Texture, Drainage": "Info here",
    "Access to water (nearest lake)": "3km",
    "Access to water (nearest river)": "5km",
  },
  siteInfo: {
    Ownership: "Crown",
    "Parcel Size": "5 ha",
    PID: "456fdsagjio438u9g",
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
      state.businessContact = action.payload;
      break;
    case ADD_RESOUCE_IDS:
      state.resourceIds = action.payload;
      break;
    case ADD_NEARBY_RESOUCES:
      state.nearByResources = action.payload;
      break;
    default:
      console.error("Invalid action performed on opportunities store");
  }
  return state;
}
