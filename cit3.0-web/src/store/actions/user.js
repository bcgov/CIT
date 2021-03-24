import axios from "axios";

import {
  SET_USER_INFO,
  SET_USER_INFO_EMAIL,
  SET_USER_INFO_MUNICIPALITY,
  SET_USER_INFO_NAME,
  SET_USER_INFO_REGIONAL_DISTRICT,
  SET_USER_INFO_ROLE,
} from "../constants/user";
import USER_INITIALIZATION from "../models/user";

import { GET_USERS_URL, POST_USERS_URL } from "../constants/api-urls";
import UserFactory from "../factory/UserFactory";

/**
 * @param {String} email
 * @return {Promise} of axios api call
 */
export function getUser({ id, email }) {
  let query = email ? `email=${email}` : "";
  query = id ? `id=${id}` : query;
  return axios.get(`${GET_USERS_URL}?${query}`);
}

/**
 * @param {String} email
 * @return {Promise} of axios api call
 */
export function postUser(user, token) {
  return axios.post(POST_USERS_URL, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * @param {Object} user
 * @return {Promise} of axios api call
 */
export function setUser(user) {
  return { type: SET_USER_INFO, payload: user };
}

/**
 * @return {Promise} of axios api call
 */
export function resetUser() {
  return { type: SET_USER_INFO, payload: USER_INITIALIZATION() };
}

/**
 * @param {String} name
 * @return {Object} for redux reducer
 */
export function setUserInfoName(name) {
  return { type: SET_USER_INFO_NAME, payload: name };
}

/**
 * @param {String} email
 * @return {Object} for redux reducer
 */
export function setUserInfoEmail(email) {
  return { type: SET_USER_INFO_EMAIL, payload: email };
}

/**
 * @param {String} role
 * @return {Object} for redux reducer
 */
export function setUserInfoRole(role) {
  return { type: SET_USER_INFO_ROLE, payload: role };
}

/**
 * @param {Object[]} municipalities
 * @param {Number} municipalities[].id
 * @param {String} municipalities[].name
 * @return {Object} for redux reducer
 */
export function setUserInfoMunicipalities(municipalities) {
  return { type: SET_USER_INFO_MUNICIPALITY, payload: municipalities };
}

/**
 * @param {Object[]} regionalDistricts
 * @param {Number} regionalDistricts[].id
 * @param {String} regionalDistricts[].name
 * @return {Object} for redux reducer
 */
export function setUserInfoRegionalDistricts(regionalDistricts) {
  return { type: SET_USER_INFO_REGIONAL_DISTRICT, payload: regionalDistricts };
}
