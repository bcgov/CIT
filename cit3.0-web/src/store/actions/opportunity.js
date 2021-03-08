import axios from "axios";
import {
  ADD_ALL,
  ADD_ADDRESS,
  ADD_COORDS,
  ADD_BUSINESS_CONTACT,
  ADD_BUSINESS_CONTACT_NAME,
  ADD_BUSINESS_CONTACT_EMAIL,
  ADD_APPROVAL_STATUS,
  ADD_PUBLIC_NOTE,
  ADD_PRIVATE_NOTE,
  ADD_RESOUCE_IDS,
  ADD_NEARBY_RESOUCES,
  RESET_OPPORTUNITY,
  ADD_SITE_INFO,
  ADD_USER_INFO,
  ADD_NAME,
  ADD_SERVICE,
  ADD_SERVICE_CAPACITY,
} from "../constants/action-types";
import {
  POST_OPPOTUNITIES_URL,
  GET_OPPOTUNITIES_URL,
} from "../constants/api-urls";
import OpportunityFactory from "../factory/OpportunityFactory";

/**
 * @param {Object} opportunityModel from redux store
 * @return {Promise} of axios api call
 */
export function postOpportunity(opportunityModel) {
  return axios.post(
    POST_OPPOTUNITIES_URL,
    OpportunityFactory.createRequestFromModel(opportunityModel)
  );
}

/**
 * @param {Object} opportunityModel from redux store
 * @return {Promise} of axios api call
 */
export function updateOpportunity(opportunityModel) {
  return axios.put(
    `${POST_OPPOTUNITIES_URL + opportunityModel.id}/`,
    OpportunityFactory.createRequestFromModel(opportunityModel)
  );
}

/**
 * @param {number} opportunityId
 * @return {Promise} of axios api call
 */
export function getOpportunity(opportunityId) {
  return axios.get(GET_OPPOTUNITIES_URL + opportunityId);
}

/**
 * @param {Object} opportunity
 * @return {Object} for redux reducer
 */
export function setOpportunity(opportunity) {
  return { type: ADD_ALL, payload: opportunity };
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
 * @param {Object} bName
 * @return {Object} for redux reducer
 */
export function setBusinessContactName(bName) {
  return { type: ADD_BUSINESS_CONTACT_NAME, payload: bName };
}

/**
 * @param {Object} bEmail
 * @return {Object} for redux reducer
 */
export function setBusinessContactEmail(bEmail) {
  return { type: ADD_BUSINESS_CONTACT_EMAIL, payload: bEmail };
}

/**
 * @param {Object} approvalStatus
 * @return {Object} for redux reducer
 */
export function setApprovalStatus(approvalStatus) {
  return { type: ADD_APPROVAL_STATUS, payload: approvalStatus };
}

/**
 * @param {Object} note
 * @return {Object} for redux reducer
 */
export function setPrivateNote(note) {
  return { type: ADD_PRIVATE_NOTE, payload: note };
}

/**
 * @param {Object} note
 * @return {Object} for redux reducer
 */
export function setPublicNote(note) {
  return { type: ADD_PUBLIC_NOTE, payload: note };
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
