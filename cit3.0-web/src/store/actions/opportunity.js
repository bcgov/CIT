import axios from "axios";
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
import { POST_OPPOTUNITIES_URL } from "../constants/api-urls";
import OpportunityRequest from "../factory/OpportunityRequest";

/**
 * @param {Object} opportunityModel from redux store
 * @return {Promise} of axios api call
 */
export function postOpportunity(opportunityModel) {
  return axios.post(
    POST_OPPOTUNITIES_URL,
    OpportunityRequest.createFromModel(opportunityModel)
  );
}

/**
 * @param {string} resourses
 * @return {Object} for redux reducer
 */
export function setOpportunityName(name) {
  return { type: ADD_NAME, payload: name };
}
/**
 * @param {string} resourses
 * @return {Object} for redux reducer
 */
export function setAddress(address) {
  return { type: ADD_ADDRESS, payload: address };
}

/**
 * @param {Array} coords
 * @return {Object} for redux reducer
 */
export function setCoords(coords) {
  return { type: ADD_COORDS, payload: coords };
}

/**
 * @param {Object} bContact
 * @return {Object} for redux reducer
 */
export function setBusinessContact(bContact) {
  return { type: ADD_BUSINESS_CONTACT, payload: bContact };
}

/**
 * @param {Object} sInfo
 * @return {Object} for redux reducer
 */
export function setSiteInfo(sInfo) {
  return { type: ADD_SITE_INFO, payload: sInfo };
}

/**
 * @param {Object} sInfo
 * @return {Object} for redux reducer
 */
export function setUserInfo(key, sInfo) {
  return { type: ADD_USER_INFO, payload: { key, value: sInfo } };
}

/**
 * @param {Object} sInfo
 * @return {Object} for redux reducer
 */
export function setService(key, sInfo) {
  return { type: ADD_SERVICE, payload: { key, value: sInfo } };
}

/**
 * @param {Object} sInfo
 * @return {Object} for redux reducer
 */
export function setServiceCapacity(key, sInfo) {
  return { type: ADD_SERVICE_CAPACITY, payload: { key, capacity: sInfo } };
}

/**
 * @param {Array} resourses
 * @return {Object} for redux reducer
 */
export function setResourceIds(rIds) {
  return { type: ADD_RESOUCE_IDS, payload: rIds };
}

/**
 * @param {Object} resourses
 * @return {Object} for redux reducer
 */
export function setNearbyResources(resourses) {
  return { type: ADD_NEARBY_RESOUCES, payload: resourses };
}

/**
 * @param {Object} shared
 * @return {Object} for redux reducer
 */
export function setBusinessNameShared(shared) {
  return { type: ADD_BUSINESS_CONTACT, payload: { shared } };
}

/**
 * Set the opportunity state back to initial state
 * @return {Object} for redux reducer
 */
export function resetOpportunity() {
  return { type: RESET_OPPORTUNITY };
}
