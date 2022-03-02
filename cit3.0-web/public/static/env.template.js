(function (window) {
  window.env = window.env || {};
  // Environment variables
  window.env.apiUrl = "${REACT_APP_API_BASE_URL}";
  window.env.keycloakUrl = "${REACT_APP_KEYCLOAK_URL}";
  window.env.keycloakRealm = "${REACT_APP_KEYCLOAK_REALM}";
  window.env.keycloakClient = "${REACT_APP_KEYCLOAK_CLIENT}";
  window.env.snowplowUrl = "${REACT_APP_SNOWPLOW_COLLECTOR}";
  window.env.geocoderKey = "${REACT_APP_GEOCODER_API_KEY}";
  window.env.routePlannerKey = "${REACT_APP_BC_ROUTE_PLANNER_API_KEY}";
  window.env.pbiReportIdPublic = "${REACT_APP_POWER_BI_REPORT_ID_PUBLIC}";
  window.env.pbiReportIdInternal = "${REACT_APP_POWER_BI_REPORT_ID_INTERNAL}";
  window.env.pbiReportIdCompare = "${REACT_APP_POWER_BI_REPORT_ID_COMPARE}";
  window.env.pbiGroupId = "${REACT_APP_POWER_BI_GROUP_ID}";
})(this);
