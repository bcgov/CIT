import _ from "lodash";
import {
  SET_USER_INFO,
  SET_USER_INFO_EMAIL,
  SET_USER_INFO_MUNICIPALITY,
  SET_USER_INFO_NAME,
  SET_USER_INFO_REGIONAL_DISTRICT,
  SET_USER_INFO_ROLE,
} from "../constants/user";
import UserFactory from "../factory/UserFactory";

import USER_INITIALIZATION from "../models/user";

/**
 * Options get actions
 *
 * @param {Object} state set to initial state, then contains the current state
 * @param {String} action.type incoming action type
 * @param {String} action.payload incoming action payload, varying options
 */
export default function user(state = USER_INITIALIZATION(), action) {
  /* eslint-disable no-param-reassign */
  switch (action.type) {
    case SET_USER_INFO:
      state = _.mergeWith(
        USER_INITIALIZATION(),
        UserFactory.createStateFromResponse(action.payload)
      );
      break;
    case SET_USER_INFO_NAME:
      state.name = action.payload;
      break;
    case SET_USER_INFO_EMAIL:
      state.email = action.payload;
      break;
    case SET_USER_INFO_ROLE:
      state.role = action.payload;
      break;
    case SET_USER_INFO_MUNICIPALITY:
      state.municipality = action.payload;
      break;
    case SET_USER_INFO_REGIONAL_DISTRICT:
      state.regionalDistrict = action.payload;
      break;
    default:
      break;
  }
  return state;
}
