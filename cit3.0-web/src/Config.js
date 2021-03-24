const Config = {
  apiUrl: window.env.apiUrl,
  keycloakConfig: {
    url: process.env.REACT_APP_KEY_CLOAK_URL,
    realm: process.env.REACT_APP_KEY_CLOAK_REALM,
    clientId: process.env.REACT_APP_KEY_CLOAK_CLIENT,
  },
};

export default Config;
