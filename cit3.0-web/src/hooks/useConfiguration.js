const useConfiguration = () => {
  const isTest = process.env.NODE_ENV === "test";
  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  return {
    siteMinderLogoutUrl: process.env.REACT_APP_KC_LOGOUT_URL,
    isTest,
    isDevelopment,
    isProduction,
    baseUrl: window.location.href.split(window.location.pathname)[0],
  };
};

export default useConfiguration;
