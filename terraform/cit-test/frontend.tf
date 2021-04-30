resource "azurerm_app_service" "frontend" {
  name                =  "web-${var.app_suffix}-${var.environment}"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group
  app_service_plan_id = azurerm_app_service_plan.webapp.id
  https_only          = true

  site_config {
    linux_fx_version = "DOCKER|${data.terraform_remote_state.shared.outputs.acr_name}.azurecr.io/cit-frontend:latest"
    always_on = true
    # http2_enabled = true
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL            = "https://${data.terraform_remote_state.shared.outputs.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME       = data.terraform_remote_state.shared.outputs.acr_admin
    DOCKER_REGISTRY_SERVER_PASSWORD       = data.terraform_remote_state.shared.outputs.acr_password
    DOCKER_ENABLE_CI                      = true
    REACT_APP_API_BASE_URL                = "https://${azurerm_app_service.backend.default_site_hostname}"
    REACT_APP_KEYCLOAK_URL                = "https://test.oidc.gov.bc.ca/auth/"
    REACT_APP_KEYCLOAK_CLIENT             = "cit-test"
    REACT_APP_KEYCLOAK_REALM              = "fyof530u"
    REACT_APP_POWER_BI_GROUP_ID           = "0399d295-4354-4955-8ed9-68709eb5e7b5"
    REACT_APP_POWER_BI_REPORT_ID_PUBLIC   = "e76a7ea8-7719-4bea-a1f1-34c8dd7275eb"
    REACT_APP_POWER_BI_REPORT_ID_INTERNAL = "cddb3a4e-ebe8-4501-8fe3-3f4235afc588"
    REACT_APP_GEOCODER_API_KEY            = var.geocoder_key
    REACT_APP_BC_ROUTE_PLANNER_API_KEY    = var.router_key
    REACT_APP_SNOWPLOW_COLLECTOR          = "spt.apps.gov.bc.ca"
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}