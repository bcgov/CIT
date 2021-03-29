import axios from "axios";
import {
  ADD_ALL,
  ADD_USER,
  ADD_ADDRESS,
  ADD_COORDS,
  ADD_PID,
  ADD_GEOMETRY,
  ADD_PARCEL_OWNER,
  ADD_PARCEL_SIZE,
  ADD_SITE_ID,
  ADD_BUSINESS_CONTACT,
  ADD_BUSINESS_CONTACT_NAME,
  ADD_BUSINESS_CONTACT_EMAIL,
  ADD_APPROVAL_STATUS,
  ADD_PUBLIC_NOTE,
  ADD_PRIVATE_NOTE,
  ADD_RESOUCE_IDS,
  ADD_NEARBY_RESOUCES,
  ADD_ELEVATION,
  ADD_SOIL,
  RESET_OPPORTUNITY,
  ADD_SITE_INFO,
  ADD_USER_INFO,
  ADD_RENTAL_PRICE,
  ADD_SALE_PRICE,
  ADD_NAME,
  ADD_SERVICE,
  ADD_SERVICE_CAPACITY,
} from "../constants/action-types";
import {
  POST_OPPORTUNITIES_URL,
  GET_OPPORTUNITIES_URL,
  PUT_OPPORTUNITIES_URL,
} from "../constants/api-urls";
import OpportunityFactory from "../factory/OpportunityFactory";

/**
 * @param {Object} opportunityModel from redux store
 * @return {Promise} of axios api call
 */
export function postOpportunity(opportunityModel, token) {
  return axios.post(
    POST_OPPORTUNITIES_URL,
    OpportunityFactory.createRequestFromModel(opportunityModel),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

/**
 * @param {Object} opportunityModel from redux store
 * @return {Promise} of axios api call
 */
export function deleteOpportunity(opportunityModel, token) {
  const opportunity = opportunityModel;
  opportunity.deleted = true;
  return axios.put(
    `${PUT_OPPORTUNITIES_URL + opportunity.id}/`,
    OpportunityFactory.createRequestFromModel(opportunity),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

/**
 * @param {Object} opportunityModel from redux store
 * @return {Promise} of axios api call
 */
export function updateOpportunity(opportunityModel, token) {
  return axios.patch(
    `${PUT_OPPORTUNITIES_URL + opportunityModel.id}/`,
    OpportunityFactory.createPatchFromModel(opportunityModel),
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

/**
 * @param {number} opportunityId
 * @return {Promise} of axios api call
 */
export function getOpportunity(opportunityId) {
  return axios.get(`${GET_OPPORTUNITIES_URL + opportunityId}/`);
}

/**
 * @param {Object} opportunity
 * @return {Object} for redux reducer
 */
export function setOpportunity(opportunity) {
  return { type: ADD_ALL, payload: opportunity };
}

/**
 * @param {Number} userId
 * @return {Object} for redux reducer
 */
export function setOpportunityUser(userId) {
  return { type: ADD_USER, payload: userId };
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
 * @param {string} pid
 * @return {Object} for redux reducer
 */
export function setPID(pid) {
  return { type: ADD_PID, payload: pid };
}

/**
 * @param {string} siteId
 * @return {Object} for redux reducer
 */
export function setSiteId(id) {
  return { type: ADD_SITE_ID, payload: id };
}

/**
 * @param {Array} geom
 * @return {Object} for redux reducer
 */
export function setGeometry(geom) {
  return { type: ADD_GEOMETRY, payload: geom };
}

/**
 * @param {string} owner
 * @return {Object} for redux reducer
 */
export function setParcelOwner(owner) {
  return { type: ADD_PARCEL_OWNER, payload: owner };
}

/**
 * @param {Number} size
 * @return {Object} for redux reducer
 */
export function setParcelSize(size, increment) {
  return { type: ADD_PARCEL_SIZE, payload: { size, increment } };
}

/**
 * @param {Object} sInfo
 * @return {Object} for redux reducer
 */
export function setUserInfo(key, sInfo) {
  return { type: ADD_USER_INFO, payload: { key, value: sInfo } };
}

/**
 * @param {Number} rentalPrice
 * @return {Object} for redux reducer
 */
export function setRentalPrice(price) {
  return { type: ADD_RENTAL_PRICE, payload: price };
}

/**
 * @param {Number} salePrice
 * @return {Object} for redux reducer
 */
export function setSalePrice(price) {
  return { type: ADD_SALE_PRICE, payload: price };
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
 * @param {string} soil
 * @return {Object} for redux reducer
 */
export function setSoil(soil) {
  return { type: ADD_SOIL, payload: soil };
}

/**
 * @param {Number} elevation
 * @return {Object} for redux reducer
 */
export function setElevation(avgElevation) {
  return { type: ADD_ELEVATION, payload: avgElevation };
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
