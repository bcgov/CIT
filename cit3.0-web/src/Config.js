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
  pbiReportIdPublic: window.env.pbiReportIdPublic,
  pbiReportIdInternal: window.env.pbiReportIdInternal,
  pbiReportIdCompare: window.env.pbiReportIdCompare,
  pbiReportIdSearch: window.env.pbiReportIdSearch,
  pbiGroupId: window.env.pbiGroupId,
};

export default Config;
