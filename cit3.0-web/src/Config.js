const Config = {
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
