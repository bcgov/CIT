import axios from "axios";
import { POST_ADMIN_EMAIL_NOTIFICATION_URL } from "../constants/api-urls";
/**
 * @param {Number} id of opportunity to send email notification about
 * @param {string} token used to authenticate with the back end API
 * @return {Promise} of axios api call
 */
export default function sendAdminEmailNotification(id, token) {
  return axios.post(
    POST_ADMIN_EMAIL_NOTIFICATION_URL,
    {
      id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
