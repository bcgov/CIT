resource "azurerm_app_service" "frontend" {
  name                = "communityinformationtool-test"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group
  app_service_plan_id = azurerm_app_service_plan.webapp.id
  https_only          = true

  site_config {
    linux_fx_version = "DOCKER|${var.acr_name}.azurecr.io/cit-frontend:latest"
    always_on = true
    # http2_enabled = true
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = "https://${var.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
    REACT_APP_API_BASE_URL          = "https://${azurerm_app_service.backend.default_site_hostname}"
    KC_AUTH_URL                     = "https://test.oidc.gov.bc.ca/auth/"
    KC_CLIENT_ID                    = "cit-test"
    KC_REALM                        = "fyof530u"
    DOCKER_ENABLE_CI                = true
    REACT_APP_PROD_KEY              = var.geocoder_key
    REACT_APP_SNOWPLOW_COLLECTOR    = "spt.apps.gov.bc.ca"
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}