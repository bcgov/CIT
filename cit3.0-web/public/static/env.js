(function (window) {
  window.env = window.env || {};
  // Environment variables are not secrets as of July 2023
  window.env.apiUrl = "http://localhost:8000";
  window.env.ciotUrl = "http://localhost:3001";
  window.env.keycloakUrl = "https://dev.loginproxy.gov.bc.ca/auth/";
  window.env.keycloakRealm = "standard";
  window.env.keycloakClient = "community-information-tool-4411";
  window.env.snowplowUrl = "spm.apps.gov.bc.ca";
  window.env.geocoderKey = "";
  window.env.routePlannerKey = "";
  window.env.pbiReportIdPublic = "0d120da3-3d1a-4edb-9b0e-65f0890e3991";
  window.env.pbiReportIdInternal = "22baabf7-3310-4cf2-9756-e0d67f992367";
  window.env.pbiReportIdCompare = "43ed4787-b50e-4e39-8863-bedcb074e13a";
  window.env.pbiReportIdSearch = "d1b121dc-2c0c-4df6-8de3-4ac66defe814";
  window.env.pbiGroupId = "0399d295-4354-4955-8ed9-68709eb5e7b5";
})(this);
