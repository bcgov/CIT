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
    municipalities: response.municipalities,
    regionalDistricts: response.regional_districts,
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
    municipalities: [],
    regionalDistricts: [],
  };
}

/**
 * @param {Object} keycloak retrieved from keycloak userinfo endpoint
 * @returns {Object} state for redux store
 */
function createRequestFromState(userModel, opportunityModel) {
  return {
    name: userModel.name,
    email: userModel.email,
    role: userModel.role,
    municipality:
      opportunityModel.municipality &&
      parseInt(opportunityModel.municipality.id, 10),
    regional_district:
      opportunityModel.regionalDistrict &&
      parseInt(opportunityModel.regionalDistrict.id, 10),
  };
}

/**
 * @param {Object} userModel
 * @param {Object} opportunityModel
 * @returns {Object} state for redux store
 */
function createPostFromState(userModel, opportunityModel) {
  return {
    name: userModel.name,
    email: userModel.email,
    role: userModel.role,
    municipality:
      opportunityModel.municipality &&
      parseInt(opportunityModel.municipality, 10),
    regional_district:
      opportunityModel.regionalDistrict &&
      parseInt(opportunityModel.regionalDistrict, 10),
  };
}

export default {
  createStateFromResponse,
  createPostFromState,
  createStateFromKeyCloak,
  createRequestFromState,
};
