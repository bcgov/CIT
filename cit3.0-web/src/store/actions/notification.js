import { NOTIFICATION_CLOSE } from "../constants/notification";

/**
 * @return {string} type Notification Action
 * @param {Object} payload response object
 */
export function setNotification(type, payload) {
  return { type, payload };
}

/**
 * @return {Object} type response object
 */
export function closeNotification() {
  return { type: NOTIFICATION_CLOSE };
}
