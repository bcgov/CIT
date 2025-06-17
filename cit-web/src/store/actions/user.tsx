import axios from "axios";

import SET_USER_INFO from "../constants/user";
import USER_INITIALIZATION from "../models/user";
import { GET_USERS_URL, USER_TRACKING_URL } from "../constants/api-urls";

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
