(function (window) {
  window.env = window.env || {};
  // Environment variables
  window.env.apiUrl = "${REACT_APP_API_BASE_URL}";
  window.env.keycloakUrl = "${KC_AUTH_URL}";
  window.env.keycloakRealm = "${KC_REALM}";
  window.env.keycloakClient = "${KC_CLIENT_ID}";
  window.env.snowplowUrl = "${REACT_APP_SNOWPLOW_COLLECTOR}";
  window.env.geocoderKey = "${REACT_APP_PROD_KEY}";
})(this);
