import _ from "lodash";

/**
 * Options get actions
 *
 * @param {Object} state set to initial state, then contains the current state
 * @param {String} action.type incoming action type
 * @param {String} action.payload incoming action payload, varying options
 */
export default function options(state = {}, action) {
  /* eslint-disable no-param-reassign */
  switch (action.type) {
    case "options":
      state = _.mergeWith(state, action.payload);
      break;
    default:
      break;
  }
  return state;
}
