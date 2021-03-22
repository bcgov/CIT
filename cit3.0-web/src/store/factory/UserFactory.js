/**
 * @param {Object} response retrieved from `/api/opportunity/users/`
 * @returns {Object} state for redux store
 */
function createStateFromResponse(response) {
  return {
    name: response.name,
    email: response.email,
    role: response.role,
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
    name: keycloak.displayName,
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
  const municipality =
    opportunityModel.municipalities &&
    opportunityModel.municipalities.find((muni) => muni.distance === 0);
  return {
    name: userModel.name,
    email: userModel.email,
    role: userModel.role,
    municipality: (municipality && municipality.id) || 0,
    regional_district:
      opportunityModel.regionalDistrict && opportunityModel.regionalDistrict.id,
  };
}

export default {
  createStateFromResponse,
  createStateFromKeyCloak,
  createRequestFromState,
};
