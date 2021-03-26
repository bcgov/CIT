const Config = {
  apiUrl: window.env.apiUrl,
  keycloakConfig: {
    url: window.env.keycloakUrl,
    realm: window.env.keycloakRealm,
    clientId: window.env.keycloakClient,
  },
};

export default Config;
