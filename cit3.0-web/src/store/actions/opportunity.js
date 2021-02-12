import {
  ADD_ADDRESS,
  ADD_COORDS,
  ADD_BUSINESS_CONTACT,
  ADD_RESOUCE_IDS,
  ADD_NEARBY_RESOUCES,
  RESET_OPPORTUNITY,
} from "../constants/action-types";

/**
 * @param {string} resourses
 */
export function setAddress(address) {
  return { type: ADD_ADDRESS, payload: address };
}

/**
 * @param {Array} resourses
 */
export function setCoords(coords) {
  return { type: ADD_COORDS, payload: coords };
}

/**
 * @param {Object} resourses
 */
export function setBusinessContact(bContact) {
  return { type: ADD_BUSINESS_CONTACT, payload: bContact };
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
 * Set the opportunity state back to initial state
 */
export function resetOpportunity() {
  return { type: RESET_OPPORTUNITY };
}
