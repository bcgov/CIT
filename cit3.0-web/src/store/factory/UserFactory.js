/**
 * @param {Object} response retrieved from `/api/opportunity/users/`
 * @returns {Object} state for redux store
 */
function createStateFromResponse(response) {
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    role: response.role,
    idp: response.idp,
    dateCreated: response.date_created,
  };
}

export default {
  createStateFromResponse,
};
