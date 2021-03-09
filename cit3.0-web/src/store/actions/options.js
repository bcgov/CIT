import axios from "axios";

import { GET_OPTIONS_URL } from "../constants/api-urls";

/**
 * @return {Promise} of axios api call
 */
export function getOptions() {
  return axios.get(GET_OPTIONS_URL);
}

/**
 * @param {Object} options from redux store
 * @return {Object} for redux reducer
 */
export function setOptions(options) {
  return { type: "options", payload: options };
}
