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

/**
 * @param {Object} keycloak retrieved from keycloak userinfo endpoint
 * @returns {Object} state for redux store
 */
function createStateFromKeyCloak(keycloak) {
  return {
    name: keycloak.displayName || keycloak.name,
    email: keycloak.email,
    role: "",
    isAdmin: keycloak.client_roles.some((role) => role === "IDIR"),
  };
}

/**
 * @param {Object} keycloak retrieved from keycloak userinfo endpoint
 * @returns {Object} state for redux store
 */
function createRequestFromState(userModel) {
  return {
    name: userModel.name,
    email: userModel.email,
    role: userModel.role,
  };
}

/**
 * @param {Object} userModel
 * @returns {Object} state for redux store
 */
function createPostFromState(userModel) {
  return {
    name: userModel.name,
    email: userModel.email,
    role: userModel.role,
  };
}

export default {
  createStateFromResponse,
  createPostFromState,
  createStateFromKeyCloak,
  createRequestFromState,
};
