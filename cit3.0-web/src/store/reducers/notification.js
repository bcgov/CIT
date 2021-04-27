import {
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_WARNING,
  NOTIFICATION_INFO,
  NOTIFICATION_CLOSE,
} from "../constants/notification";

/**
 * Initial notification model
 */
const NOTIFICATION_MODEL = {
  show: false,
  type: "notice",
  data: {},
};

/**
 * Notification show/hide & data actions get processed
 *
 * @param {Object} state set to initial state, then contains the current state
 * @param {String} action.type incoming action type
 * @param {String} action.payload incoming action payload
 */
export default function notification(state = NOTIFICATION_MODEL, action) {
  /* eslint-disable no-param-reassign, no-console */
  switch (action.type) {
    case NOTIFICATION_ERROR:
      state.show = true;
      state.data = action.payload;
      state.type = NOTIFICATION_ERROR;
      break;
    case NOTIFICATION_SUCCESS:
      state.show = true;
      state.data = action.payload;
      state.type = NOTIFICATION_SUCCESS;
      break;
    case NOTIFICATION_WARNING:
      state.show = true;
      state.data = action.payload;
      state.type = NOTIFICATION_WARNING;
      break;
    case NOTIFICATION_INFO:
      state.show = true;
      state.data = action.payload;
      state.type = NOTIFICATION_INFO;
      break;
    case NOTIFICATION_CLOSE:
      state.show = false;
      state.data = null;
      break;
    default:
  }
  return state;
}
