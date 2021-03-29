const Config = {
  apiUrl: window.env.apiUrl,
  geocoderKey: window.env.geocoderKey,
  keycloakConfig: {
    url: window.env.keycloakUrl,
    realm: window.env.keycloakRealm,
    clientId: window.env.keycloakClient,
  },
};

export default Config;
