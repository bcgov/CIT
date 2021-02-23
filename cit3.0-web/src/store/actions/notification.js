import { NOTIFICATION_CLOSE } from "../constants/notification";

/**
 *
 * @param {string} type Notification Action
 * @param {Object} payload response object
 */
export function setNotification(type, payload) {
  return { type, payload };
}

export function closeNoficiation() {
  return { type: NOTIFICATION_CLOSE };
}
