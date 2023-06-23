import axios from "axios";

import {
  SET_USER_INFO,
  SET_USER_INFO_EMAIL,
  SET_USER_INFO_NAME,
  SET_USER_INFO_ROLE,
} from "../constants/user";
import USER_INITIALIZATION from "../models/user";
import {
  GET_USERS_URL,
  USER_URL,
  USER_TRACKING_URL,
} from "../constants/api-urls";

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
 * @return {Promise} of axios api call
 */
export async function getUsers() {
  return axios.get(`${GET_USERS_URL}`);
}

/**
 * @param {object} user
 * @param {string} token
 * @return {Promise} of axios api call
 */
export function postUser(user, token) {
  return axios.post(USER_URL, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * @param {object} user
 * @param {string} token
 * @return {Promise} of axios api call
 */
export function deleteUser(user, token) {
  return axios.delete(`${USER_URL}?id=${user.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * @param {object} user
 * @param {string} token
 * @return {Promise} of axios api call
 */
export function updateUserAssignments(user, token) {
  return axios.put(USER_URL, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * @param {object} user
 * @param {string} token
 * @return {Promise} of axios api call
 */
export function trackUser(user, token) {
  return axios.post(USER_TRACKING_URL, user, {
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
