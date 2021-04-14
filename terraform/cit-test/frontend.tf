resource "azurerm_app_service" "frontend" {
  name                = "communityinformationtool-test"
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
    DOCKER_REGISTRY_SERVER_URL          = "https://${data.terraform_remote_state.shared.outputs.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME     = data.terraform_remote_state.shared.outputs.acr_admin
    DOCKER_REGISTRY_SERVER_PASSWORD     = data.terraform_remote_state.shared.outputs.acr_password
    DOCKER_ENABLE_CI                    = true
    REACT_APP_API_BASE_URL              = "https://${azurerm_app_service.backend.default_site_hostname}"
    REACT_APP_KEYCLOAK_URL              = "https://test.oidc.gov.bc.ca/auth/"
    REACT_APP_KEYCLOAK_CLIENT           = "cit-test"
    REACT_APP_KEYCLOAK_REALM            = "fyof530u"
    REACT_APP_POWER_BI_GROUP_ID         = "9bd828a8-9256-45f7-80ab-f39b8f647de0"
    REACT_APP_POWER_BI_REPORT_ID        = "3a848d28-934f-4e08-be41-b4acd90f616a"
    REACT_APP_GEOCODER_API_KEY          = var.geocoder_key
    REACT_APP_BC_ROUTE_PLANNER_API_KEY  = var.router_key
    REACT_APP_SNOWPLOW_COLLECTOR        = "spt.apps.gov.bc.ca"
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}