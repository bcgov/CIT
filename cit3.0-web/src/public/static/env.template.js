(function (window) {
  window.env = window.env || {};
  // Environment variables
  window.env.apiUrl = "${VITE_API_BASE_URL}";
  window.env.ciotUrl = "${VITE_CIOT_API_BASE_URL}";
  window.env.keycloakUrl = "${VITE_KEYCLOAK_URL}";
  window.env.keycloakRealm = "${VITE_KEYCLOAK_REALM}";
  window.env.keycloakClient = "${VITE_KEYCLOAK_CLIENT}";
  window.env.snowplowUrl = "${VITE_SNOWPLOW_COLLECTOR}";
  window.env.geocoderKey = "${VITE_GEOCODER_API_KEY}";
  window.env.routePlannerKey = "${VITE_BC_ROUTE_PLANNER_API_KEY}";
  window.env.pbiReportIdPublic = "${VITE_POWER_BI_REPORT_ID_PUBLIC}";
  window.env.pbiReportIdInternal = "${VITE_POWER_BI_REPORT_ID_INTERNAL}";
  window.env.pbiReportIdCompare = "${VITE_POWER_BI_REPORT_ID_COMPARE}";
  window.env.pbiReportIdSearch = "${VITE_POWER_BI_REPORT_ID_SEARCH}";
  window.env.pbiGroupId = "${VITE_POWER_BI_GROUP_ID}";
})(this);
