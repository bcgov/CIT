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
 * @param {string} resourses
 */
export function setOpportunityName(name) {
  return { type: ADD_NAME, payload: name };
}
/**
 * @param {string} resourses
 */
export function setAddress(address) {
  return { type: ADD_ADDRESS, payload: address };
}

/**
 * @param {Array} coords
 */
export function setCoords(coords) {
  return { type: ADD_COORDS, payload: coords };
}

/**
 * @param {Object} bContact
 */
export function setBusinessContact(bContact) {
  return { type: ADD_BUSINESS_CONTACT, payload: bContact };
}

/**
 * @param {Object} sInfo
 */
export function setSiteInfo(sInfo) {
  return { type: ADD_SITE_INFO, payload: sInfo };
}

/**
 * @param {Object} sInfo
 */
export function setUserInfo(sInfo) {
  return { type: ADD_USER_INFO, payload: sInfo };
}

/**
 * @param {Array} resourses
 */
export function setResourceIds(rIds) {
  return { type: ADD_RESOUCE_IDS, payload: rIds };
}

/**
 * @param {Object} resourses
 */
export function setNearbyResources(resourses) {
  return { type: ADD_NEARBY_RESOUCES, payload: resourses };
}

/**
 * @param {Object} shared
 */
export function setBusinessNameShared(shared) {
  return { type: ADD_BUSINESS_CONTACT, payload: { shared } };
}

/**
 * Set the opportunity state back to initial state
 */
export function resetOpportunity() {
  return { type: RESET_OPPORTUNITY };
}
