const Config = process.env.NODE_ENV
  ? {
      apiUrl: process.env.REACT_APP_API_BASE_URL,
      keycloakConfig: {
        url: process.env.REACT_APP_KEYCLOAK_URL,
        realm: process.env.REACT_APP_KEYCLOAK_REALM,
        clientId: process.env.REACT_APP_KEYCLOAK_CLIENT,
      },
      snowplowUrl: process.env.REACT_APP_SNOWPLOW_COLLECTOR,
      geocoderKey: process.env.REACT_APP_GEOCODER_API_KEY,
      routePlannerKey: process.env.REACT_APP_BC_ROUTE_PLANNER_API_KEY,
      pbiReportId: process.env.REACT_APP_POWER_BI_REPORT_ID,
      pbiGroupId: process.env.REACT_APP_POWER_BI_GROUP_ID,
    }
  : {
      apiUrl: window.env.apiUrl,
      keycloakConfig: {
        url: window.env.keycloakUrl,
        realm: window.env.keycloakRealm,
        clientId: window.env.keycloakClient,
      },
      snowplowUrl: window.env.snowplowUrl,
      geocoderKey: window.env.geocoderKey,
      routePlannerKey: window.env.routePlannerKey,
      pbiReportId: window.env.pbiReportId,
      pbiGroupId: window.env.pbiGroupId,
    };

export default Config;
